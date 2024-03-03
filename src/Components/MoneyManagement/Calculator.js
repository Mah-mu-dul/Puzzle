import React, { useEffect, useState } from 'react';

const Calculator = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState('');

    const handleButtonClick = (value) => {
        setInput((prevInput) => prevInput + value);
        // handleCalculate()
    };

    const handleClearButtonClick = () => {
        setInput('');
        setOutput('');
    };

    const handleDeleteButtonClick = () => {
        setInput((prevInput) => prevInput.slice(0, -1));
    };
    const handleSubmit = e => {
        e.preventDefault()
        handleCalculate()
    }
    const handleCalculate = (e) => {
        try {
            if (input == "") {
                setOutput("")
            }
            else {
                const result = eval(fixArithmetic(input));
                setOutput(result.toString());
            }
        } catch (error) {
            setOutput('Error');
        }
    };
    function fixArithmetic(expression) {
        let fixedExpression = '';
        let openBrackets = 0;
        for (let i = 0; i < expression.length; i++) {
            if (expression[i] === '(') {
                openBrackets++;
                fixedExpression += '*(';
            } else if (expression[i] === ')' && openBrackets > 0) {
                openBrackets--;
                fixedExpression += ')';
            } else if (i !== 0 && /[0-9]/.test(expression[i]) && expression[i - 1] === ')') {
                fixedExpression += '*' + expression[i];
            } else {
                fixedExpression += expression[i];
            }
        }
        while (openBrackets > 0) {
            fixedExpression += ')';
            openBrackets--;
        }
        return fixedExpression;
    }

    useEffect(() => {
        console.log("hitted");
        handleCalculate();
    }, [input]);
    return (
        <div className="max-w-xs mx-auto my-8 p-4 bg-[#ffffffb1] rounded-md text-black">
            <h1 className='text-xl font-medium my-5'>Easy Calculator</h1>
            <form action="" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    className="w-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-12 text-xl px-2 mb-4 bg-white text-black rounded-md"
                />
            </form>
            <h2 className="w-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-right h-12 text-xl px-2 mb-4 bg-white text-black rounded-md"
            >{output}</h2>
            <div className="grid grid-cols-4 gap-2">
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#9995] hover:bg-[#9996] text-black" onClick={() => handleButtonClick('(')}> ( </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#9995] hover:bg-[#9996] text-black" onClick={() => handleButtonClick(')')}> ) </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-red-500 hover:bg-red-600 text-black" onClick={handleClearButtonClick}>Clear </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-red-500 hover:bg-red-600 text-black" onClick={handleDeleteButtonClick}>del </button>

                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#9995] hover:bg-[#9996] text-black" onClick={() => handleButtonClick('7')}> 7 </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#9995] hover:bg-[#9996] text-black" onClick={() => handleButtonClick('8')}> 8 </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#9995] hover:bg-[#9996] text-black" onClick={() => handleButtonClick('9')}> 9 </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-yellow-400 hover:bg-yellow-500 text-black" onClick={() => handleButtonClick('/')}> / </button>

                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#9995] hover:bg-[#9996] text-black" onClick={() => handleButtonClick('4')}> 4 </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#9995] hover:bg-[#9996] text-black" onClick={() => handleButtonClick('5')}> 5 </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#9995] hover:bg-[#9996] text-black" onClick={() => handleButtonClick('6')}> 6 </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-yellow-400 hover:bg-yellow-500 text-black" onClick={() => handleButtonClick('*')}> * </button>

                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#9995] hover:bg-[#9996] text-black" onClick={() => handleButtonClick('1')}> 1 </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#9995] hover:bg-[#9996] text-black" onClick={() => handleButtonClick('2')}> 2 </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#9995] hover:bg-[#9996] text-black" onClick={() => handleButtonClick('3')}> 3 </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-yellow-400 hover:bg-yellow-500 text-black" onClick={() => handleButtonClick('-')}> - </button>

                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#9995] hover:bg-[#9996] text-black" onClick={() => handleButtonClick('0')}> 0 </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-[#9995] hover:bg-[#9996] text-black" onClick={() => handleButtonClick('.')}> . </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-yellow-400 hover:bg-yellow-500 text-black" onClick={() => handleCalculate()}> = </button>
                <button className="btn border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-yellow-400 hover:bg-yellow-500 text-black" onClick={() => handleButtonClick('+')}> + </button>
            </div>
            <div className="mt-4 text-center">

            </div>
        </div>
    );
};

export default Calculator;
