"use client";
import Productlist from "@/components/ListJob";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  useToast,
} from "@chakra-ui/react";
import { createJob } from "./action";
import { Job } from "@/models/job";

export default function Add() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");
  

  const router = useState();
  const toast = useToast();
  const [job, setJob] = useState<Job>({
    title: "",
    description: "",
    datetime: new Date(),
  });
   const handleClick = async () => {
     try {
       await createJob({ ...job, datetime: new Date() });
       toast({
         title: "Create job successfully",
         status: "success",
         isClosable: true,
       });
     } catch (error) {
       console.log("error ", error);
       toast({
         title: "Create job failed",
         status: "error",
         isClosable: true,
       });
     }
   };

  return (
    <>
      <div>
        <h1 className="font-bold py-10 text-2xl">Add New Job</h1>
      </div>

      <form onSubmit={handleClick} className="flex flex-col gap-3">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="input input-bordered input-accent w-full max-w-xs"
          type="text"
          placeholder="Title of Job"
        />

        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="input input-bordered input-accent w-full max-w-xs"
          type="text"
          placeholder="Description of Job"
        />

        <input
          onChange={(e) => setDatetime(e.target.value)}
          value={datetime}
          className="input input-bordered input-accent w-full max-w-xs"
          type="date"
        />

        <button type="submit" className="btn btn-primary w-full max-w-xs">
          Add Product
        </button>
      </form>
    </>
  );
}
