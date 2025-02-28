import { createContext, useContext, useState, useMemo, useEffect } from "react";

// Create context
const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [animations, setAnimations] = useState(() => {
    return JSON.parse(localStorage.getItem("animations")) ?? true;
  });

  const [session, setSession] = useState(() => {
    return JSON.parse(localStorage.getItem("session")) ?? false;
  });

  useEffect(() => {
    localStorage.setItem("animations", JSON.stringify(animations));
  }, [animations]);

  useEffect(() => {
    localStorage.setItem("session", JSON.stringify(session));
  }, [session]);

  const toggleAnimations = () => setAnimations((prev) => !prev);

  const addSession = () => setSession(true);

  const value = useMemo(
    () => ({ animations, toggleAnimations, session, addSession }),
    [animations, session]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
