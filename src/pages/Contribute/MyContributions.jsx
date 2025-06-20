import React, { useEffect, useState, useRef } from "react";
import { db } from "../../firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import ContributeForm from "./ContributeForm";

const CARDS_PER_PAGE = 8;

const MyContributions = ({ user }) => {
  const [myQuestions, setMyQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const fileInputRef = useRef();

  // Fetch user's questions
  const fetchQuestions = async () => {
    if (!user?.email) return;
    setLoading(true);
    const q = query(
      collection(db, "questions"),
      where("email", "==", user.email)
      // No orderBy here to avoid index error
    );
    const snap = await getDocs(q);
    // Sort by uploadTime descending in JS
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
    setMyQuestions(docs);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line
  }, [user]);

  // Search and pagination logic
  const filtered = myQuestions.filter((q) => {
    const s = search.toLowerCase();
    return (
      !search ||
      q.courseName?.toLowerCase().includes(s) ||
      q.courseCode?.toLowerCase().includes(s) ||
      q.type?.toLowerCase().includes(s)
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
      const old = myQuestions.find((q) => q.id === editData.id);
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

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4 text-blue-700">My Contributions</h2>
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by course name, code, or type..."
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
        <div className="text-gray-500">No contributions found.</div>
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
                Edit Contribution
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

export default MyContributions;
