import InputGroup from "../../components/InputGroup";
import React from "react";

const SubCreate = () => {
  return (
    <div className="flex flex-col justify-center pt-16">
      <div className="2-10/12 mx-auto md:w-96">
        <h1 className="mb-2 text-lg font-medium">create community</h1>
        <hr />
        <form>
          <div className="my-6">
            <p className="font-medium">Name</p>
            <p className="mb-2 text-xs text-gray-400">Community names including capitalization cannot be changed.</p>
            <InputGroup placeholder="Name" value setValue error></InputGroup>
          </div>
          <div className="my-6">
            <p className="font-medium">Title</p>
            <p className="mb-2 text-xs text-gray-400">Title input section, you can change it anytime you want</p>
            <InputGroup placeholder="Title" value setValue error></InputGroup>
          </div>
          <div className="my-6">
            <p className="font-medium">Description</p>
            <p className="mb-2 text-xs text-gray-400">Description section</p>
            <InputGroup placeholder="Description" value setValue error></InputGroup>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-1 text-sm font-semibold rounded text-white bg-gray-400 border">
              Create Community
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCreate;
