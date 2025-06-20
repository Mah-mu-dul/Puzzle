import React from "react";
import {
  FaTimes,
  FaSearchPlus,
  FaSearchMinus,
  FaSyncAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function ModalZoomWrapper({ children, onWheel }) {
  const ref = React.useRef();
  React.useEffect(() => {
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

const ImagePreviewModal = ({
  images,
  imgModalIdx,
  setImgModalIdx,
  zoom,
  setZoom,
  pan,
  setPan,
  dragging,
  setDragging,
  imgRef,
  handleWheel,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleResetZoom,
}) => {
  const getImgUrl = (img) => (typeof img === "string" ? img : img?.url);
  return (
    <ModalZoomWrapper onWheel={handleWheel}>
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ cursor: dragging ? "grabbing" : "grab" }}
      >
        <button
          className="fixed top-6 right-8 bg-black/70 text-white rounded-full p-2 text-xl z-50"
          onClick={() => setImgModalIdx(null)}
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
                setImgModalIdx((idx) =>
                  idx === 0 ? images.length - 1 : idx - 1
                );
              }}
            >
              <FaChevronLeft />
            </button>
            <button
              className="fixed right-8 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 text-lg z-50"
              onClick={(e) => {
                e.stopPropagation();
                setImgModalIdx((idx) =>
                  idx === images.length - 1 ? 0 : idx + 1
                );
              }}
            >
              <FaChevronRight />
            </button>
          </>
        )}
        <img
          ref={imgRef}
          src={getImgUrl(images[imgModalIdx])}
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
    </ModalZoomWrapper>
  );
};

export default ImagePreviewModal;
