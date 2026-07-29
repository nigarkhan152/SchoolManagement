import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./app/database/mongodb.js";
import User from "./modules/auth/auth.model.js";
import seedAdmin from "./app/seed/admin.seed.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();