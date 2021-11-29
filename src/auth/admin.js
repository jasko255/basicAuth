import createHttpError from "http-errors";

export const adminOnly = (req, res, next) => {
  console.log(req.user.role, "<<<Inside admin middle");
  if (req.user.role === "Admin") {
    next();
  } else {
    next(createHttpError(403, "Admin only"));
  }
  console.log("admin only after else");
};
