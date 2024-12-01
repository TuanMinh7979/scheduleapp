"use client";


import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

import EventForm from "./forms/EventForm";






export type MyFormContainerProps = {
  table: "schedule"
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
  openTrigger?: boolean
  setOpenTrigger: any
};

// TODO: OTHER FORMS

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  schedule: (setOpen, type, data, relatedData) => (
    <EventForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),


};

const MyFormModal = ({
  setOpenTrigger,
  openTrigger,
  table,
  type,
  data,
  id,
  relatedData,
}: MyFormContainerProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
        ? "bg-lamaSky"
        : "bg-lamaPurple";



  const Form = () => {
    const [state, formAction] = useFormState(() => { return { success: false, error: false } }, {
      success: false,
      error: false,
    });

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`${table} has been deleted!`);
        setOpenTrigger(false);
        router.refresh();
      }
    }, [state, router]);

    return <>{forms[table](setOpenTrigger, "create", data, relatedData)}</>

  };


  return (
    <>

      {openTrigger && <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        <div className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-8 ">
          <div className="content h-full  overflow-y-auto">
            <Form />

          </div>
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setOpenTrigger(false)}
          >
            <Image src="/close.png" alt="" width={14} height={14} />
          </div>
        </div>
      </>

      }






    </>
  );
};

export default MyFormModal;
