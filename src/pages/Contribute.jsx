import React, { useRef, useState, useEffect } from "react";
import {
  FaGoogle,
  FaUpload,
  FaTimes,
  FaSignOutAlt,
  FaRegSadTear,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import Card from "../components/previousSemQuestions/PreviousSemQuestionsCard";
import InfoAlert from "./Contribute/InfoAlert";
import UserCard from "./Contribute/UserCard";
import ContributeForm from "./Contribute/ContributeForm";
import ImagePreviewModal from "./Contribute/ImagePreviewModal";
import { auth, googleProvider } from "../firebase.config";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import MyContributions from "./Contribute/MyContributions";

const Contribute = () => {
  const [user, setUser] = useState(null); // { name, email, photo }
  const [form, setForm] = useState({
    courseCode: "",
    courseName: "",
    type: "",
    semester: "",
    year: "",
    anonymous: false,
    images: [], // {file, url}
  });
  const [imgModalIdx, setImgModalIdx] = useState(null); // index of image in form.images
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const imgRef = useRef();
  const panRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingGoogleUser, setPendingGoogleUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (profile) => {
      if (profile && profile.email.endsWith("@iub.edu.bd")) {
        setUser({
          name: profile.displayName,
          email: profile.email,
          photo: profile.photoURL,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Firebase Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const profile = result.user;
      if (!profile.email.endsWith("@iub.edu.bd")) {
        setPendingGoogleUser(profile);
        setShowEmailModal(true);
        await signOut(auth);
        return;
      }
      setUser({
        name: profile.displayName,
        email: profile.email,
        photo: profile.photoURL,
      });
    } catch (err) {
      console.error("Google sign-in error:", err);
      toast.error("Google sign-in failed");
    }
  };

  // Firebase sign-out
  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Validate email
  const isIUBEmail = (email) => email.endsWith("@iub.edu.bd");

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type: t, checked } = e.target;
    setForm((f) => ({ ...f, [name]: t === "checkbox" ? checked : value }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        ) && file.size < 3 * 1024 * 1024
    );
    if (validFiles.length !== files.length) {
      toast.error(
        "Some files were invalid (type/size). Only jpg/png/webp <3MB allowed."
      );
    }
    validFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      setForm((f) => ({ ...f, images: [...f.images, { file, url }] }));
    });
    // Reset file input so same file can be re-added if removed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Remove image
  const handleRemoveImage = (idx) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  };

  // Preview modal
  const handlePreviewImage = (idx) => {
    setImgModalIdx(idx);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Large image preview modal handlers
  const handleWheel = (e) => {
    e.preventDefault();
    setZoom((z) => Math.max(0.2, Math.min(5, z + (e.deltaY < 0 ? 0.1 : -0.1))));
  };
  const handleMouseDown = (e) => {
    setDragging(true);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    panRef.current = { ...pan };
  };
  const handleMouseMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    setPan({ x: panRef.current.x + dx, y: panRef.current.y + dy });
  };
  const handleMouseUp = () => setDragging(false);
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Submit
  const handleSubmit = async () => {
    if (!user || !isIUBEmail(user.email)) {
      toast.error("You must sign in with a valid iub.edu.bd email.");
      return;
    }
    if (
      !form.courseCode ||
      !form.courseName ||
      !form.type ||
      !form.semester ||
      !form.year ||
      form.images.length === 0
    ) {
      toast.error("Please fill all fields and add at least one image.");
      return;
    }
    setLoading(true);
    try {
      // 1. Upload images to imgbb
      const imgbbApiKey =
        import.meta.env.VITE_IMGBB_API_KEY || process.env.VITE_IMGBB_API_KEY;
      console.log("[imgbb] Using API key:", imgbbApiKey);
      const uploadedImages = [];
      for (const [idx, img] of form.images.entries()) {
        console.log(`[imgbb] Uploading image #${idx + 1}...`, img.file);
        const formData = new FormData();
        formData.append("image", img.file);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        console.log(`[imgbb] Response for image #${idx + 1}:`, data);
        if (data.success) {
          uploadedImages.push({
            url: data.data.url,
            delete_url: data.data.delete_url,
          });
        } else {
          console.error(`[imgbb] Upload failed for image #${idx + 1}:`, data);
          throw new Error("Image upload failed");
        }
      }
      // Helper to remove undefined fields from an object
      const removeUndefined = (obj) => {
        const clean = {};
        Object.keys(obj).forEach((k) => {
          if (obj[k] !== undefined) clean[k] = obj[k];
        });
        return clean;
      };
      // 2. Build object
      const submission = {
        courseCode: form.courseCode,
        courseName: form.courseName,
        type: form.type,
        semester: form.semester,
        year: form.year,
        anonymous: form.anonymous,
        images: uploadedImages, // [{url, delete_url}]
        contributor: user.name,
        email: user.email,
        uploadTime: serverTimestamp(), // Only for questions
        approved: true,
        views: 0,
        likes: 0,
        comments: [],
      };
      // 3. Save to backup-questions first (with ISO string for uploadTime and updatedAt, and no undefined fields)
      const backupData = removeUndefined({
        ...submission,
        uploadTime: new Date().toISOString(), // Use ISO string for backup
      });
      await addDoc(collection(db, "backup-questions"), {
        ...backupData,
        version: 1,
        versionHistory: [
          {
            version: 1,
            data: removeUndefined({ ...backupData }),
            updatedFields: [],
            updatedAt: new Date().toISOString(),
          },
        ],
      });
      // 4. Save to questions (with serverTimestamp)
      await addDoc(collection(db, "questions"), submission);
      console.log("[Firestore] Saved successfully.");
      toast.success("Submitted successfully!");
      setForm({
        courseCode: "",
        courseName: "",
        type: "",
        semester: "",
        year: "",
        anonymous: false,
        images: [],
      });
    } catch (e) {
      toast.error("Submission failed. Try again.");
      console.error("[Firestore] Error:", e);
      // If you see 'Missing or insufficient permissions', check your Firestore rules in the Firebase Console.
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2 text-blue-700">
        <FaUpload className="text-blue-400" /> Share a Previous Semester
        Question
      </h1>
      <InfoAlert />
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center max-w-sm w-full relative"
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FaRegSadTear className="text-5xl text-red-400 animate-bounce mb-4" />
              <div className="text-xl font-bold text-red-600 mb-2 text-center">
                Only IUB mail accounts are allowed!
              </div>
              <div className="text-gray-700 text-center mb-4">
                You tried to sign in with:
                <br />
                <span className="font-semibold text-blue-600">
                  {pendingGoogleUser?.email}
                </span>
                <br />
                Please use your{" "}
                <span className="font-semibold">@iub.edu.bd</span> email.
              </div>
              <button
                className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                onClick={() => setShowEmailModal(false)}
              >
                <FaTimes /> Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!user ? (
        <button
          className="flex mx-auto items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mb-8 text-lg shadow"
          onClick={handleGoogleSignIn}
        >
          <FaGoogle /> Sign in with IUB mail
        </button>
      ) : !user.email.endsWith("@iub.edu.bd") ? (
        <div className="text-red-600 font-semibold mb-4">
          You must sign in with your iub.edu.bd email.
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-2">
            <UserCard user={user} />
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow"
              onClick={handleSignOut}
            >
              <FaSignOutAlt /> Sign out
            </button>
          </div>
          <div className="block md:flex  gap-6">
            <ContributeForm
              form={form}
              setForm={setForm}
              handleChange={handleChange}
              handleImageUpload={handleImageUpload}
              handleRemoveImage={handleRemoveImage}
              handlePreviewImage={handlePreviewImage}
              fileInputRef={fileInputRef}
            />
            <div className="mb-8">
              <div className="mb-2 text-base text-gray-600 font-semibold">
                This is how your card will look to others:
              </div>
              <Card
                question={{
                  ...form,
                  images:
                    form.images.length > 0 &&
                    typeof form.images[0] === "object" &&
                    form.images[0].url
                      ? form.images.map((img) => img.url)
                      : form.images,
                  contributor: form.anonymous ? "Anonymous" : user.name,
                }}
                onImageClick={handlePreviewImage}
                imagePreviewModal={null}
              />
              <motion.button
                className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-lg shadow flex items-center justify-center gap-2 disabled:opacity-60"
                onClick={handleSubmit}
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                animate={
                  loading
                    ? { scale: [1, 1.04, 1], boxShadow: "0 0 0 2px #22c55e44" }
                    : { scale: 1, boxShadow: "0 0 0 0px transparent" }
                }
                transition={{
                  duration: 0.4,
                  repeat: loading ? Infinity : 0,
                  repeatType: "reverse",
                }}
              >
                {loading ? (
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <FaSpinner className="animate-spin mr-2" />
                  </motion.span>
                ) : null}
                {loading ? "Submitting..." : "Submit"}
              </motion.button>
            </div>
          </div>
        </>
      )}
      {imgModalIdx !== null && (
        <ImagePreviewModal
          images={form.images}
          imgModalIdx={imgModalIdx}
          setImgModalIdx={setImgModalIdx}
          zoom={zoom}
          setZoom={setZoom}
          pan={pan}
          setPan={setPan}
          dragging={dragging}
          setDragging={setDragging}
          imgRef={imgRef}
          handleWheel={handleWheel}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handleResetZoom={handleResetZoom}
        />
      )}
      {/* My Contributions Section */}
      {user && user.email && <MyContributions user={user} />}
    </div>
  );
};

export default Contribute;
