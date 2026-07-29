import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.js";
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use("/api/v1",routes);

app.get("/", (req, res) => {
    res.send("School ERP Backend Running 🚀");
});

export default app;