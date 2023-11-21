import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import Router from "next/router";

const LoginForm = ({ login, create, setVisibility }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function login() {
    return await signIn("credentials", {
      name: values.name,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}/profile`,
      redirect: false,
    });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setVisibility(true);

    const result = await login();

    if (result.url) {
      setTimeout(() => {
        setVisibility(false);
      }, 6000);
      Router.push(data.url);
    } else {
      toast("Invalid credentials", {
        toastId: "error",
        theme: "dark",
      });
      setVisibility(false);
      setValues({ name: "", email: "", password: "" });
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setVisibility(true);
    let post = {
      name: values.name,
      email: values.email,
      password: bcrypt.hashSync(values.password, bcrypt.genSaltSync()),
    };

    let response = await fetch(
      `${window.location.origin}/api/auth/emaillogin`,
      {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let user = await response.json();
    setTimeout(() => {
      setVisibility(false);
      if (user.result == "Successful") {
        values.name = "";
        toast("Created Successfully", {
          toastId: "success",
          theme: "dark",
        });
      } else {
        toast.error("Username already taken", {
          toastId: "failure",
          theme: "dark",
        });
      }

      setValues({ name: "", email: "", password: "" });
    }, 2000);
  };

  return (
    <>
      <div className="my-10">
        <form
          className="flex flex-col"
          onSubmit={login ? handleLogin : handleCreateAccount}
        >
          <label className="font-semibold">Username</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            pattern={"^[A-Za-z][A-Za-z0-9_]{6,}$"}
            title={"Invalid Username"}
            placeholder="eg Brusooo22"
            autoComplete={"off"}
            className="border-2 rounded-md w-[140%] h-10 pl-2 border-zinc-400"
          />
          <br />

          <label className="font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="border-2 rounded-md w-[140%] h-10 pl-2 border-zinc-400"
          />
          <br />

          <label className="font-semibold">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            pattern="[0-9a-zA-Z_@]{6,}"
            title="atleast 6 characters long eg:@user_2022"
            className="border-2 rounded-md w-[140%] h-10 pl-2 border-zinc-400"
          />
          <br />

          {login ? (
            <button
              className="border border-slate-300 w-[50%] p-2 rounded-lg bg-[#2fa8cc] text-white  font-semibold"
              disabled={
                isNaN(values.name) &&
                isNaN(values.email) &&
                isNaN(values.password)
                  ? false
                  : true
              }
            >
              Login
            </button>
          ) : (
            <button
              className={`border border-slate-300 w-[80%] p-2 rounded-lg ${
                create ? "bg-[#2fa8cc]" : "bg-[#09F315]"
              } text-white  font-semibold`}
              disabled={
                isNaN(values.name) &&
                isNaN(values.email) &&
                isNaN(values.password)
                  ? false
                  : true
              }
            >
              Create Account
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
