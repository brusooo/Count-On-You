import React from "react";
import Image from "next/image";

const Loading = ({ visibility }) =>{
    return(
        <>
            <div className={`absolute top-0 left-0 flex justify-center items-center z-30 w-full h-full bg-white bg-opacity-60 ${visibility ? 'flex' : 'hidden'}`}>
                <span className="relative animate-blink">
                    <Image src="/images/logo.svg" width="100" height="100" />
                </span>
            </div>
        </>
    )
}

export default Loading;

