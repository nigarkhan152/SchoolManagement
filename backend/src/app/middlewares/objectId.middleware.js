import mongoose from "mongoose";

const validateObjectId = (param = "id") => {
  return (req, res, next) => {
    const id = req.params[param];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }

    next();
  };
};

export default validateObjectId;