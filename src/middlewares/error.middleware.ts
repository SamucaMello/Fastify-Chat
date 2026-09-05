import { type Request, type Response,type NextFunction } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);

  res.status(500).json({
    message: "Algo deu errado no servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
}