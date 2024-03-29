import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, use, useState } from "react";
import InputGroup from "../components/InputGroup";
import { useAuthDispatch } from "../context/auth";

const Login = () => {
  let router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const dispatch = useAuthDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/auth/login",
        {
          password,
          username,
        },
        {
          withCredentials: true,
        }
      );

      // save user data to context
      dispatch("LOGIN", res.data?.user);

      // navitage to home page
      router.push("/");
    } catch (error: any) {
      console.log("error", error);
      setErrors(error.response.data || {});
    }
  };
  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-2 text-lg font-medium">Login</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup placeholder="Username" value={username} setValue={setUsername} error={errors.username} />
            <InputGroup placeholder="Password" value={password} setValue={setPassword} error={errors.password} />
            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
              Login
            </button>
          </form>
          <small>
            haven't registered yet?
            <Link href="/register" legacyBehavior>
              <a className="ml-1 text-blue-500 uppercase">register</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
