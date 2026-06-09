"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { ReactNode, useEffect, useRef, useState } from "react";

function AddUserModal({ hideAddUserModal }: { hideAddUserModal: () => void }) {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    role: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClicks = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        hideAddUserModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClicks);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClicks);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      className="fixed top-8 left-[50%] translate-x-[-50%] bg-white z-10 rounded-lg border border-slate-300 w-100 max-w-[calc(100% - 24px)]"
      initial={{ opacity: 0, top: 0 }}
      animate={{ opacity: 1, top: 32 }}
      exit={{ opacity: 0, top: 0 }}
      transition={{ duration: 0.16 }}
      ref={modalRef}
    >
      <div className="flex items-center justify-between h-10 px-3">
        <h3 className="text-slate-900">إضافة مستخدم</h3>
        <button
          className="size-6 rounded-full grid place-items-center bg-slate-200 text-slate-900 duration-150 hover:scale-96"
          onClick={hideAddUserModal}
        >
          <X size={19} />
        </button>
      </div>
      <form className="px-3 text-sm">
        <label className="text-slate-900 block mb-1" htmlFor="name">
          الإسم
        </label>
        <InputField
          placeholder="إسم المستخدم"
          id="name"
          name="name"
          className="mb-2"
          value={userData.name}
          onChange={handleChange}
        />
        <label className="text-slate-900 block mb-1" htmlFor="password">
          كلمة السر
        </label>
        <InputField
          placeholder="كلمة السر"
          id="password"
          name="password"
          className="mb-2"
          type="password"
          value={userData.password}
          onChange={handleChange}
        />
        <div className="flex h-12 items-center mb-2">
          <label className="text-slate-900 block mb-1">الدور</label>
          <div className="flex flex-1 justify-evenly">
            <div className="flex gap-1.5">
              <input
                type="radio"
                id="user"
                name="role"
                checked={userData.role === "user"}
                value="user"
                onChange={handleChange}
              />
              <label htmlFor="user">زول ساي</label>
            </div>
            <div className="flex gap-1.5">
              <input
                type="radio"
                id="moderator"
                name="role"
                checked={userData.role === "moderator"}
                value="moderator"
                onChange={handleChange}
              />
              <label htmlFor="moderator">مشرف</label>
            </div>
          </div>
        </div>
        <Button style="dark" className="mb-2">
          إضافة
        </Button>
      </form>
    </motion.div>
  );
}

export default AddUserModal;
