import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { isImageExists } from '../utilities/imageProcessing';

const validator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let errorMsg = 'Error occured processing your image:';
  const fileName = req.query.filename as unknown as string;
  const height = req.query.height as unknown as string;
  const width = req.query.width as unknown as string;
  if (!req.query.filename) {
    errorMsg += "'Image file name is missing'";
    res.status(404);
    return res.send(errorMsg);
  }
  const imageChek = await isImageExists(fileName, height, width);
  if (!imageChek.exists) {
    res.status(404);
    return res.send('Oops! image could not be found');
  }

  if (!height || !width || _.isNaN(Number(width)) || _.isNaN(Number(height))) {
    errorMsg += "'image height/width is missing or invalid'";
    res.status(404);
    return res.send(errorMsg);
  }

  next();
};

export default validator;
