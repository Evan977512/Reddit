import Link from "next/link";
import React, { FormEvent, useState } from "react";
import InputGroup from "../components/inputGroup";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassowrd] = useState("");
  const [errors, setErrors] = useState<any>({});

  let router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", {
        email,
        username,
        password,
      });
      console.log("res", res);
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      setErrors(error.response.data || {});
    }
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-2 text-lg font-medium">register</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup placeholder="Email" value={email} setValue={setEmail} error={errors.email} />
            <InputGroup placeholder="UserName" value={username} setValue={setUsername} error={errors.username} />
            <InputGroup placeholder="Password" value={password} setValue={setPassowrd} error={errors.password} />

            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercate bg-gray-400 border border-gray-400 rounded">
              register
            </button>
          </form>
          <small>
            already have an account?
            <Link href="/login" legacyBehavior>
              <a className="ml-1 text-blue-500">Login</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
