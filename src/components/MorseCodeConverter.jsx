import React, { useState } from 'react';

const MorseCodeConverter = () => {
    const [text, setText] = useState('');
    const [morseCode, setMorseCode] = useState('');

    const convertToMorseCode = () => {
        const morseCodeMap = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
            'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
            'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
            'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
            'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
            'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
            '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
            '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
            '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
            ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-',
            '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/'
        };

        const inputText = text.toUpperCase();
        let result = '';
        for (let i = 0; i < inputText.length; i++) {
            const character = inputText[i];
            const morseCodeCharacter = morseCodeMap[character];
            if (morseCodeCharacter) {
                result += morseCodeCharacter + ' ';
            } else {
                result += ' ';
            }
        }
        setMorseCode(result.trim());
    };

    return (
        <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold my-4">Text to Morse</h1>
            <textarea
                className="w-96 h-32 p-2 bg-transparent border-rose-400 border-2 rounded-md mb-4"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text..."
            ></textarea>
            <button
                className="bg-rose-500 hover:bg-rose-400 text-white font-bold py-2 px-4 rounded"
                onClick={convertToMorseCode}
            >
                Convert
            </button>
            <div className="w-96 h-32 p-2 border-2 border-rose-400 rounded-md mt-4">
                {morseCode}
            </div>
        </div>
    );
};

export default MorseCodeConverter;
