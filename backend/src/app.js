import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./app/config/swagger.js";
import errorMiddleware from "./app/middlewares/error.middleware.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("School ERP Backend Running 🚀");
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// ✅ Global Error Handler (Always Last)
app.use(errorMiddleware);

export default app;