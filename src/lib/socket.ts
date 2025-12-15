// @/lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SERVER_API_URL as string, {
      reconnectionAttempts: 5, // Optional: retries on disconnect
      reconnectionDelay: 2000, // Optional: delay between reconnection attempts
    });
  }
  console.log("connected", socket);
  return socket;
};
