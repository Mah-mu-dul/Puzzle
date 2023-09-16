import { useState } from "react";


// total time slots
const times = [
    "08:00-09:30",
    "09:40-11:10",
    "11:20-12:50",
    "13:00-14:30",
    "14:40-16:10",
    "16:20-17:50",
    "18:30-21:30",
];

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

const format12HourWithoutAMPM = (time) => {
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
                updatedRoutine[day].push({
                    time: selectedTime,
                    course: courseName,
                });
            });

            setRoutine(updatedRoutine);
            setCourseName("");
            setSelectedTime("");
            setSelectedDay("");
        }
    };

    return (
        <div className="p-4  w-full ">
            <h2 className="text-2xl mb-4 w-fit mx-auto text-rose-600">Make your course plan </h2>
            <h2 className="text-sm mb-4 w-fit mx-auto lg:hidden md:hidden text-center text-rose-600">For better view use Computer screen</h2>
            <div className="flex flex-col justify-center place-items-center">
                <div className="lg:block md:flex sm:flex flex-wrap justify-center items-center w-fit gap-3  ">
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
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="border p-2 rounded-lg bg-transparent text-black border-rose-400"
                    >
                        <option value="">Select Time</option>
                        {times.map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
                <br />
                <button onClick={handleAddCourse}
                    className="bg-rose-500 text-white p-2 mt-2 rounded-lg">
                    Add Course
                </button>
            </div>
            <div className="sm:overflow-auto lg:overflow-hidden">
                <table className="table-auto rounded-md mt-5 mx-auto">
                    <thead>
                        <tr>
                            <th className="border border-rose-400  px-4 py-2"></th>
                            {times.map((time) => (
                                <th key={time} className="border border-rose-400  px-4 py-2">
                                    {format12HourWithoutAMPM(time)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {daySlots.slice(3).map((daySlot) => (
                            <tr key={daySlot.value}>
                                <td className="border border-rose-400  px-4 py-2">{daySlot.label}</td>
                                {times.map((time) => (
                                    <td key={time} className="border border-rose-400  px-4 py-2">
                                        {routine[daySlot.value] &&
                                            routine[daySlot.value].find((item) => item.time === time) &&
                                            routine[daySlot.value].find((item) => item.time === time).course}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Routine;
