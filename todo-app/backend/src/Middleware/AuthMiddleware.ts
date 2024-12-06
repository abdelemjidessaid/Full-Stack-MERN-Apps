import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// add the userId to the express Request
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

/**
 * verifyToken - function that verifies the Authentication Tokens.
 *
 * @param req Express Request
 * @param res Express Response
 * @param next Express NextFunction that runs if Token Verification done successfully.
 * @returns void.
 */
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // extract the token from cookie
  const token = req.cookies["auth_token"];

  if (!token) return res.status(401).json({ message: "Unvalid token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as string);
    req.userId = (decoded as JwtPayload).userId;

    next();
  } catch (error) {
    return res.status(500).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
