import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { data } from "../components/todo/data";
import Image from "next/image";
import Kanban from "../components/todo/Kanban";
import Load from "../components/todo/load";
import { GiFeather } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";
import Add from "../components/todo/Add";
import { useSession } from "next-auth/react";
import Delay from "../components/gate/Delay";
import Head from "next/head";

const Profile = ({ dbData }) => {
  const { data: session } = useSession();

  const [pencil, setPencil] = useState(false);

  let localData = dbData;
  
  const [connected, setConnected] = useState(
    localData.message === undefined || localData.message === null
  );

  if (localData.message == null || localData.data == []) {
    data.email = session.user.email;
    localData = data;
  }

  const [localdata, setlocaldata] = useState(localData);
  
  const handlePencil = () => {
    setPencil(!pencil);
  };

  return (
    <>
      {session ? (
        <>
          <Head>
            <title>Profile</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link rel="shortcut icon" href="/images/logo.svg"></link>
          </Head>
          <ToastContainer />
          <div className="z-0 absolute top-0 left-0 w-screen h-screen bg-gradient-to-r from-[#2C3E50] to-[#000000]"></div>
          <div className="absolute w-full h-[9%] bg-gradient-to-r from-[#4834D4] to-[#0C0C0C] top-0 left-0 flex justify-center items-center">
            <div className="absolute flex left-3 justify-center items-center">
              <Image
                src="/images/yellowFeather.svg"
                alt=""
                width={44}
                height={44}
              ></Image>
              <span className="text-white font-mochiy font-semibold text-2xl">
                Brusooo
              </span>
            </div>

            <div className="absolute flex right-5 text-center text-white font-mochiy ">
              <div className="border-[2px]  border-slate-100 mr-[5px]  py-[2px] px-4 rounded-[30px]">
                <span>{session.user.name} </span>
              </div>
              <button
                className="block mr-[5px] py-[4px] px-3 rounded-2xl border-[2px] border-slate-100"
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  signOut();
                }}
              >
                <FaSignOutAlt className="text" />
              </button>
            </div>
          </div>

          {connected ? (
            <>
              <div
                className="absolute right-4 bottom-4 z-20 bg-[#4834D4] p-2 text-center cursor-pointer rounded-[50%]  text-white"
                onClick={handlePencil}
              >
                <GiFeather className="text-2xl" />
              </div>

              {pencil ? (
                <Add databaseData={localdata} setlocaldata={setlocaldata} />
              ) :(
                <Kanban databaseData={localdata} setlocaldata={setlocaldata} />
              ) 
              }
            </>
          ) : (
            <Delay />
          )}
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let dbData = { message: "error" };

  if (session) {
    const result = await fetch(
      `${process.env.NEXTAUTH_URL}/api/auth/googlelogin`,
      {
        method: "POST",
        body: JSON.stringify({
          name: session.user.name,
          email: session.user.email,
          password: session.user.image,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const users = await fetch(
      `${process.env.ORIGIN}/api/auth/usersData?email=${session.user.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    if (users.status !== 500) {
      
      dbData = await users.json().then((data) => {
        if (data.users.length > 0) {
          return data.users[0];
        } else return { messsage: null };
      });
    }
  }

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { dbData, session },
  };
}

export default Profile;
