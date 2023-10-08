import express, { Express, Request, Response } from "express";

const app: Express = express();




app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Invalid route",
  });
});

export default app;
