import Image from "next/image";
import Link from "next/link";

export default function Custom404(){
  return (
    <>
      <div className="flex justify-center items-center flex-col absolute left-0 top-0 w-[100%] min-h-screen bg-[#777FF7]">
        <Image 
          src='/images/404.svg'
          width ={450}
          height={450}
        ></Image>
        <p className="relative top-7 z-20 font-extrabold text-xl vs:text-[15px]">
          Looks Like you have Lost your Way ,
          <Link href="/profile">
            <a className="font-mochiy  text-cyan-500"> Back to Home</a>
          </Link>
        </p>
      </div>
    </>
  );
}
