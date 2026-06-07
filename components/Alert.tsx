"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { motion } from "motion/react";
import InputField from "./InputField";
import z from "zod";
// import Tip from "./Tip";

interface AlertProps {
  title: string;
  message: string;
  input?: {
    type: string;
    placeholder: string;
    validation: z.ZodString;
    callback: (value: string) => void;
  };
  btnText: string;
  btnStyle: "default" | "primary" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
  refCallback?: (node: any) => void;
  loading?: boolean;
}

const Alert = ({
  title,
  message,
  input,
  btnText,
  btnStyle = "primary",
  onConfirm,
  onCancel,
  refCallback,
  loading,
}: AlertProps) => {
  const alertRef = useRef<HTMLDivElement | null>(null);
  const [inputVal, setInputVal] = useState("");
  const [inputError, setInputError] = useState("");
  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (alertRef.current && !alertRef.current.contains(e.target as Node)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  function handleConfirm() {
    setInputError("");
    if (input) {
      const result = input.validation.safeParse(inputVal);
      if (!result.success) {
        setInputError(z.treeifyError(result.error).errors[0]);
      } else {
        input.callback(inputVal);
        onConfirm();
      }
    } else {
      onConfirm();
    }
  }

  function setRefs(node: HTMLDivElement) {
    alertRef.current = node;
    if (refCallback) refCallback(node);
  }

  return (
    <motion.div
      className="fixed top-5 z-10 max-w-[calc(100%-40px)] w-75 bg-white p-3 rounded-md shadow-[0_2px_10px_0_#00000044]"
      initial={{ right: -20, opacity: 0 }}
      animate={{ right: 20, opacity: 1 }}
      exit={{ right: -20, opacity: 0 }}
      transition={{ duration: 0.16 }}
      ref={setRefs}
    >
      <h1 className="text-slate-800 font-semibold">{title}</h1>
      <p className="text-sm mt-1 text-slate-600 leading-6">{message}</p>
      {input && (
        <InputField
          type={input.type}
          placeholder={input.placeholder}
          value={inputVal}
          setValue={setInputVal}
          maxLength={30}
        />
      )}
      {/* {inputError && <Tip content={inputError} type="error" />} */}
      <div className="flex justify-end gap-2 mt-5">
        <Button onClick={onCancel} disabled={loading}>
          إلغاء
        </Button>
        <Button
          style={btnStyle}
          onClick={() => handleConfirm()}
          disabled={loading}
        >
          {btnText}
        </Button>
      </div>
    </motion.div>
  );
};

export default Alert;
