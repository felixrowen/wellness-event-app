import { createContext, ReactNode, useState, useEffect } from "react";

import Toaster from "@/components/ui/Toaster";

interface IToaster {
  type: string;
  message: string;
}

interface IToasterState {
  toaster: IToaster;
  setToaster: (toaster: IToaster) => void;
}

const defaultToaster = {
  type: "",
  message: "",
};

const ToasterContext = createContext<IToasterState>({
  toaster: defaultToaster,
  setToaster: () => {},
});

const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const [toaster, setToaster] = useState<IToaster>(defaultToaster);
  const [showToaster, setShowToaster] = useState(false);

  useEffect(() => {
    if (toaster.message) {
      setShowToaster(true);
      const timer = setTimeout(() => {
        setShowToaster(false);
        setToaster(defaultToaster);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toaster]);

  return (
    <ToasterContext.Provider value={{ toaster, setToaster }}>
      {children}
      {showToaster && toaster.message && (
        <Toaster message={toaster.message} type={toaster.type} />
      )}
    </ToasterContext.Provider>
  );
};

export { ToasterProvider, ToasterContext, defaultToaster };
export type { IToaster, IToasterState };
