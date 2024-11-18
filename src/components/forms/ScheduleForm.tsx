"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
  classSchema,
  ClassSchema,
  subjectSchema,
  SubjectSchema,
} from "@/lib/formValidationSchemas";
import {
  createClass,
  createSubject,
  updateClass,
  updateSubject,
} from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ScheduleForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
  });

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState(
    type === "create" ? createClass : updateClass,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);
  const subjects = [
    { id: 1, teacherName: 'Mr. Smith', teacherId: 101, name: 'Mathematics' },
    { id: 2, teacherName: 'Ms. Johnson', teacherId: 102, name: 'Science' },
    { id: 3, teacherName: 'Dr. Brown', teacherId: 103, name: 'History' },
    { id: 4, teacherName: 'Mrs. Davis', teacherId: 104, name: 'Art' }
  ];


  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new class" : "Update the class"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg">Item 1</div>
          <div className="bg-green-500 text-white p-4 rounded-lg">Item 2</div>
          <div className="bg-red-500 text-white p-4 rounded-lg">Item 3</div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg">Item 4</div>
          <div className="bg-purple-500 text-white p-4 rounded-lg">Item 5</div>
          <div className="bg-indigo-500 text-white p-4 rounded-lg">Item 6</div>
          <div className="bg-teal-500 text-white p-4 rounded-lg">Item 7</div>
          <div className="bg-orange-500 text-white p-4 rounded-lg">Item 8</div>
        </div>


      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ScheduleForm;
