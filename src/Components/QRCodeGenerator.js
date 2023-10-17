import React, { useRef, useState } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';

const QRCodeGenerator = () => {

    const [url, setUrl] = useState("")
    const [imgsize, setImgsize] = useState("10")
    const qrCodeRef = useRef(null);


    // download qr
    const handleGenerateQRCode = () => {
        // Generate the QR code as an image using html2canvas
        html2canvas(qrCodeRef.current).then((canvas) => {
            const dataURL = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = 'qrcode.png';
            a.click();
        });
    }


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
            <p className='text-2xl font-mono font-medium text-center max-w-[500px]'>Make your QR <br /> Just past you link and download or take an ss</p>
            <input
                className='mt-5 bg-transparent border-2 w-52 border-rose-300 px-2 py-1 mb-5 rounded'
                type="text"
                value={url}
                placeholder="Enter URL"
                onChange={(e) => setUrl(e.target.value)}
            />
            <div ref={qrCodeRef} className="relative    w-40 h-40 rounded-lg flex items-center justify-center">
                <div className="absolute ">
                    <QRCode value={url} fgColor={colorStyle} bgColor="#45454500" />
                </div>
                {/* <div className={`absolute bg-green-300 w-${imgsize} h-${imgsize}`}></div> */}
            </div>
            <button className='border p-2 border-rose-300 rounded' onClick={handleGenerateQRCode}>Download</button>

            <div className="mt-5 ">

                <div className="space-y-2 flex flex-col">
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
