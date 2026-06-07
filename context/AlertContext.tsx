"use client";

import Alert from "@/components/Alert";
import Overlay from "@/components/Overlay";
import {
  createContext,
  ReactNode,
  startTransition,
  useContext,
  useState,
} from "react";
import { AnimatePresence } from "motion/react";

interface showAlertProps {
  title: string;
  message: string;
  btnText: string;
  btnStyle: "default" | "primary" | "danger";
  input?: {
    type: string;
    placeholder: string;
    validation: any;
    callback: (value: string) => void;
  };
  onConfirm: () => void;
  closeCallback?: () => void;
  refCallback?: (node: HTMLDivElement) => void;
  loading?: boolean;
  overlay: {
    theme: "dark" | "light";
  };
}
interface AlertContextType {
  showAlert: (data: showAlertProps) => Promise<HTMLDivElement>;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertData, setAlertData] = useState<showAlertProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionsLoading, setActionLoading] = useState<boolean | null>(null);

  const showAlert = async (data: showAlertProps): Promise<HTMLDivElement> => {
    return new Promise((resolve) => {
      const alert = {
        ...data,
        refCallback: (node: any) => {
          if (node) resolve(node);
        },
      };
      setAlertData(alert);
    });
  };
  const hideAlert = () => {
    if (!loading) setAlertData(null);
  };

  const handleConfirm = async () => {
    if (!alertData) return;
    try {
      setLoading(true);
      startTransition(() => alertData.onConfirm());
      hideAlert();
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AnimatePresence>
        {alertData && (
          <>
            <Alert
              {...alertData}
              loading={
                alertData.loading !== undefined ? alertData.loading : loading
              }
              onConfirm={handleConfirm}
              onCancel={() => {
                hideAlert();
                if (alertData.closeCallback) alertData.closeCallback();
              }}
            />
            <Overlay {...alertData.overlay} />
          </>
        )}
      </AnimatePresence>
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used inside AlertProvider");

  return context;
};
