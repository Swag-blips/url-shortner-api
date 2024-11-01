import { AnyObjectSchema } from "yup";
import { Request, Response, NextFunction } from "express";

const validateResource =
  (resourceSchema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await resourceSchema.validate(req.body);

      next();
    } catch (error) {
      res.sendStatus(400);
      return;
    }
  };

export default validateResource;
