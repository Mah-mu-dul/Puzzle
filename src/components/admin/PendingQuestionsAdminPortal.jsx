import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-hot-toast";
import PreviousSemQuestionsModal from "../previousSemQuestions/PreviousSemQuestionsModal";

const TABS = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "declined", label: "Declined" },
];

function PendingQuestionsTable({
  data,
  onApprove,
  onDecline,
  onPreview,
  actionLoading,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-blue-50">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Course</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Semester</th>
            <th className="p-2 border">Anonymous</th>
            <th className="p-2 border">Contributor</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((q) => (
            <tr key={q.id} className="hover:bg-blue-50">
              <td className="p-2 border">
                <img
                  src={(q.images && q.images[0]?.url) || q.images[0]}
                  alt="preview"
                  className="w-12 h-12 object-cover rounded cursor-pointer border"
                  onClick={() => onPreview(q)}
                />
              </td>
              <td className="p-2 border">
                {q.courseName} <br />
                <span className="text-xs text-gray-500">{q.courseCode}</span>
              </td>
              <td className="p-2 border">{q.type}</td>
              <td className="p-2 border">
                {q.semester}-{q.year.slice(2, 5)}
              </td>
              <td className="p-2 border">{q.anonymous ? "True" : "Fasle"}</td>
              <td className="p-2 border">{q.contributor}</td>
              <td className="p-2 border">{q.status || "pending"}</td>
              <td className="p-2 border">
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded mr-2 disabled:opacity-60"
                  onClick={() => onApprove(q)}
                  disabled={actionLoading || q.status === "approved"}
                >
                  Approve
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded disabled:opacity-60"
                  onClick={() => onDecline(q)}
                  disabled={actionLoading || q.status === "declined"}
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ApprovedQuestionsTable({ data, onPreview }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-blue-50">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Course</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Semester</th>
            <th className="p-2 border">Year</th>
            <th className="p-2 border">Anonymous</th>
            <th className="p-2 border">Contributor</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((q) => (
            <tr key={q.id} className="hover:bg-blue-50">
              <td className="p-2 border">
                <img
                  src={(q.images && q.images[0]?.url) || q.images[0]}
                  alt="preview"
                  className="w-12 h-12 object-cover rounded cursor-pointer border"
                  onClick={() => onPreview(q)}
                />
              </td>
              <td className="p-2 border">
                {q.courseName} <br />
                <span className="text-xs text-gray-500">{q.courseCode}</span>
              </td>
              <td className="p-2 border">{q.type}</td>
              <td className="p-2 border">{q.semester}</td>
              <td className="p-2 border">{q.year}</td>
              <td className="p-2 border">{q.anonymous ? "True" : "False"}</td>
              <td className="p-2 border">{q.contributor}</td>
              <td className="p-2 border">approved</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DeclinedQuestionsTable({ data, onPreview }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-blue-50">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Course</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Semester</th>
            <th className="p-2 border">Year</th>
            <th className="p-2 border">Anonymous</th>
            <th className="p-2 border">Contributor</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((q) => (
            <tr key={q.id} className="hover:bg-blue-50">
              <td className="p-2 border">
                <img
                  src={(q.images && q.images[0]?.url) || q.images[0]}
                  alt="preview"
                  className="w-12 h-12 object-cover rounded cursor-pointer border"
                  onClick={() => onPreview(q)}
                />
              </td>
              <td className="p-2 border">
                {q.courseName} <br />
                <span className="text-xs text-gray-500">{q.courseCode}</span>
              </td>
              <td className="p-2 border">{q.type}</td>
              <td className="p-2 border">{q.semester}</td>
              <td className="p-2 border">{q.year}</td>
              <td className="p-2 border">{q.anonymous ? "True" : "False"}</td>
              <td className="p-2 border">{q.contributor}</td>
              <td className="p-2 border">declined</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const PendingQuestionsAdminPortal = () => {
  const [tab, setTab] = useState("pending");
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [declined, setDeclined] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalQuestion, setModalQuestion] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    // Fetch pending
    const snapPending = await getDocs(collection(db, "preQuestionsPending"));
    const allPending = snapPending.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPending(allPending.filter((q) => q.status === "pending"));
    setDeclined(allPending.filter((q) => q.status === "declined"));
    // Fetch approved
    const snapApproved = await getDocs(collection(db, "questions"));
    const allApproved = snapApproved.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setApproved(allApproved);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleApprove = async (q) => {
    setActionLoading(true);
    try {
      // Move to questions
      const { id, ...data } = q;
      await addDoc(collection(db, "questions"), {
        ...data,
        approved: true,
        status: "approved",
      });
      await deleteDoc(doc(db, "preQuestionsPending", id));
      toast.success("Approved and published!");
      fetchAll();
    } catch (e) {
      toast.error("Failed to approve");
    }
    setActionLoading(false);
  };

  const handleDecline = async (q) => {
    setActionLoading(true);
    try {
      await updateDoc(doc(db, "preQuestionsPending", q.id), {
        status: "declined",
      });
      toast.success("Marked as declined.");
      fetchAll();
    } catch (e) {
      toast.error("Failed to decline");
    }
    setActionLoading(false);
  };

  const handlePreview = (q) => {
    setModalQuestion(q);
    setModalOpen(true);
  };

  let content;
  if (loading) {
    content = <div className="text-blue-600">Loading...</div>;
  } else if (tab === "pending") {
    content =
      pending.length === 0 ? (
        <div className="text-gray-500">No pending questions.</div>
      ) : (
        <PendingQuestionsTable
          data={pending}
          onApprove={handleApprove}
          onDecline={handleDecline}
          onPreview={handlePreview}
          actionLoading={actionLoading}
        />
      );
  } else if (tab === "approved") {
    content =
      approved.length === 0 ? (
        <div className="text-gray-500">No approved questions.</div>
      ) : (
        <ApprovedQuestionsTable data={approved} onPreview={handlePreview} />
      );
  } else if (tab === "declined") {
    content =
      declined.length === 0 ? (
        <div className="text-gray-500">No declined questions.</div>
      ) : (
        <DeclinedQuestionsTable data={declined} onPreview={handlePreview} />
      );
  }

  return (
    <div className="my-10 p-4 bg-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Pending Questions Admin Portal
      </h2>
      <nav className="flex gap-2 mb-6 border-b pb-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-all ${
              tab === t.key
                ? "bg-blue-100 text-blue-700 border-blue-500"
                : "bg-gray-50 text-gray-500 border-transparent hover:bg-blue-50"
            }`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      {content}
      {modalOpen && modalQuestion && (
        <PreviousSemQuestionsModal
          question={{
            ...modalQuestion,
            images: modalQuestion.images.map((img) => img.url || img),
          }}
          initialImgIdx={0}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PendingQuestionsAdminPortal;
