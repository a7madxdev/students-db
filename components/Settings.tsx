"use client";

import { Monitor, TabletSmartphone, Trash2 } from "lucide-react";
import Button from "./Button";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useAlert } from "@/context/AlertContext";

function Settings({ close }: { close: () => void }) {
  const settingsRef = useRef<HTMLDivElement>(null);
  const { showAlert } = useAlert();

  const deleteDevice = () => {
    showAlert({
      title: "حذف جهاز",
      message:
        "لن تتمكن من إستحدام هذا الجهاز في الجلسات القادمة إلا بعد الموافقة عليه مجدداً",
      btnText: "تأكيد الحذف",
      btnStyle: "danger",
      onConfirm: function (): void {
        alert(33);
      },
      overlay: {
        theme: "dark",
      },
    });
  };
  useEffect(() => {
    const handleOutsideClicks = (e: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleOutsideClicks);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClicks);
    };
  }, []);

  return (
    <motion.div
      className="fixed bg-white border border-slate-300 shadow-[0_2px_20px_-2px_#00000033] top-15 left-3 px-2 py-3 rounded-md min-w-50"
      ref={settingsRef}
      initial={{ left: -24, opacity: 0 }}
      animate={{ left: 12, opacity: 1 }}
      exit={{ left: -24, opacity: 0 }}
      transition={{ duration: 0.16 }}
    >
      <p className="text-sm">أحمد بدرالدين</p>
      <p className="text-xs mb-2 text-slate-600">زول ساي</p>
      <hr className="border-slate-300 mb-2" />
      <div className="mb-1">
        <div className="flex items-center gap-2 p-1">
          <TabletSmartphone size={18} />
          <p className="text-sm flex-1 break-all">Redmi Note 11</p>
          <span className="size-2 bg-green-500 rounded-full" />
        </div>
        <div className="flex items-center gap-2 p-1">
          <Monitor size={18} />
          <p className="text-sm flex-1 break-all">ThinkPad L440</p>
          <span className="size-2 bg-slate-500 rounded-full" />
          <button
            className="duration-150 hover:scale-96"
            onClick={deleteDevice}
          >
            <Trash2 size={18} className="text-red-500 " />
          </button>
        </div>
      </div>
      <div className="">
        <label className="text-xs text-slate-500 font-semibold">
          طلب تسجيل
        </label>
        <div className="flex items-center gap-2 p-1">
          <Monitor size={18} />
          <p className="text-sm flex-1 break-all">ThinkPad L440</p>
        </div>
        <Button size="small" style="danger2" className="h-7 px-3">
          موافقة
        </Button>
      </div>
    </motion.div>
  );
}

export default Settings;
