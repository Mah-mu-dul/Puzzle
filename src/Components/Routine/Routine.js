import { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import CostCalculate from "./CostCalculate";
import Courses from "../Courses/Courses.js";
import html2canvas from 'html2canvas';


import qr from '../../Images/qr.png'


// total time slots

// const times = [
//     "08:00-09:30",
//     "09:40-11:10",
//     "11:20-12:50",
//     "13:00-14:30",
//     "14:40-16:10",
//     "16:20-17:50",
//     "18:30-21:30",
// ];

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

    const [times, setTimes] = useState([
        "08:00-09:30",
        "09:40-11:10",
        "11:20-12:50",
        "13:00-14:30",
        "14:40-16:10",
        "16:20-17:50",
        "18:30-21:30",
    ])
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
                    updatedRoutine[day] = [];
                }

                updatedRoutine[day].forEach(i => {
                    if (i.time === selectedTime) {
                        // updatedRoutine[day][i].course = courseName
                        i.course = courseName
                        console.log(updatedRoutine);
                    }
                })
                updatedRoutine[day].push({
                    time: selectedTime,
                    course: courseName,
                });
                console.log(updatedRoutine);

                // console.log(updatedRoutine[day]);
            });

            setRoutine(updatedRoutine);
            setCourseName("");
            setSelectedTime("");
            setSelectedDay("");
        }
    };

    const handleDownloadPDF = () => {
        // Initialize a new jsPDF instanc
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
        });

        // Define styles for the table
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

        // Get the table element
        const table = tableRef.current;

        // Add the table to the PDF with the specified styles
        doc.autoTable({ html: table, ...tableStyles });

        // Save the PDF with a specific filename
        doc.save("Easy-Rutine.pdf");
    };

    // download img
    const handledownloadPNG = () => {
        // Generate the QR code as an image using html2canvas
        html2canvas(routineRef.current).then((canvas) => {
            const dataURL = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = 'Easy-Rutine.png';
            a.click();
        });
    }

    const handleAddCustomTime = () => {
        const customTimeSlots = prompt("Enter comma separated custom time slots  (e.g., '09:00-10:30,10:40-11:10'):");
        if (customTimeSlots) {
            const customTimesArray = customTimeSlots.split(',').map(slot => slot.trim());
            setTimes(customTimesArray);
        }
    }

    const handleDoubleClick = (daySlot, time) => {
        const updatedRoutine = { ...routine };

        // Check if the cell is empty or not present
        if (!updatedRoutine[daySlot]) {
            updatedRoutine[daySlot] = [];
        }

        const cellIndex = updatedRoutine[daySlot].findIndex((item) => item.time === time);

        if (cellIndex !== -1) {
            // Clear the cell's content
            updatedRoutine[daySlot][cellIndex].course = "";
        } else {
            // Add an empty cell
            updatedRoutine[daySlot].push({ time, course: "" });
        }

        setRoutine(updatedRoutine);
    };

    useEffect(() => {
        const handleScroll = () => {
            // You can add more logic here if needed
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    return (
        <div className="p-4  w-full " id="top">
            <button
                className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-[9px] z-10 rounded-full shadow-md bg-rose-600 transition duration-300"
                onClick={scrollToTop}
            >^</button>
            <h2 className="text-2xl mb-4 w-fit mx-auto text-rose-600">Make your course plan </h2>
            <h2 className="text-sm mb-4 w-fit mx-auto lg:hidden md:hidden text-center text-rose-600">For better view use Computer screen</h2>
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
                                handleAddCustomTime(); // Call the handler when "Custom Time Slots" is selected
                            }
                        }}
                        className="border p-2 rounded-lg bg-transparent text-black border-rose-400"
                    >
                        <option value="" >Select Time</option>
                        {times.map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                        <option value="custom">Custom Time Slots</option>
                    </select>

                </div>
                <br />
                <div className="flex gap-5">
                    <button onClick={handleAddCourse}
                        className="bg-rose-500 text-white p-2 mt-2 rounded-lg">
                        Add Course
                    </button>

                </div>
            </div>
            <div className="sm:overflow-scroll md:overflow-scroll lg:overflow-hidden w-full mx-auto flex justify-center my-5 px-3" >
                <div className="w-full">
                    <div className=" p-3 w-fit mx-auto flex flex-col justify-center items-center" ref={routineRef}>
                        <h1 className="text-center text-2xl">Elevate Your Routine Effortlessly</h1>
                        <table className=" rounded-md mt-5 mx-auto   w-fit" ref={tableRef}>
                            <thead>
                                <tr>
                                    <th className="border  border-rose-400  px-4 py-2 text-sm " />

                                    {times.map((time) => (
                                        <th key={time} className="border whitespace-nowrap border-rose-400  px-4 py-2" >
                                            {format12Hour(time)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {daySlots.slice(3).map((daySlot) => (
                                    <tr key={daySlot.value}>
                                        <td className="border border-rose-400  px-4 py-2">{daySlot.label}</td>
                                        {times.map((time) => (
                                            <td key={time}
                                                onDoubleClick={() => handleDoubleClick(daySlot.value, time)}
                                                className="border  border-rose-400 text-center  px-4 py-2">
                                                {routine[daySlot.value] &&
                                                    routine[daySlot.value].find((item) => item.time === time) &&
                                                    routine[daySlot.value].find((item) => item.time === time).course
                                                    // &&
                                                    // console.log(routine[daySlot.value])
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="text-center w-[500px] mb-2">Your personalized routine is ready at <span className="text-blue-700">easypuzzle.netlify.app </span>.
                            <br />
                            To explore more services Scan the QR code below for quick access:</p>
                        <img className="w-20" src={qr} alt="" />
                    </div>
                </div>
            </div>
            <div className=" w-fit mx-auto">
                <button onClick={handleDownloadPDF}
                    className="border border-rose-500 mx-auto  text-black p-2 mt-2 rounded">
                    Download PDF
                </button>
                <button className='border p-2 border-rose-500 ml-3 rounded' onClick={handledownloadPNG}>
                    Download PNG
                </button>

            </div>
            <div className="divider"></div>

            <div className="px-2">
                <CostCalculate />
            </div>
            <div className="divider"></div>
            <br />
            <div className="px-2">
                <Courses />
            </div>
        </div>
    );
};

export default Routine;
