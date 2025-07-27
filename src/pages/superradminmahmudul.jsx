import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase.config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  FaSpinner,
  FaSyncAlt,
  FaCheck,
  FaTrash,
  FaEdit,
  FaTimes,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import ContributeForm from "./Contribute/ContributeForm";
import { auth, googleProvider } from "../firebase.config";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import PendingQuestionsAdminPortal from "../components/admin/PendingQuestionsAdminPortal";
import AdminDashboardSummary from "../components/admin/dashboard/AdminDashboardSummary";
import AdminDashboardQuestionsTable from "../components/admin/dashboard/AdminDashboardQuestionsTable";
import AdminDashboardBarChart from "../components/admin/dashboard/AdminDashboardBarChart";
import AdminDashboardPieChart from "../components/admin/dashboard/AdminDashboardPieChart";
import AdminDashboardActivityLog from "../components/admin/dashboard/AdminDashboardActivityLog";

const CARDS_PER_PAGE = 8;
const SUPER_ADMIN_EMAILS = [
  "work.mahmudulhasan@gmail.com",
  "2220622@iub.edu.bd",
];

const SuperAdminMahmudul = () => {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const fileInputRef = useRef();

  // Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (profile) => {
      if (profile) {
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

  // Fetch all questions
  const fetchQuestions = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "questions"));
    const docs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    docs.sort((a, b) => {
      const ta = a.uploadTime?.seconds
        ? a.uploadTime.seconds
        : Date.parse(a.uploadTime || 0);
      const tb = b.uploadTime?.seconds
        ? b.uploadTime.seconds
        : Date.parse(b.uploadTime || 0);
      return tb - ta;
    });
    setQuestions(docs);
    setLoading(false);
  };

  useEffect(() => {
    if (user && SUPER_ADMIN_EMAILS.includes(user.email)) fetchQuestions();
  }, [user]);

  // Search and pagination logic
  const filtered = questions.filter((q) => {
    const s = search.toLowerCase();
    const keywordMatch = Array.isArray(q.keyword)
      ? q.keyword.some((kw) => kw.toLowerCase().includes(s))
      : false;
    return (
      !search ||
      q.courseName?.toLowerCase().includes(s) ||
      q.courseCode?.toLowerCase().includes(s) ||
      q.facultyName?.toLowerCase().includes(s) ||
      q.type?.toLowerCase().includes(s) ||
      keywordMatch
    );
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));
  const paged = filtered.slice(
    (page - 1) * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE
  );

  // Open edit modal
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditData({ ...paged[idx] });
    setModalOpen(true);
  };

  // Handle image upload in edit
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    const validFiles = [];
    const errors = [];

    files.forEach((file) => {
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        errors.push(
          `${file.name}: Invalid file type. Only JPG, PNG, and WebP are allowed.`
        );
        return;
      }

      // Check file size
      if (file.size > maxSize) {
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
        errors.push(
          `${file.name}: File too large (${sizeInMB}MB). Maximum size is 10MB.`
        );
        return;
      }

      validFiles.push(file);
    });

    // Show specific errors if any
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
    }

    // Add valid files
    validFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      setEditData((f) => ({
        ...f,
        images: [...(f.images || []), { file, url }],
      }));
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Remove image
  const handleRemoveImage = (idx) => {
    setEditData((f) => ({
      ...f,
      images: f.images.filter((_, i) => i !== idx),
    }));
  };

  // Rearrange images
  const handleRearrangeImages = (imgs) => {
    setEditData((f) => ({ ...f, images: imgs }));
  };

  // Save edits
  const handleSave = async () => {
    setSaving(true);
    try {
      const old = questions.find((q) => q.id === editData.id);
      let newImages = [];
      // Upload new images to imgbb if any
      for (const img of editData.images) {
        if (img.file && !img.url.startsWith("http")) {
          // New image, upload to imgbb
          const imgbbApiKey =
            import.meta.env.VITE_IMGBB_API_KEY ||
            process.env.VITE_IMGBB_API_KEY;
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
          if (data.success) {
            newImages.push({
              url: data.data.url,
              delete_url: data.data.delete_url,
            });
          } else {
            toast.error("Image upload failed");
            setSaving(false);
            return;
          }
        } else if (img.url) {
          // Existing image
          newImages.push(
            img.url ? (img.delete_url ? img : { url: img.url }) : img
          );
        }
      }
      // Find changed fields
      const updatedFields = [];
      [
        "courseCode",
        "courseName",
        "facultyName",
        "type",
        "semester",
        "year",
        "anonymous",
      ].forEach((field) => {
        if (JSON.stringify(old[field]) !== JSON.stringify(editData[field])) {
          updatedFields.push({ field, newValue: editData[field] });
        }
      });
      if (JSON.stringify(old.images) !== JSON.stringify(newImages)) {
        updatedFields.push({ field: "images", newValue: newImages });
      }
      // Update in 'questions'
      const updateObj = {
        ...editData,
        images: newImages,
        uploadTime: serverTimestamp(),
        updateTime: new Date().toISOString(),
      };
      await updateDoc(doc(db, "questions", old.id), updateObj);
      // Add new version to 'backup-questions'
      await addDoc(collection(db, "backup-questions"), {
        ...updateObj,
        uploadTime: new Date().toISOString(),
        version: (old.version || 1) + 1,
        versionHistory: [
          ...(old.versionHistory || []),
          {
            version: (old.version || 1) + 1,
            updatedFields,
            updatedAt: new Date().toISOString(),
          },
        ],
      });
      toast.success("Updated!");
      setModalOpen(false);
      await fetchQuestions();
    } catch (e) {
      toast.error("Update failed");
      setSaving(false);
    }
    setSaving(false);
  };

  // Delete question
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;
    setSaving(true);
    try {
      await deleteDoc(doc(db, "questions", editData.id));
      toast.success("Deleted!");
      setModalOpen(false);
      await fetchQuestions();
    } catch (e) {
      toast.error("Delete failed");
      setSaving(false);
    }
    setSaving(false);
  };

  // Pagination controls
  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  // Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      toast.error("Google sign-in failed");
    }
  };

  // Google sign-out
  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <button
          className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg shadow mt-8"
          onClick={handleGoogleSignIn}
        >
          <FaSearch /> Sign in with Google
        </button>
      </div>
    );
  }

  if (!SUPER_ADMIN_EMAILS.includes(user.email)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700">
          You do not have permission to access this page.
        </p>
        <button
          className="mt-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow"
          onClick={handleSignOut}
        >
          <FaSignOutAlt /> Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Interactive Dashboard Section */}
      <div className="mb-10 space-y-8">
        <AdminDashboardSummary questions={questions} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AdminDashboardBarChart questions={questions} />
          <AdminDashboardPieChart questions={questions} />
        </div>
        <AdminDashboardQuestionsTable questions={questions} />
        <AdminDashboardActivityLog questions={questions} />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Super Admin: All Previous Semester Questions
      </h1>
      <PendingQuestionsAdminPortal />
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by course name, code, faculty name, type, or keyword..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border border-blue-200 bg-transparent rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400 transition"
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300" />
        </div>
        <button
          className="ml-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex items-center gap-2 disabled:opacity-60"
          onClick={fetchQuestions}
          disabled={loading}
          title="Refresh"
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaSyncAlt />}
          Refresh
        </button>
        <button
          className="ml-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg flex items-center gap-2"
          onClick={handleSignOut}
        >
          <FaSignOutAlt /> Sign out
        </button>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-lg text-blue-600">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="mb-4"
          >
            <FaSpinner className="text-4xl text-blue-400 animate-spin" />
          </motion.div>
          <div className="text-base font-semibold animate-pulse">
            Loading...
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-500">No questions found.</div>
      ) : (
        <>
          <div className="flex flex-wrap gap-3">
            {paged.map((q, idx) => (
              <motion.div
                key={q.id}
                className="bg-white rounded-xl shadow p-2 flex flex-col items-center w-40 border border-blue-100 relative min-h-[180px]"
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.12)",
                }}
              >
                <img
                  src={
                    typeof q.images[0] === "string"
                      ? q.images[0]
                      : q.images[0]?.url
                  }
                  alt={q.courseName}
                  className="w-14 h-14 object-cover rounded mb-1 border"
                />
                <div className="font-bold text-blue-700 text-center text-xs mb-0.5 line-clamp-2">
                  {q.courseName}
                </div>
                <div className="text-[11px] text-gray-500 mb-0.5">
                  {q.courseCode}
                </div>
                <div className="text-[11px] text-gray-400 mb-0.5">
                  {q.images.length} img
                </div>
                <button
                  className="mt-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2 text-xs disabled:opacity-60"
                  onClick={() => handleEdit(idx)}
                  disabled={saving || loading}
                >
                  {saving && editIdx === idx && modalOpen ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaEdit />
                  )}
                  Edit
                </button>
              </motion.div>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              className={`flex items-center px-2 py-1 rounded-full transition-all duration-200 shadow-sm ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-600"
              }`}
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
            >
              <MdChevronLeft size={20} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`px-2 py-1 rounded-full mx-1 font-semibold transition-all duration-200 shadow-sm text-xs ${
                  page === i + 1
                    ? "bg-blue-500 text-white scale-110"
                    : "bg-gray-100 hover:bg-blue-200 text-blue-700"
                }`}
                onClick={() => goToPage(i + 1)}
                disabled={page === i + 1}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`flex items-center px-2 py-1 rounded-full transition-all duration-200 shadow-sm ${
                page === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-600"
              }`}
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              <MdChevronRight size={20} />
            </button>
          </div>
        </>
      )}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center max-w-2xl w-full relative"
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl"
                onClick={() => setModalOpen(false)}
                disabled={saving}
              >
                <FaTimes />
              </button>
              <div className="font-bold text-lg mb-4 text-blue-700">
                Edit Any Question
              </div>
              <ContributeForm
                form={editData}
                setForm={setEditData}
                handleChange={(e) =>
                  setEditData((d) => ({
                    ...d,
                    [e.target.name]:
                      e.target.type === "checkbox"
                        ? e.target.checked
                        : e.target.value,
                  }))
                }
                handleImageUpload={handleImageUpload}
                handleRemoveImage={handleRemoveImage}
                handlePreviewImage={() => {}}
                fileInputRef={fileInputRef}
              />
              <div className="flex gap-4 mt-6">
                <button
                  className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2 disabled:opacity-60"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaCheck />
                  )}
                  Save
                </button>
                <button
                  className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2 disabled:opacity-60"
                  onClick={handleDelete}
                  disabled={saving}
                >
                  {saving ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaTrash />
                  )}
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuperAdminMahmudul;
