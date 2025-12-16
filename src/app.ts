import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler";
import connectToMongoDB from "./config/mongoDb-config";
import routes from "./routes";
connectToMongoDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1", routes);

const PORT = parseInt(process.env.PORT || "4000", 10);
const hostname = process.env.HOST_NAME || "localhost";

app.listen(PORT, hostname, () => {
  console.log(
    `✅ Server running on ${hostname}:${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});

export default app;
