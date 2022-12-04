import { Request, Response, Router } from "express";

import { Prisma } from ".prisma/client/index.js";
import { prisma } from "../index.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  return res.json(await prisma.user.findMany());
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.json(user);
});

router.post("/", async (req: Request, res: Response) => {
  const user: Prisma.UserCreateInput = req.body;
  return res.json(await prisma.user.create({ data: user }));
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user: Prisma.UserUpdateInput = req.body;
  return res.json(
    await prisma.user.update({ where: { id: Number(id) }, data: user })
  );
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  return res.json(await prisma.user.delete({ where: { id: Number(id) } }));
});

export default router;
