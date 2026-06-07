import InputField from "@/components/InputField";
import DatePicker from "react-date-picker";
import AddStudentForm from "./components/AddStudentForm";

export default function Home() {
  return (
    <>
      <section className="text-center py-10 px-5">
        <p className="text-slate-500 mb-1">
          إتحاد طلاب وخريجي مدرسة الموهبة والتميز
        </p>
        <h1 className="text-2xl font-bold text-dark">
          قاعدة بيانات طلاب الموهبة والتميز
        </h1>
      </section>
      <AddStudentForm />
    </>
  );
}
