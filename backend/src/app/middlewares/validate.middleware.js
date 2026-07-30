const validate = (validator) => {
  return (req, res, next) => {
    try {
      validator(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default validate;