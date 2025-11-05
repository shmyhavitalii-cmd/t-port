import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import authRoutes from "./routes/auth.routes.js";
import zoneRoutes from "./routes/zone.routes.js";
import ridesRoutes from "./routes/rides.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { initSocket } from "./socket.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/zone", zoneRoutes);
app.use("/rides", ridesRoutes);
app.use("/admin", adminRoutes);

app.get("/", (_, res) => res.send("T-Port API Running ✅"));

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
