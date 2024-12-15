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
import { useRouter, useSearchParams } from "next/navigation";
import { setEvents, useAppDispatch, useAppSelector } from "@/store/events-slice";
import { HomeDataEvent, AvaiSatByClassIdType } from "@/lib/utils";
import { RootState } from "@/store/store";

const EventForm = ({
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



  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const relatedItems = [
    { id: 1, num: 10, date: "01/12/2024", week: 48 },
    { id: 2, num: 15, date: "02/12/2024", week: 49 },
    { id: 3, num: 20, date: "03/12/2024", week: 50 },
    { id: 4, num: 30, date: "04/12/2024", week: 51 },
    { id: 5, num: 25, date: "05/12/2024", week: 52 },
    { id: 1, num: 10, date: "01/12/2024", week: 48 },
    { id: 2, num: 15, date: "02/12/2024", week: 49 },
    { id: 3, num: 20, date: "03/12/2024", week: 50 },
    { id: 4, num: 30, date: "04/12/2024", week: 51 },
    { id: 5, num: 25, date: "05/12/2024", week: 52 },
  ];
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const eventsRedux = useAppSelector((state: RootState) => state.events); // Truy cập data từ Redux store
  const handleClick = (el: AvaiSatByClassIdType) => {
    console.log(eventsRedux.data)
    const newEvent: HomeDataEvent = {
      satId: el.satId,            // ID của sự kiện
      // Tên của sự kiện
      classId: Number(searchParams.get("classId")),        // ID của lớp học
      mode: "online", // Chế độ học (chỉ nhận "online" hoặc "offline")
      subjectName: el.subjectName,    // Tên môn học
      teacherName: el.teacherName,
      day: data.choosedCell.day,
      dayPartId: data.choosedCell.dayPartId
    }
    console.log(newEvent)
    console.log(data.avaiSatByClassId)
    dispatch(setEvents([
      ...eventsRedux.data, newEvent
    ]
    ))

  }

  return (
    <>
      <div className="flex-9 flex flex-row h-full w-[1000px] h-[600px]">
        {/* Phần bên trái (70%) */}
        <div className="flex-7 w-7/10 bg-gray-100 p-4 w-[70%] ">
          <div className="grid grid-cols-3 gap-4">
            {data.avaiSatByClassId.map((el: AvaiSatByClassIdType) =>
              <div className="w-full max-h-40 bg-white border border-gray-300 shadow-md rounded-lg p-4 flex flex-col justify-between overflow-hidden ">
                {/* Phần thông tin chính */}
                <div className="space-y-2 overflow-hidden text-ellipsis">
                  <h3 className="text-sm font-semibold text-gray-800 truncate">{el.subjectName}</h3>
                  <p className="text-xs text-gray-600 truncate">{el.teacherName}</p>
                  <p className="text-xs text-gray-600">
                    {el.eventCnt}/{el.subjectTotal}
                  </p>
                </div>

                {/* Nút Apply */}
                <button onClick={() => handleClick(el)} className="mt-2 bg-blue-500 text-white font-medium py-1 px-3 rounded hover:bg-blue-600">
                  Apply
                </button>
              </div>

            )}



            {/* Có thể thêm nhiều dòng tương tự */}
          </div>
        </div>

        {/* Phần bên phải (30%) */}

        <div className="flex-3 bg-gray-200 p-4 w-[30%] ">
          <h2 className="font-bold text-lg ">Danh sách liên quan</h2>
          <div className="mt-4 max-h-[500px] overflow-y-scroll">
            {relatedItems.length > 0 ? (
              relatedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-300 p-4 mb-2 rounded"
                >
                  <p>Num: {item.num}</p>
                  <p>Date: {item.date}</p>
                  <p>Week: {item.week}</p>
                </div>
              ))
            ) : (
              <p>Vui lòng chọn một item để hiển thị thông tin.</p>
            )}
          </div>

        </div>



      </div>
      {/* Phần dưới (10%) */}
      <div className="flex-1 flex justify-center gap-4 p-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Button 1</button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded">Button 2</button>
      </div>

    </>
  );
};

export default EventForm;
