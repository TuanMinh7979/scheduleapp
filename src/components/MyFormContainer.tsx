import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { auth } from "@clerk/nextjs/server";
import MyFormModal from "./MyFormModal";

export type MyFormContainerProps = {
  table: "schedule"
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
  openTrigger?: boolean
  setOpenTrigger:any
};

const MyFormContainer = async ({ table, type, data, id }: MyFormContainerProps) => {





  return (

<></>
    // <MyFormModal
    //   table={table}
    //   type={type}
    //   data={data}
    //   id={id}
    //   relatedData={{}}
    // />

  );
};

export default MyFormContainer;
