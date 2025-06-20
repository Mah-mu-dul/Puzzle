import React, { useState, useMemo, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  FaDownload,
  FaExpand,
  FaTimes,
  FaSearchMinus,
  FaSearchPlus,
  FaSyncAlt,
  FaChevronLeft,
  FaChevronRight,
  FaBookOpen,
  FaUserCircle,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const SOFT_COLORS = [
  "from-blue-100 via-blue-50 to-purple-50",
  "from-green-100 via-green-50 to-teal-50",
  "from-cyan-100 via-cyan-50 to-blue-50",
  "from-purple-100 via-purple-50 to-pink-50",
];

const Card = ({ question, onImageClick, imagePreviewModal }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const imgRef = useRef();
  const panRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef(null);

  // Assign a random color per card instance
  const cardBg = useMemo(() => {
    const key = question.courseCode || question.id || Math.random();
    let hash = 0;
    for (let i = 0; i < key.length; i++)
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    return SOFT_COLORS[Math.abs(hash) % SOFT_COLORS.length];
  }, [question.courseCode, question.id]);

  const {
    courseCode,
    courseName,
    images = [],
    semester,
    year,
    contributor,
    type,
    uploadTime,
    anonymous,
  } = question;

  // Helper to get image URL from value (string or object)
  const getImgUrl = (img) => (typeof img === "string" ? img : img?.url);

  // Helper to format Firestore Timestamp or ISO string
  const formatUploadDate = (uploadTime) => {
    if (!uploadTime) return "";
    let dateObj;
    if (typeof uploadTime === "object" && uploadTime.seconds) {
      dateObj = new Date(uploadTime.seconds * 1000);
    } else {
      dateObj = new Date(uploadTime);
    }
    if (isNaN(dateObj.getTime())) return "";
    return dateObj.toLocaleDateString();
  };

  // Helper to sanitize and build file name
  const buildFileName = (idx) => {
    const safe = (str) =>
      (str || "").replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_\-]/g, "");
    return `${safe(courseName)}_${safe(courseCode)}_${safe(type)}_${safe(
      semester
    )}_${safe(year)}_img${idx + 1}.jpg`;
  };

  const handleDownload = async (e) => {
    e.stopPropagation();
    if (!images || images.length === 0) return;
    for (let idx = 0; idx < images.length; idx++) {
      const url = getImgUrl(images[idx]);
      try {
        const response = await fetch(url, { mode: "cors" });
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = buildFileName(idx);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 5000);
      } catch (err) {
        toast.error(`Failed to download image #${idx + 1}`);
      }
    }
    toast.success("Download started for all images!");
  };

  // Modal handlers
  const handlePreviewImage = (idx) => {
    setImgIdx(idx);
    setModalOpen(true);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };
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
  const handlePrev = () =>
    setImgIdx((idx) => (idx === 0 ? images.length - 1 : idx - 1));
  const handleNext = () =>
    setImgIdx((idx) => (idx === images.length - 1 ? 0 : idx + 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
      }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className={`w-[22rem] bg-gradient-to-br ${cardBg} rounded-3xl shadow-xl p-5  relative glass-card overflow-hidden group backdrop-blur-lg`}
      style={{ minHeight: 370 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <FaBookOpen className="text-2xl text-blue-500 drop-shadow" />
        <span className="font-bold text-lg text-blue-800 tracking-wide">
          {courseName}
        </span>
        <span className="ml-auto px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold shadow-sm border border-green-200 animate-pulse">
          {type}
        </span>
      </div>
      <motion.div
        className="relative w-full h-44 mb-3 rounded-2xl overflow-hidden border-2 border-blue-100 shadow group"
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <img
          src={getImgUrl(images[imgIdx])}
          alt={courseName}
          className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-110 cursor-pointer"
          onClick={() => {
            if (imagePreviewModal) {
              if (onImageClick) onImageClick(images[imgIdx]);
            } else {
              handlePreviewImage(imgIdx);
            }
          }}
        />
        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 text-xs z-10 shadow"
              onClick={(e) => {
                e.stopPropagation();
                setImgIdx((idx) => (idx === 0 ? images.length - 1 : idx - 1));
              }}
              type="button"
            >
              <FaChevronLeft />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 text-xs z-10 shadow"
              onClick={(e) => {
                e.stopPropagation();
                setImgIdx((idx) => (idx === images.length - 1 ? 0 : idx + 1));
              }}
              type="button"
            >
              <FaChevronRight />
            </button>
          </>
        )}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/30 rounded-2xl"
          onClick={() => {
            if (imagePreviewModal) {
              if (onImageClick) onImageClick(images[imgIdx]);
            } else {
              handlePreviewImage(imgIdx);
            }
          }}
        >
          <FaExpand className="text-white text-2xl" />
        </div>
      </motion.div>
      <div className="w-full flex flex-col gap-1 mt-2">
        <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
          <span className="font-bold text-blue-700">{courseCode}</span>
          <span className="text-green-500">
            {semester} {year}
          </span>
          <span className="ml-auto text-xs text-gray-400">
            Uploaded: {formatUploadDate(uploadTime)}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold shadow-sm">
            <FaUserCircle className="mr-1 text-blue-400" />
            {anonymous ? "Anonymous" : contributor}
          </span>
          <span className="ml-auto text-xs text-gray-500">
            {images.length} image{images.length > 1 ? "s" : ""}
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl text-xs hover:from-blue-600 hover:to-blue-500 justify-center w-fit mx-auto mt-4 shadow-lg font-bold tracking-wide"
          onClick={handleDownload}
        >
          <FaDownload /> Download All
        </motion.button>
      </div>
      {imagePreviewModal
        ? imagePreviewModal({
            imgIdx,
            setImgIdx,
            images,
            open: modalOpen,
            setOpen: setModalOpen,
          })
        : modalOpen &&
          ReactDOM.createPortal(
            <ModalZoomWrapper onWheel={handleWheel}>
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ cursor: dragging ? "grabbing" : "grab" }}
              >
                <button
                  className="fixed top-6 right-8 bg-black/70 text-white rounded-full p-2 text-xl z-50"
                  onClick={() => setModalOpen(false)}
                  type="button"
                >
                  <FaTimes />
                </button>
                <div className="fixed bottom-6 left-8 flex gap-2 bg-white/80 rounded p-1 z-50">
                  <button
                    onClick={() => setZoom((z) => Math.min(z + 0.2, 5))}
                    className="p-1"
                  >
                    <FaSearchPlus />
                  </button>
                  <button
                    onClick={() => setZoom((z) => Math.max(z - 0.2, 0.2))}
                    className="p-1"
                  >
                    <FaSearchMinus />
                  </button>
                  <button onClick={handleResetZoom} className="p-1">
                    <FaSyncAlt />
                  </button>
                </div>
                {images.length > 1 && (
                  <>
                    <button
                      className="fixed left-8 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 text-lg z-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="fixed right-8 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 text-lg z-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
                <img
                  ref={imgRef}
                  src={getImgUrl(images[imgIdx])}
                  alt="Large preview"
                  className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl border-4 border-white select-none"
                  style={{
                    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${
                      pan.y / zoom
                    }px)`,
                    transition: dragging ? "none" : "transform 0.2s",
                  }}
                  draggable={false}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                />
              </div>
            </ModalZoomWrapper>,
            document.body
          )}
    </motion.div>
  );
};

function ModalZoomWrapper({ children, onWheel }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const wheelHandler = (e) => {
      e.preventDefault();
      if (onWheel) onWheel(e);
    };
    el.addEventListener("wheel", wheelHandler, { passive: false });
    return () =>
      el.removeEventListener("wheel", wheelHandler, { passive: false });
  }, [onWheel]);
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
    >
      {children}
    </div>
  );
}

export default Card;
