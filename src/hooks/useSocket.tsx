"use client";
// @/contexts/SocketContext.tsx
import { SocketContext } from "@/contexts/socket.context";
import { useContext } from "react";

// Custom hook to use socket context
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    return null;
  }
  return context;
};
