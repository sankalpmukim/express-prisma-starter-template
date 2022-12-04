import express, { Express, Request, Response } from "express";

import { PrismaClient } from ".prisma/client/index.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";

export const prisma = new PrismaClient();
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.get("/", async (req: Request, res: Response) => {
  return res.json({
    status: "online",
    serverTime: new Date().toISOString(),
  });
});

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
