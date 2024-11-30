'use client';
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from 'react';

const SideClassList = ({
  data
}: {
  data: { name: string, id: number }[];
}) => {

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredData = data.filter((classItem) =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const searchParams = useSearchParams();
  // Hàm này để chuyển hướng đến trang khác kèm `searchParams`
  const handleClassClick = (classId: number) => {
    // Chuyển đến trang `/class` với tham số search `classId`
    router.push(`/student?classId=${classId}&currentDate=${searchParams.get("currentDate")}`, undefined);
  };

  return (




    <div className="flex flex-col items-start gap-2">
      {/* Ô tìm kiếm */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Search for a class..."
      />

      {/* Hiển thị danh sách lớp đã lọc */}
      {filteredData.length > 0 ? (
        filteredData.map((classItem, index) => (
          <div
            onClick={() => handleClassClick(classItem.id)}
            key={index}
            className={`w-full p-2 rounded shadow-md ${index % 2 === 0 ? 'bg-blue-500' : 'bg-green-500'}`}
          >
            <h2 className="text-sm font-bold">{classItem.name}</h2>
          </div>
        ))
      ) : (
        <div className="text-gray-500">No classes found</div>
      )}
    </div>
  );
};

export default SideClassList;
