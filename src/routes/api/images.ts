import express from 'express';
import { getResizedImage } from '../../utilities/imageProcessing';
import validator from '../../utilities/validator';

const images = express.Router();

images.get('/', validator, async (req, res) => {
    const { filename, height, width } = req.query;
    const image = await getResizedImage(filename as string,height as string,width as string);
    return res.sendFile(image)
  });

export default images;