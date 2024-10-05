import React from 'react';

const WaveText = ({ txt }) => {
    console.log(txt);
    return (
        <p className='flex flex-wrap items-center justify-center'>
            {txt.split(" ").map((word, i) => (
                <p>
                    {word.split("").map((charecter, index) => (
                        index === 0 ? (
                            <>
                                <span key={index}>&nbsp;</span>
                                <span
                                    key={index}
                                    className="animate-letter "
                                    style={{ animationDelay: `${i * index * index * 2}s` }}
                                >
                                    {charecter}
                                </span>
                            </>
                        ) : (
                            <span
                                key={index}
                                className="animate-letter"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {charecter}
                            </span>
                        ))
                    )}
                </p>
            ))}
        </p>
    );
};

export default WaveText;