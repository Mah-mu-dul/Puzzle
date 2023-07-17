import React, { useRef, useState } from 'react';

const YoutubeWatch = () => {
    const urlRef = useRef();
    const timeRef = useRef()

    const [urlList, setUrlList] = useState([])
    const handleSubmit = e => {
        e.preventDefault()
        const url = urlRef.current.value
        const times = timeRef.current.value

        const tempList = []
        for (let i = 0; i < times; i++) {
            tempList.push("https://www.youtube.com/embed/" + url.slice(32) + "?autoplay=1&mute=1")
        }
        setUrlList(tempList)

        // console.log("https://www.youtube.com/embed/"+url.slice(32) + "?autoplay=1&mute=1")
    }
    return (
        <div className=''>
            <form onSubmit={handleSubmit} className='w-1/2 mx-auto' >
                <input placeholder='url' ref={urlRef} className='text-black px-5 w-1/2  bg-white border-1 rounded-md' type="text" />
                <br /><br />
                <input placeholder='times' ref={timeRef} className='text-black  px-5  bg-white border-1 rounded-md' type="number" />
                <br /><br />
                <button className='px-5 py-2  bg-green-100 rounded-md'>Watch</button>
            </form>
            <div className="p-5 m-5 flex flex-wrap justify-between gap-3 bg-red-50 min-h-[300px] rounded ">
                {
                    urlList.map((url, i) => <>
                        <iframe width="400" height="auto" key={i} src={url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </>)
                }
            </div>

        </div>
    );
};

export default YoutubeWatch;

{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/n6fvXEB79Ks" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */ }