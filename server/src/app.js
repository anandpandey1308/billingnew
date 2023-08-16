import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

const app = express();

app.use([
    express.json(),
    express.urlencoded({ extended: true }),
    cors(),
    cookieParser(),
  ]);

app.use("/api", routes);

app.get("/", (_req, res) => {
  res.send("All services are running fine");
});

app.all("*", (_req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
export default app;
