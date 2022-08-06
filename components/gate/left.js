import React from "react";
import Image from "next/image";
import LoginForm from "./loginform";
import GoogleSignIn from "./gosignin";
import Router from "next/router";
import Loading from "./loading";
import { useState } from "react";

const Left = (props) => {
  const [visibility,setVisibility] = useState(false)
  return (
    <>
      <Loading visibility={visibility}/>
      <div className="w-[31%] lg:w-[38%] lg:top-[30px] md:w-[46%] vs:w-[100%] min-h-screen bg-white left-0 absolute flex justify-start items-start">
        <div className="absolute hidden vs:flex  -right-7 bottom-2">
          <Image 
            src="/images/left/ballons.svg"
            width= {130}
            height={130}
          />
        </div>
        <div className="w-[80%]  min-h-full flex justify-start items-start flex-col  my-10 mx-8">
          <div className="relative flex justify-center items-center">
            <Image
              src={props.imgone}
              alt=""
              width={50}
              height={50}
            ></Image>
            <h1 className="font-comforter mt-4 ml-2 text-4xl tracking-wider font-extrabold">
              Brusooo
            </h1>
          </div>

          <GoogleSignIn create={props.create}  />

          <div className="flex justify-center items-center vs:w-[80%] w-full h-[0.15rem] bg-slate-500">
            <span className="bg-white p-2 rounded-[50%] font-semibold">or</span>
          </div>

          <LoginForm  login={props.login} create={props.create} setVisibility={setVisibility}/>

          <p className="md:text-[15px]">
            {props.sentence}
            <span
              onClick={() => {
                props.create ? Router.push("/create") : Router.push("/")
              }}
              className="font-semibold cursor-pointer text-[#004e92]"
            >
              {props.control}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Left;
