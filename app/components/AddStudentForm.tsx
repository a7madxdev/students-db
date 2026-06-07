"use client";

import InputField from "@/components/InputField";
import { useState } from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Button from "@/components/Button";
import dynamic from "next/dynamic";

const DatePickerWithNoSSR = dynamic(() => import("react-date-picker"), {
  ssr: false,
});

type BirthdaDate = Date | null;

interface StudentType {
  name: string;
  gender: string;
  adress: string;
  guardian: string;
  phoneNumber: string;
  interests: string;
  notes: string;
}

function AddStudentForm() {
  const [birthday, setBirthday] = useState<
    BirthdaDate | [BirthdaDate, BirthdaDate]
  >(new Date());
  const [formData, setFormData] = useState<StudentType>({
    name: "",
    gender: "male",
    adress: "",
    guardian: "",
    phoneNumber: "",
    interests: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", isError: false });

    try {
      const interestsArray = formData.interests
        ? formData.interests
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          birthday,
          interests: interestsArray,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setMessage({ text: "تم تسجيل الطالب بنجاح", isError: false });
        setFormData({
          name: "",
          gender: "male",
          adress: "",
          guardian: "",
          phoneNumber: "",
          interests: "",
          notes: "",
        });
      } else {
        const err = Object.values(result.errors ?? {})[0] as {
          errors?: string[];
        };
        setMessage({
          text: err?.errors
            ? err?.errors[0]
            : result.message || "حدث خطأ أثناء الحفظ",
          isError: true,
        });
      }
    } catch (error) {
      setMessage({
        text: "تعذر الإتصال بالخادم, يرجى المحاولة لاحقاً",
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="container mx-auto px-4 pb-8 md:w-3xl">
      <h3 className="text-lg font-semibold text-slate-800 w-fit mb-3 relative before:h-1 before:w-[70%] before:bg-primary before:absolute before:-bottom-1.5 before:rounded-full">
        إضافة طالب
      </h3>
      {message.isError && (
        <p className="text-xs bg-red-200 p-2 rounded-md text-red-600">
          {message.text}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        method="POST"
        className={loading ? "pointer-events-none opacity-50" : ""}
      >
        <label className="text-sm mb-1 block">الإسم</label>
        <InputField
          placeholder="الإسم رباعي"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mb-2"
        />
        <div className="flex text-sm h-12 items-center">
          <label>الجنس</label>
          <div className="flex flex-1 justify-evenly">
            <div className="flex gap-1.5">
              <input
                type="radio"
                id="male-gender"
                name="gender"
                checked
                value="male"
                onChange={handleChange}
              />
              <label htmlFor="male-gender">ذكر</label>
            </div>
            <div className="flex gap-1.5">
              <input
                type="radio"
                id="female-gender"
                name="gender"
                value="female"
                onChange={handleChange}
              />
              <label htmlFor="female-gender">أنثى</label>
            </div>
          </div>
        </div>
        <div className="h-12 py-2 flex items-center justify-between text-sm">
          <label>تاريخ الميلاد</label>
          <DatePickerWithNoSSR
            value={birthday}
            onChange={setBirthday}
            className="react-date-picker__inputGroup__input react-date-picker__inputGroup__day"
          />
        </div>
        <label className="text-sm mb-1 block">العنوان</label>
        <InputField
          placeholder="المدينة, الحي"
          name="adress"
          value={formData.adress}
          onChange={handleChange}
          className="mb-2"
        />
        <label className="text-sm mb-1 block">ولي الأمر</label>
        <InputField
          placeholder="إسم ولي الأمر"
          name="guardian"
          value={formData.guardian}
          onChange={handleChange}
          className="mb-2"
        />
        <label className="text-sm mb-1 block">رقم الهاتف</label>
        <InputField
          placeholder="0xxxxxxxxx"
          name="phoneNumber"
          type="number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="mb-2"
        />
        <label className="text-sm mb-1 block">الإهتمامات</label>
        <InputField
          placeholder="إفصل بين كل إهتمام والآخر بفاصلة"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          className="mb-2"
        />
        <label className="text-sm mb-1 block">ملاحظات</label>
        <textarea
          placeholder="حالة صحية خاصة أو حساسية"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
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
