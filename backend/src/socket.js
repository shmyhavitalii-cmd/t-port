import { Server } from "socket.io";
import { query } from "./db.js";

export function initSocket(httpServer) {
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("driver_online", (data) => {
      socket.join(`driver:${data.id}`);
    });

    socket.on("ride_request", async (ride) => {
      const { pickup_lat, pickup_lng } = ride;
      const sql = `
        SELECT id FROM users
        WHERE role='driver' AND verified=true
        ORDER BY RANDOM() LIMIT 1;
      `;
      const result = await query(sql);
      if (result.rows[0]) {
        const driverId = result.rows[0].id;
        io.to(`driver:${driverId}`).emit("ride_request", ride);
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });

  return io;
}
