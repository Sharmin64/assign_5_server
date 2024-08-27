import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/mddlewares/globalErrorHandler";
import notFoundRoute from "./app/mddlewares/notFoundRoute";
const app = express();

// parsers

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Car Washing System is running on Server");
});

app.use(globalErrorHandler);

app.use(notFoundRoute);

export default app;
