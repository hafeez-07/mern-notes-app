import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const token = req.cookies.token;


    if (!token) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
};
