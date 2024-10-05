import { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import CostCalculate from "./CostCalculate";
import html2canvas from "html2canvas";
import AddToCalendar from "./AddToCalender";
import RetakeAssistant from "./RetakeAssistant";

// Day slot options
const daySlots = [
  { value: "st", label: "ST (Sun & Tue)" },
  { value: "mw", label: "MW (Mon & Wed)" },
  { value: "ar", label: "AR (Sat & Thu)" },
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Saturday", label: "Saturday" },
];

// Convert 24-hour format to 12-hour format
const format12Hour = (time) => {
  const [start, end] = time.split("-");
  const [startHour, startMinute] = start.split(":");
  const [endHour, endMinute] = end.split(":");

  const startTime = `${parseInt(startHour) % 12 || 12}:${startMinute}`;
  const endTime = `${parseInt(endHour) % 12 || 12}:${endMinute}`;
  return `${startTime}-${endTime}`;
};

const Routine = () => {
  const [courseName, setCourseName] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [routine, setRoutine] = useState({});
  const routineRef = useRef(null);
  const [pastedText, setPastedText] = useState("");
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  console.log(routine);
  const [times, setTimes] = useState([
    "08:00-09:30",
    "09:40-11:10",
    "11:20-12:50",
    "13:00-14:30",
    "14:40-16:10",
    "16:20-17:50",
    "18:30-21:30",
  ]);
  const tableRef = useRef(null);

  const handleAddCourse = () => {
    if (courseName && selectedTime && selectedDay) {
      const updatedRoutine = { ...routine };
      let daysToAdd = [];
      if (selectedDay === "st") {
        daysToAdd = ["Sunday", "Tuesday"];
      } else if (selectedDay === "mw") {
        daysToAdd = ["Monday", "Wednesday"];
      } else if (selectedDay === "ar") {
        daysToAdd = ["Saturday", "Thursday"];
      } else {
        daysToAdd = [selectedDay];
      }

      daysToAdd.forEach((day) => {
        if (!updatedRoutine[day]) {
          updatedRoutine[day] = {};
        }

        updatedRoutine[day][selectedTime] = courseName;
      });

      setRoutine(updatedRoutine);
      setCourseName("");
      setSelectedTime("");
      setSelectedDay("");
    }
  };


  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const tableStyles = {
      styles: {
        fillColor: [240, 240, 240],
        fontSize: 12,
        textColor: [0, 0, 0],
        overflow: "linebreak",
        valign: "middle",
        halign: "center",
      },
      headStyles: {
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
      },
      margin: { top: 20 },
    };

    const table = tableRef.current;

    doc.autoTable({ html: table, ...tableStyles });

    doc.save("Easy-Rutine.pdf");
  };

  const handledownloadPNG = () => {
    html2canvas(routineRef.current).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "Easy-Rutine.png";
      a.click();
    });
  };

  const handleAddCustomTime = () => {
    const customTimeSlots = prompt(
      "Enter comma separated custom time slots  (e.g., '09:00-10:30,10:40-11:10'):"
    );
    if (customTimeSlots) {
      const customTimesArray = customTimeSlots
        .split(",")
        .map((slot) => slot.trim());
      setTimes(customTimesArray);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Scroll event handler logic
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePastedText = (e) => {
    const pastedText = e.target.value;
    setPastedText(pastedText);

    const lines = pastedText.split("\n");
    const startIndex = lines[0].includes("Code") ? 1 : 0;

    const extractedCourses = lines.slice(startIndex).map((line) => {
      const [code, name, sec, room, time] = line.split("\t");
      let [day, ...timeslotParts] = time ? time.split(":") : ["", ""];
      let timeslot = timeslotParts.join(":");

      return { code, name, sec, room, day, timeslot };
    });

    console.log(extractedCourses);

    // Update routine state
    const updatedRoutine = {};
    extractedCourses.forEach((course) => {
      const { day, timeslot, code } = course;

      let daysToAdd = [];
      if (day.toLowerCase() === "st") {
        daysToAdd = ["Sunday", "Tuesday"];
      } else if (day.toLowerCase() === "mw") {
        daysToAdd = ["Monday", "Wednesday"];
      } else if (day.toLowerCase() === "ar") {
        daysToAdd = ["Saturday", "Thursday"];
      } else if (day.toLowerCase() === "s") {
        daysToAdd = ["Sunday"];
      } else if (day.toLowerCase() === "m") {
        daysToAdd = ["Monday"];
      } else if (day.toLowerCase() === "t") {
        daysToAdd = ["Tuesday"];
      } else if (day.toLowerCase() === "w") {
        daysToAdd = ["Wednesday"];
      } else if (day.toLowerCase() === "r") {
        daysToAdd = ["Thursday"];
      } else if (day.toLowerCase() === "a") {
        daysToAdd = ["Saturday"];
      }
      daysToAdd.forEach((day) => {
        if (!updatedRoutine[day]) {
          updatedRoutine[day] = {};
        }

        updatedRoutine[day][timeslot] = code;
      });
      // console.log(updatedRoutine);
      setRoutine(updatedRoutine);

      setCourseName("");
      setSelectedTime("");
      setSelectedDay("");
    });

    // setRoutine(updatedRoutine);

    // Update courses state
    setCourses(extractedCourses);
  };

  return (
    <div className="p-4  w-full " id="top">
      <h2 className="text-2xl mb-4 w-fit mx-auto text-rose-600">
        Make your course plan{" "}
      </h2>
      <h2 className="text-sm mb-4 w-fit mx-auto lg:hidden md:hidden text-center text-rose-600">
        For better view use Computer screen
      </h2>
      <div className="flex flex-col justify-center place-items-center">
        <div className="lg:flex md:flex sm:flex flex-wrap justify-center items-center w-fit gap-3  ">
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="border p-2 w-56  rounded-lg  bg-transparent text-black border-rose-400"
          />
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="border p-2 rounded-lg lg:mx-5 bg-transparent  text-black border-rose-400"
          >
            <option value="">Select Day Slot</option>
            {daySlots.map((daySlot) => (
              <option key={daySlot.value} value={daySlot.value}>
                {daySlot.label}
              </option>
            ))}
          </select>
          <select
            value={selectedTime}
            onChange={(e) => {
              setSelectedTime(e.target.value);
              if (e.target.value === "custom") {
                handleAddCustomTime();
              }
            }}
            className="border p-2 rounded-lg bg-transparent text-black border-rose-400"
          >
            <option value="">Select Time</option>
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
            <option value="custom">Custom Time Slots</option>
          </select>
        </div>
        <div className="flex gap-5">
          <button
            onClick={handleAddCourse}
            className="bg-transparent px-3 lg:mb-10 md:mb-10 py-1 mt-3 hover:bg-amber-200 border-2 border-rose-400 rounded"
          >
            Add Course
          </button>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-transparent px-3 lg:mb-10 md:mb-10 py-1 mt-3 hover:bg-amber-200 border-2 border-rose-400 rounded"
            data-tip="copy your class schedule from iras as it is with the gade."
          >
            copy past
          </button>
          {/* <AddToCalendar /> */}
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
            <div className="bg-white p-4 rounded-lg w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/4 mx-auto">
              <textarea
                placeholder="Paste your course information here..."
                value={pastedText}
                onChange={handlePastedText}
                className="border p-2 mt-4 w-full rounded-lg bg-transparent text-black border-rose-400"
                rows="5"
              />
              <button
                onClick={() => setShowPopup(false)}
                className="bg-rose-500 text-white p-2 mt-2 rounded-lg w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="sm:overflow-scroll md:overflow-scroll lg:overflow-hidden w-full mx-auto flex justify-center my-5 px-3">
        <div className="w-full">
          <div
            className=" p-3 w-fit mx-auto flex flex-col justify-center items-center"
            ref={routineRef}
          >
            <h1 className="text-center text-2xl">
              Elevate Your Routine Effortlessly
            </h1>
            <table className=" rounded-md mt-5 mx-auto   w-fit" ref={tableRef}>
              <thead>
                <tr>
                  <th className="border  border-rose-400  px-4 py-2 text-sm " />

                  {times.map((time) => (
                    <th
                      key={time}
                      className="border whitespace-nowrap border-rose-400  px-4 py-2"
                    >
                      {format12Hour(time)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {daySlots.slice(3).map((daySlot) => (
                  <tr key={daySlot.value}>
                    <td className="border border-rose-400  px-4 py-2">
                      {daySlot.label}
                    </td>
                    {times.map((time) => (
                      <td
                        key={time}
                        className="border  border-rose-400 text-center  px-4 py-2"
                      >
                        <div
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => {
                            const newRoutine = { ...routine };
                            if (!newRoutine[daySlot.value]) {
                              newRoutine[daySlot.value] = {};
                            }
                            newRoutine[daySlot.value][time] =
                              e.target.textContent;
                            setRoutine(newRoutine);
                          }}
                        >
                          {routine[daySlot.value] &&
                            routine[daySlot.value][time]}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className=" w-fit mx-auto">
        <button
          onClick={handleDownloadPDF}
          className="border border-rose-500 mx-auto  text-black p-2 mt-2 rounded"
        >
          Download PDF
        </button>
        <button
          className="border p-2 border-rose-500 ml-3 rounded"
          onClick={handledownloadPNG}
        >
          Download PNG
        </button>
      </div>
      <div className="divider"></div>

      <div className="px-2">
        <RetakeAssistant />
        <CostCalculate />
      </div>
      <div className="divider"></div>
      <br />
    </div>
  );
};

export default Routine;
