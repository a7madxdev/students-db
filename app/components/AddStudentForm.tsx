"use client";

import InputField from "@/components/InputField";
import { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Button from "@/components/Buttons";

type BirthdaDate = Date | null;

function AddStudentForm() {
  const [birthday, setBirthday] = useState<
    BirthdaDate | [BirthdaDate, BirthdaDate]
  >(new Date());
  return (
    <section className="container mx-auto px-3">
      <h3 className="text-lg font-semibold text-slate-800 w-fit mb-3 relative before:h-1 before:w-[70%] before:bg-primary before:absolute before:-bottom-1.5 before:rounded-full">
        إضافة طالب
      </h3>
      <form>
        <InputField placeholder="الإسم رباعي" className="mb-2" />
        <div className="flex text-sm h-12 items-center">
          <label>الجنس:</label>
          <div className="flex flex-1 justify-evenly">
            <div className="flex gap-1.5">
              <input type="radio" id="male-gender" name="gender" />
              <label htmlFor="male-gender">ذكر</label>
            </div>
            <div className="flex gap-1.5">
              <input type="radio" id="female-gender" name="gender" />
              <label htmlFor="female-gender">أنثى</label>
            </div>
          </div>
        </div>
        <div className="h-12 flex items-center justify-between text-sm">
          <label>تاريخ الميلاد</label>
          <DatePicker value={birthday} onChange={setBirthday} />
        </div>
        <InputField placeholder="العنوان" className="mb-2" />
        <InputField placeholder="ولي الأمر" className="mb-2" />
        <InputField placeholder="رقم الهاتف" type="number" className="mb-2" />
        <InputField
          placeholder="الإهتمامات (إفصل بين كل إهتمام والآخر بفاصلة)"
          className="mb-2"
        />
        <textarea
          placeholder="ملاحظات"
          className="text-sm rounded-md border border-slate-400 hover:border-dark focus:border-dark p-2 w-full resize-none"
          rows={3}
        ></textarea>
        <Button type="submit" style="dark" size="medium">
          إضافة
        </Button>
      </form>
    </section>
  );
}

export default AddStudentForm;
