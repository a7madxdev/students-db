"use client";

import { useAlert } from "@/context/AlertContext";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

function UserOptions({ close }: { close: () => void }) {
  const optionsRef = useRef<HTMLDivElement>(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    const handleOutSideClicks = (e: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleOutSideClicks);

    return () => {
      document.removeEventListener("mousedown", handleOutSideClicks);
    };
  }, []);

  const handleDelete = () => {
    showAlert({
      title: "حذف المستخدم",
      message: "هل أنت متأكد من حذف هذا المستخدم ؟",
      btnText: "حذف",
      btnStyle: "danger",
      onConfirm: function (): void {
        throw new Error("Function not implemented.");
      },
      overlay: {
        theme: "dark",
      },
    });
  };

  return (
    <motion.div
      className="absolute top-1 left-6 bg-white border border-slate-300 z-1 text-sm min-w-28 rounded-md text-slate-900 overflow-hidden"
      ref={optionsRef}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.16 }}
    >
      <ul>
        <li className="p-2 hover:bg-slate-200">تعديل</li>
        <li className="p-2 hover:bg-slate-200">تفعيل</li>
        <li className="p-2 hover:bg-slate-200">حذف الجلسات</li>
        <li
          className="p-2 text-red-600 hover:bg-red-200"
          onClick={handleDelete}
        >
          حذف
        </li>
      </ul>
    </motion.div>
  );
}

export default UserOptions;
