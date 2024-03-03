import { useState } from "react";
import Calculator from "./Calculator";

const MoneyManagement = () => {
    const [amount, setAmount] = useState('');
    const [cost, setCost] = useState('');
    const [result, setResult] = useState(null);
    const [showAlart, setShowAlart] = useState(false);

    const handleSubmit = (event) => {
        setShowAlart(false)
        event.preventDefault();
        // Convert amount and cost to integers
        const amountInt = parseInt(amount);
        const costInt = parseInt(cost);
        // Call the function to calculate notes
        const notesResult = returnNotes(amountInt, costInt);
        setResult(notesResult);
    };


    const returnNotes = (x, y) => {
        if (x > y) {
            let rest = x - y;
            let result = {};
            const notes = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
            for (let i of notes) {
                if (i <= rest && rest > 0) {
                    let v = Math.floor(rest / i);
                    rest -= v * i;
                    result[i] = v;
                }
            }
            return result;
        } else {
            setShowAlart(true)
        }
    };

    return (
        <>
            <div className="text-center">
                <h1 className="text-2xl font-bold font-serif">Cash Notes Splitter</h1>
                <h2 className="italic"> Simplify Your Currency Breakdown</h2>
            </div>
            {
                showAlart &&
                <div onClick={() => setShowAlart(false)} role="alert" className="alert alert-warning w-fit absolute right-5 btn btn-warning flex items-center text-wrap ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span className="mr-2">Note ammount is less then total cost</span>
                </div>
            }
            <div className="p-8 mt-5 mx-auto md:flex justify-evenly gap-10 block  min-w-[70%]">

                <form onSubmit={handleSubmit} className="w-[300px] space-y-4 md:w-1/2">
                    <div>
                        <label className=" text-gray-700">Enter Given amount:</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value)
                                setShowAlart(false)
                            }}
                            className="form-input input bg-transparent  input-bordered input-primary mt-1  w-full"
                        />
                    </div>
                    <div>
                        <label className=" text-gray-700">Enter total cost:</label>
                        <input
                            type="number"
                            value={cost}
                            onChange={(e) => {
                                setCost(e.target.value)
                                setShowAlart(false)
                            }}
                            className="form-input input bg-transparent input-bordered input-primary  mt-1  w-full"
                        />
                    </div>
                    <button type="submit" className="btn w-full btn-primary">
                        Split Notes
                    </button>
                </form>
                <div className=" mt-5 min-w-[300px]">

                    {
                        amount - cost > 0 &&
                        <h1>Total Return ammount is <span className="text-rose-600 text-lg">{amount - cost}</span> Taka</h1>
                    }                    <ul className="mt-4 list-disc text-xl w-full md:w-1/2 mx-5">
                        {result &&
                            Object.entries(result).map(([note, count]) => (
                                <li key={note} className="text-gray-700">
                                    {note} Notes: {count}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <Calculator/>
        </>
    );
};

export default MoneyManagement;