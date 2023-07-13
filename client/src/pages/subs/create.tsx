import axios from "axios";
import InputGroup from "../../components/InputGroup";
import React from "react";
import { useRouter } from "next/router";

const SubCreate = () => {
  const [name, setName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [errors, setErrors] = React.useState<any>({});
  let router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/subs", { name, title, description });

      router.push(`/r/${res.data.name}`);
    } catch (error: any) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  return (
    <div className="flex flex-col justify-center pt-16">
      <div className="2-10/12 mx-auto md:w-96">
        <h1 className="mb-2 text-lg font-medium">create community</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="my-6">
            <p className="font-medium">Name</p>
            <p className="mb-2 text-xs text-gray-400">Community names including capitalization cannot be changed.</p>
            <InputGroup placeholder="Name" value={name} setValue={setName} error={errors.name}></InputGroup>
          </div>
          <div className="my-6">
            <p className="font-medium">Title</p>
            <p className="mb-2 text-xs text-gray-400">Title input section, you can change it anytime you want</p>
            <InputGroup placeholder="Title" value={title} setValue={setTitle} error={errors.title}></InputGroup>
          </div>
          <div className="my-6">
            <p className="font-medium">Description</p>
            <p className="mb-2 text-xs text-gray-400">Description section</p>
            <InputGroup
              placeholder="Description"
              value={description}
              setValue={setDescription}
              error={errors.description}
            ></InputGroup>
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
