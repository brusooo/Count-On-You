import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Router } from "next/router";

const GoogleSignIn = ({ create }) => {
  async function handleGoogle(){
    const res = await signIn("google",{callbackUrl: `${window.location.origin}/profile`})
  }

  return (
    <>
      <div className="relative w-[100%] my-6 h-10 vs:w-[80%]">
        <div className={`absolute flex justify-center items-center left-0 w-[15%] h-[100%] border-2 ${create ? 'border-[#2fa8cc]' : 'border-[#09F315]'}`}>
          <Image src="/images/left/google.svg" width={30} height={30} alt="Google"></Image>
        </div>

        <div
          onClick={handleGoogle}
          className={`flex justify-center items-center absolute cursor-pointer right-0 w-[85%] h-full font-semibold ${create ? 'bg-[#2fa8cc]' : 'bg-[#09F315]'} text-white`}
        >
          <span>Sign in with Google</span>
        </div>
      </div>
    </>
  );
};

export default GoogleSignIn;
