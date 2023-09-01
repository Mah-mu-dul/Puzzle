import React, { useState, useEffect } from 'react';

const initialRows = [
    { courseName: '', grade: '4.00', credits: '' },
    { courseName: '', grade: '4.00', credits: '' },
    { courseName: '', grade: '4.00', credits: '' },
];

const gradeOptions = [
    { value: '4.00', label: 'A+' },
    { value: '3.75', label: 'A' },
    { value: '3.50', label: 'B+' },
    { value: '3.25', label: 'B' },
    { value: '3.00', label: 'C+' },
    { value: '2.75', label: 'C' },
    { value: '2.50', label: 'D+' },
    { value: '2.25', label: 'D' },
    { value: '0.00', label: 'F' },
    { value: '0', label: 'I' },
];

function AIUBCG() {
    const [rows, setRows] = useState(initialRows);
    const [previousCGPA, setPreviousCGPA] = useState('');
    const [previousEarnedCredit, setPreviousEarnedCredit] = useState('');

    useEffect(() => {
        calculateTotalEarnedCredit();
        calculateCGPA();
    }, [previousCGPA, previousEarnedCredit, rows]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };

    const addRow = () => {
        setRows([...rows, { courseName: '', grade: '4.00', credits: '' }]);
    };

    const calculateTotalEarnedCredit = () => {
        let totalCredits = 0;

        rows.forEach((row) => {
            const credits = parseFloat(row.credits);

            if (!isNaN(credits)) {
                totalCredits += credits;
            }
        });

        if (!isNaN(parseFloat(previousEarnedCredit))) {
            totalCredits += parseFloat(previousEarnedCredit);
        }

        return totalCredits;
    };

    const calculateCGPA = () => {
        let totalCredits = 0;
        let totalGradePoints = 0;

        rows.forEach((row) => {
            const credits = parseFloat(row.credits);
            const grade = parseFloat(row.grade);

            if (!isNaN(credits) && !isNaN(grade)) {
                totalCredits += credits;
                totalGradePoints += credits * grade;
            }
        });

        if (!isNaN(parseFloat(previousEarnedCredit))) {
            totalCredits += parseFloat(previousEarnedCredit);
        }

        if (!isNaN(parseFloat(previousCGPA))) {
            totalGradePoints += parseFloat(previousCGPA) * parseFloat(previousEarnedCredit);
        }

        if (totalCredits === 0) {
            return 'N/A';
        }

        const cgpa = (totalGradePoints / totalCredits).toFixed(2);
        return cgpa;
    };

    return (
        <div className='w-fit lg:mx-auto md:mx-auto sm:mx-3 relative '>
            <div className=' right-0'>
                <strong>CGPA: {calculateCGPA()}</strong> <br />
                <strong>Total Earned Credit: {calculateTotalEarnedCredit()}</strong>
            </div>

            <br />

            <div>
                <label htmlFor="previousCGPA">Previous CGPA:</label>
                <input
                    className='bg-gray-200 px-2 w-20 ml-2 rounded border-0 '
                    type="number"
                    id="previousCGPA"
                    value={previousCGPA}
                    onChange={(e) => setPreviousCGPA(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="previousEarnedCredit">Previous Earned Credit:</label>
                <input
                    className='bg-gray-200 px-2 w-20 ml-2 my-1 rounded border-0 '
                    type="number"
                    id="previousEarnedCredit"
                    value={previousEarnedCredit}
                    onChange={(e) => setPreviousEarnedCredit(e.target.value)}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th className='text-sm'>Course Name (optional)</th>
                        <th className='text-sm'>No. of Credits</th>
                        <th className='text-sm'>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    className='bg-gray-200 px-2 lg:w-48 sm:w-36 rounded border-0 '
                                    type="text"
                                    name="courseName"
                                    value={row.courseName}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </td>
                            <td>
                                <input
                                    className='bg-gray-200 rounded mx-5 border-0  w-20 px-2'
                                    type="number"
                                    min="0"
                                    max="5"
                                    name="credits"
                                    value={row.credits}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </td>
                            <td>
                                <select
                                    className='bg-gray-200 px-2  rounded border-0'
                                    name="grade"
                                    value={row.grade}
                                    onChange={(e) => handleChange(e, index)}
                                >
                                    {gradeOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <button className='bg-transparent px-3 py-1 mt-3 hover:bg-amber-200 border-2 rounded' onClick={addRow}>Add Row</button>
        </div>
    );
}

export default AIUBCG;
