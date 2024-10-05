import React from 'react';

const Documentation = () => {
    return (
        <div className='lg:w-1/2 md:w-[80%] text-black sm:w-[90%] mx-auto mb-5'>
            <div className="collapse">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-transparent  w-fit   ">
                    Read Documentation 
                </div>
                <div className="collapse-content lg:w-1/2 md:w-[80%] text-black sm:w-[90%]  bg-white peer-checked:bg-gray-400 ">
                    <p>
                        Documentetion will be upload as soon as possible 
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Documentation;