import React, { useState, useEffect } from 'react';

const initialRows = [
    { courseName: '', grade: '4.00', credits: '' },
    { courseName: '', grade: '4.00', credits: '' },
    { courseName: '', grade: '4.00', credits: '' },
];



function CalculateCg() {
    const [gradeOptions, setGradeOptions] = useState([
        { value: '4.00', label: 'A	' },
        { value: '3.7', label: 'A-' },
        { value: '3.3', label: 'B+' },
        { value: '3.0', label: 'B	' },
        { value: '2.7', label: 'B-' },
        { value: '2.3', label: 'C+' },
        { value: '2.0', label: 'C	' },
        { value: '1.7', label: 'C-' },
        { value: '1.3', label: 'D+' },
        { value: '1', label: 'D	' },
    ])
    const [rows, setRows] = useState(initialRows);
    const [previousCGPA, setPreviousCGPA] = useState('');
    const [uName, setUName] = useState('Independent University, Bangladesh');
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
    const handleUniversity = (e) => {

        if (e.target.value === "iub") {
            setGradeOptions([
                { value: '4.00', label: 'A' },
                { value: '3.7', label: 'A-' },
                { value: '3.3', label: 'B+' },
                { value: '3.0', label: 'B   ' },
                { value: '2.7', label: 'B-' },
                { value: '2.3', label: 'C+' },
                { value: '2.0', label: 'C' },
                { value: '1.7', label: 'C-' },
                { value: '1.3', label: 'D+' },
                { value: '1.0', label: 'D' },
                { value: '0.0', label: 'F' },
            ])
            setUName("Independent University, Bangladesh.")


        } else if (e.target.value === "aiub") {
            setGradeOptions([
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
            ])

            setUName("American International University - Bangladesh")

        } else if (e.target.value === "nsu") {
            setGradeOptions([
                { value: '4.00', label: 'A' },
                { value: '3.7', label: 'A-' },
                { value: '3.3', label: 'B+' },
                { value: '3.0', label: 'B   ' },
                { value: '2.7', label: 'B-' },
                { value: '2.3', label: 'C+' },
                { value: '2.0', label: 'C' },
                { value: '1.7', label: 'C-' },
                { value: '1.3', label: 'D+' },
                { value: '1.0', label: 'D' },
                { value: '0.0', label: 'F' },

            ])
            setUName("North South University")


        } else if (e.target.value === "diu") {
            setGradeOptions([
                { value: '4.00', label: 'A+' },
                { value: '3.75', label: 'A' },
                { value: '3.50', label: 'A-' },
                { value: '3.25', label: 'B+' },
                { value: '3.00', label: 'B' },
                { value: '2.75', label: 'B-' },
                { value: '2.50', label: 'C+' },
                { value: '2.25', label: 'C' },
                { value: '2.00', label: 'D' },
                { value: '0', label: 'F' },
            ])
            setUName("Daffodil International University")

        } else if (e.target.value === "ewu") {
            setGradeOptions([
                { value: '4.00', label: 'A+' },
                { value: '4.00', label: 'A' },
                { value: '3.70', label: 'A-' },
                { value: '3.3', label: 'B+' },
                { value: '3.00', label: 'B' },
                { value: '2.7', label: 'B-' },
                { value: '2.3', label: 'C+' },
                { value: '2.0', label: 'C' },
                { value: '1.7', label: 'C-' },
                { value: '1.3', label: 'D+' },
                { value: '1', label: 'D' },
                { value: '0', label: 'F' },
            ])
            setUName("East West University")
        } else if (e.target.value === "uiu") {
            setGradeOptions([
                { value: '4.00', label: 'A' },
                { value: '3.67', label: 'A-' },
                { value: '3.33', label: 'B+' },
                { value: '3', label: 'B' },
                { value: '2.67', label: 'B-' },
                { value: '2.33', label: 'C+' },
                { value: '2.0', label: 'C' },
                { value: '1.67', label: 'C-' },
                { value: '1.33', label: 'D+' },
                { value: '1', label: 'D' },
                { value: '0', label: 'F' },
            ])
            setUName("United International University")
        }


    }
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

    return (<>
        <p className='text-rose-600 font-bold text-lg w-fit mx-auto mb-10' id="label">{uName}</p>
        <div className='w-fit lg:mx-auto md:mx-auto sm:mx-3 relative '>
            <div className=' flex justify-between'>
                <span>
                    <strong>CGPA: <span className='text-rose-600'>{calculateCGPA()}</span></strong> <br />
                    <strong>Total Earned Credit: <span className='text-rose-600'>{calculateTotalEarnedCredit()}</span></strong>
                </span>
                <span>
                    <select
                        className='bg-transparent p-2  rounded border-2 border-rose-400'
                        name=""
                        onChange={(e) => handleUniversity(e)}
                        id="">
                        <option value="iub">IUB</option>
                        <option value="aiub">AIUB</option>
                        <option value="nsu">NSU</option>
                        <option value="diu">DIU</option>
                        <option value="ewu">EWU</option>
                        <option value="uiu">UIU</option>
                    </select>

                </span>
            </div>

            <br />

            <div>
                <label htmlFor="previousCGPA">Previous CGPA:</label>
                <input
                    className='bg-transparent px-2 w-20 ml-2 rounded border-2 border-rose-400 '
                    type="number"
                    id="previousCGPA"
                    value={previousCGPA}
                    onChange={(e) => setPreviousCGPA(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="previousEarnedCredit">Previous Earned Credit:</label>
                <input
                    className='bg-transparent px-2 w-20 ml-2 my-1 rounded border-2 border-rose-400 '
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
                                    className='bg-transparent px-2 lg:w-48 sm:w-36 rounded border-2 border-rose-400 '
                                    type="text"
                                    placeholder='Course Name'
                                    name="courseName"
                                    value={row.courseName}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </td>
                            <td>
                                <input
                                    className='bg-transparent rounded mx-5 border-2 border-rose-400  w-20 px-2'
                                    type="number"
                                    placeholder='Credits'
                                    name="credits"
                                    value={row.credits}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </td>
                            <td>
                                <select
                                    className='bg-transparent px-2  rounded border-2 border-rose-400'
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

            <button className='bg-transparent px-3 lg:mb-10 md:mb-10 py-1 mt-3 hover:bg-amber-200 border-2 border-rose-400 rounded' onClick={addRow}>Add Row</button>
        </div>
    </>
    );
}

export default CalculateCg;
