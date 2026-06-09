"use client";

import Button from "@/components/Button";
import { MoreVertical } from "lucide-react";
import PieChartWithCustomizedLabel from "./BoysGirlsChart";
import { AnimatePresence } from "motion/react";
import AddUserModal from "./AddUserModal";
import Overlay from "@/components/Overlay";
import { useState } from "react";
import UserOptions from "./UserOptions";

const users: number[] = [0, 1];
function AdminDashboard() {
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  return (
    <section className="container px-3 mx-auto pb-10 grid grid-cols-1 items-start gap-4 lg:grid-cols-4">
      <UsersCard showAddUserModal={() => setIsAddUserModalVisible(true)} />
      <div className="border p-3 rounded-md border-slate-300 shadow-[0_3px_20px_-3px_#00000022] lg:col-span-3 grid grid-cols-1 sm:grid-cols-3">
        <div className="flex flex-col justify-center items-center">
          <span className="text-4xl block text-slate-900 mb-1">183</span>
          <label className="text-sm text-slate-500 block mb-5">
            إجمالي الطلاب
          </label>
          <Button style="dark" className="font-bold">
            عرض قاعدة البيانات
          </Button>
        </div>
        <div className="col-span-2 flex flex-col items-center">
          <PieChartWithCustomizedLabel />
          <p className="text-slate-600 text-sm mb-2">79 طالب و 104 طالبة</p>
          <p className="text-slate-600 text-sm mb-2">
            29 ثانوي 34 متوسط 120 إبتدائي
          </p>
          <div className="flex gap-3">
            <Button>طباعة تقرير</Button>
            <Button>تصدير ملف Excel</Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isAddUserModalVisible && (
          <>
            <AddUserModal
              hideAddUserModal={() => setIsAddUserModalVisible(false)}
            />
            <Overlay />
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

function UsersCard({ showAddUserModal }: { showAddUserModal: () => void }) {
  return (
    <div className="border px-3 py-3 rounded-md border-slate-300 shadow-[0_3px_20px_-3px_#00000022]">
      {users && users.length > 0 ? (
        <ul className="mb-2">
          {users.map((item) => (
            <User key={item} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500 mb-2">لا يوجد مستخدمين حالياً</p>
      )}
      <Button style="dark" onClick={showAddUserModal}>
        إضافة
      </Button>
    </div>
  );
}

function User() {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  return (
    <li className="flex items-center py-2 not-last:border-b border-slate-300 relative">
      <div className="flex-1">
        <p className="text-sm text-slate-900">أحمد بدرالدين</p>
        <p className="text-xs text-slate-600">مسؤول</p>
      </div>
      <button
        className="duration-150 hover:scale-94"
        onClick={() => setIsOptionsVisible(true)}
      >
        <MoreVertical size={18} />
      </button>
      <AnimatePresence>
        {isOptionsVisible && (
          <UserOptions close={() => setIsOptionsVisible(false)} />
        )}
      </AnimatePresence>
    </li>
  );
}

export default AdminDashboard;
