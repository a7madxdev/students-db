import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import z, { success } from "zod";

const studentSchema = z.object({
  name: z.string().trim().min(10, "الرجاء إدخال الاسم رباعياً بشكل صحيح"),
  gender: z.enum(["male", "female"], "الجنس يجب أن يكون ذكر أو أنثى"),
  birthday: z.coerce.date("تاريخ الميلاد غير صالح"),
  adress: z.string().trim().min(4, "العنوان مطلوب"),
  guardian: z.string().trim().min(4, "إسم ولي الأمر مطلوب"),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^0\d{9}$/, "يجب أن يتكون رقم الهاتف من 10 أرقام ويبدأ بـ 0"),
  interests: z.array(z.string()).optional(),
  notes: z.string().trim().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = studentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "حدث خطأ",
          errors: z.treeifyError(validation.error).properties,
        },
        { status: 400 },
      );
    }

    const validData = validation.data;

    const newStudent = await prisma.student.create({
      data: validData,
    });

    return NextResponse.json(
      { success: true, data: newStudent },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "حدث خطأ أثناء الإضافة",
      error,
    });
  }
}

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { success: true, data: students },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({
      succes: false,
      message: "حدث خطأ أثناء جلب البيانات",
      error,
    });
  }
}
