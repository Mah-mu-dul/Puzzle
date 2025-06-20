import React from "react";
import { FaUserSecret, FaPlus, FaTimes } from "react-icons/fa";
import { ReactSortable } from "react-sortablejs";

const types = ["Mid", "Final", "Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4"];
const semesters = ["Spring", "Autumn", "Summer"];
const years = ["2024", "2023", "2022", "2021", "2020"];

const ContributeForm = ({
  form,
  setForm,
  handleChange,
  handleImageUpload,
  handleRemoveImage,
  handlePreviewImage,
  fileInputRef,
}) => (
  <div className="space-y-4 bg-white rounded-xl shadow-lg p-6 mb-8">
    <div className="flex flex-wrap gap-4">
      <input
        name="courseName"
        value={form.courseName}
        onChange={handleChange}
        placeholder="Course Name (e.g. Data Structures)"
        className="border  border-blue-200 bg-transparent rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1 min-w-[180px]"
      />
      <input
        name="courseCode"
        value={form.courseCode}
        onChange={handleChange}
        placeholder="Course Code (e.g. CSE101)"
        className="border border-blue-200 bg-transparent rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1 min-w-[120px]"
      />
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border border-blue-200 bg-transparent rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1 min-w-[110px]"
      >
        <option value="">Type</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <select
        name="semester"
        value={form.semester}
        onChange={handleChange}
        className="border border-blue-200 bg-transparent rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1 min-w-[110px]"
      >
        <option value="">Semester</option>
        {semesters.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select
        name="year"
        value={form.year}
        onChange={handleChange}
        className="border border-blue-200 bg-transparent rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1 min-w-[90px]"
      >
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
    <label className="flex items-center gap-2 cursor-pointer mt-2">
      <input
        type="checkbox"
        name="anonymous"
        checked={form.anonymous}
        onChange={handleChange}
        className="accent-blue-500"
      />
      <FaUserSecret className="text-gray-500" /> Stay Anonymous
    </label>
    <div>
      <div className="font-semibold mb-1">
        Upload Images (jpg/png/webp, max 3MB each):
      </div>
      <ReactSortable
        tag="div"
        className="flex flex-wrap gap-3 items-center"
        list={form.images}
        setList={(imgs) => setForm((f) => ({ ...f, images: imgs }))}
        animation={200}
      >
        {form.images.map((img, idx) => (
          <div key={img.url} className="relative group cursor-move">
            <img
              src={img.url}
              alt="preview"
              className="w-20 h-20 object-cover rounded border border-blue-200 cursor-pointer shadow"
              onDoubleClick={() => handlePreviewImage(idx)}
            />
            <button
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 group-hover:opacity-100"
              onClick={() => handleRemoveImage(idx)}
              type="button"
            >
              <FaTimes />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-blue-300 rounded bg-blue-50 hover:bg-blue-100 text-blue-400 text-3xl transition"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          title="Add Image"
        >
          <FaPlus />
        </button>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
      </ReactSortable>
    </div>
  </div>
);

export default ContributeForm;
