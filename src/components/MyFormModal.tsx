"use client";


import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";
import ScheduleForm from "./forms/ScheduleForm";
import { MyFormContainerProps } from "./MyFormContainer";
import { error } from "console";






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
    <ScheduleForm
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
console.log(data);

  return (
    <>

      {openTrigger && <div className="bg-blue-200 border-green-700 w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
          <Form />
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setOpenTrigger(false)}
          >
            <Image src="/close.png" alt="" width={14} height={14} />
          </div>
        </div>
      </div>}


    </>
  );
};

export default MyFormModal;
