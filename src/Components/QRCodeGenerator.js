import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {

    const [url, setUrl] = useState("")
    const [imgsize, setImgsize] = useState("10")


    // color slider
    const [rgbaValues, setRgbaValues] = useState({
        red: 40,
        green: 40,
        blue: 60,
        alpha: 1.0,
    });

    const handleChange = (event, channel) => {
        const value = event.target.value;
        setRgbaValues({ ...rgbaValues, [channel]: value });
    };

    const { red, green, blue, alpha } = rgbaValues;
    const colorStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

    return (
        <div className='w-fit mx-auto flex flex-col items-center'>

            <input
                className=' bg-transparent border-2 w-52 border-rose-300 px-2 py-1 mb-5 rounded'
                type="text"
                value={url}
                placeholder="Enter URL"
                onChange={(e) => setUrl(e.target.value)}
            />
            <div className="relative mt-14 bg-red-300 w-fit h-fit flex items-center justify-center">
                <div className="absolute">
                    <QRCode value={url} fgColor={colorStyle} bgColor="#45454500" />
                </div>
                {/* <div className={`absolute bg-green-300 w-${imgsize} h-${imgsize}`}></div> */}
            </div>

            <div className="p-4 mt-14">

                <div
                    className="w-32 my-5 h-10 bg-gray-300 mt-4 rounded-lg"
                    style={{ backgroundColor: colorStyle }}
                />
                <div className="space-y-4 flex flex-col">
                    <input
                        type="range"
                        className="text-black"
                        min="0"
                        max="255"
                        value={red}
                        onChange={(e) => handleChange(e, 'red')}
                    />
                    <input
                        type="range"
                        min="0"
                        max="255"
                        value={green}
                        onChange={(e) => handleChange(e, 'green')}
                    />
                    <input
                        type="range"
                        min="0"
                        max="255"
                        value={blue}
                        onChange={(e) => handleChange(e, 'blue')}
                    />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={alpha}
                        onChange={(e) => handleChange(e, 'alpha')}
                    />
                </div>
            </div>
        </div>
    );
}


export default QRCodeGenerator;
