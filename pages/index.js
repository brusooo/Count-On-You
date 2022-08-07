import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Right from "../components/gate/right";
import Left from "../components/gate/left";
import Head from "next/head";

function Home({ session }) {
  if (!session) {
    setTimeout(() => {
      toast("✨ Log in to Continue", {
        toastId: "login",
        theme: "dark",
      });
    }, 500);
  }

  const { error } = useRouter().query;
  if (error) {
    toast.error("Invalid Credentials", {
      toastId: error,
      theme: "dark",
    });
  }

  if (session) return <></>;
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/images/logo.svg"></link>
      </Head>
      <ToastContainer />
      <div className="max-w-full min-h-screen">
        <Left
          sentence="Don't Have an account? "
          create={true}
          control=" Sign up"
          login={true}
          imgone="/images/left/feather.svg"
        />

        <Right
          imgone="/images/right/remainder.svg"
          imgtwo="/images/right/arrow.svg"
          imgthree="/images/right/man.svg"
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default Home;
