import Link from "next/link";
import React from "react";

const register = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-2 text-lg font-medium">register</h1>
          <form>
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

export default register;
