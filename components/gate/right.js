import React from "react";
import Image from "next/image";

const Right = (props) => {
  return (
    <>
      <div className="w-[69%] lg:w-[62%] md:w-[54%] sm:w-[40%] vs:hidden min-h-screen bg-gradient-to-r from-[#000428] to-[#004e92] right-0 absolute flex justify-center items-center">
        <div>
          <div className="absolute right-0 lg:-right-6 -bottom-11 lg:scale-[.85] md:hidden">
            <Image
              src={props.imgone}
              alt=""
              width={450}
              height={450}
            />
          </div>
          <div className="absolute left-12 sm:left-3 top-12  text-white ">
            <p className="font-mochiy sm:text-[15px] leading-snug md:text-2xl text-3xl font-semibold tracking-wider">
              Join our Community to <br /> ease your Work
            </p>
            <br />
            <p className="sm:text-[12px]">
              One of the secrets of getting more <br /> done is to make a TO-DO
              List every day,
              <br /> keep it visible, and use it as a guide
              <br /> to action as you go through the day.
            </p>
          </div>
          <div className="lg:hidden  absolute left-10 bottom-1 md:bottom-3">
            <Image src={props.imgtwo} alt="" width={90} height={90} />{" "}
          </div>
        </div>
        <div className="absolute sm:scale-y-125 right-0 bottom-0 hidden md:flex">
          <Image src={props.imgthree} alt="" width={350} height={350} />
        </div>
      </div>
    </>
  );
};

export default Right;
