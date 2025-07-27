import React, { useState } from "react";
import ImagePreviewModal from "./ImagePreviewModal";

const DuplicateCheckResults = ({ results }) => {
  const [imgModal, setImgModal] = useState({ idx: null, images: [] });
  const [collapsed, setCollapsed] = useState(false);
  if (!results || results.length === 0) return null;
  return (
    <div className="mt-6">
      <div className="collapse collapse-arrow bg-yellow-50 border border-yellow-300 rounded-xl">
        <input
          type="checkbox"
          className="peer"
          checked={!collapsed}
          onChange={() => setCollapsed((c) => !c)}
          readOnly
        />
        <div className="collapse-title font-bold text-yellow-800 text-lg select-none">
          Possible Duplicates Found:
        </div>
        <div className="collapse-content">
          <div className="grid gap-4">
            {results.map((item, i) => (
              <div
                key={item.id || i}
                className="bg-white rounded-lg shadow p-3 flex flex-col md:flex-row gap-4 items-start border border-yellow-200"
              >
                <div className="flex-1">
                  <div className="font-semibold text-blue-700 text-base">
                    {item.courseName} ({item.courseCode})
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    <span className="mr-2">{item.type}</span>
                    <span className="mr-2">
                      {item.semester} {item.year}
                    </span>
                    {item.anonymous ? (
                      <span className="italic text-gray-400">Anonymous</span>
                    ) : (
                      <span className="text-gray-600">
                        By: {item.contributor}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {(item.images || []).map((img, idx) => (
                    <img
                      key={img.url || img}
                      src={typeof img === "string" ? img : img.url}
                      alt="preview"
                      className="w-16 h-16 object-cover rounded border border-blue-200 cursor-pointer shadow"
                      onClick={() => setImgModal({ idx, images: item.images })}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {imgModal.idx !== null && (
        <ImagePreviewModal
          images={imgModal.images}
          imgModalIdx={imgModal.idx}
          setImgModalIdx={(idx) =>
            idx === null
              ? setImgModal({ idx: null, images: [] })
              : setImgModal((m) => ({ ...m, idx }))
          }
          zoom={1}
          setZoom={() => {}}
          pan={{ x: 0, y: 0 }}
          setPan={() => {}}
          dragging={false}
          setDragging={() => {}}
          imgRef={null}
          handleWheel={() => {}}
          handleMouseDown={() => {}}
          handleMouseMove={() => {}}
          handleMouseUp={() => {}}
          handleResetZoom={() => {}}
        />
      )}
    </div>
  );
};

export default DuplicateCheckResults;
