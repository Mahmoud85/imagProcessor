import fs from 'fs';
import sharp from 'sharp';
import * as path from 'path';

const getimagePath = (
  filename?: string,
  height?: string,
  width?: string,
  cached?: boolean
): string => {
  if (cached) {
    return `../assets/cached/${filename}-${height}-${width}.jpg`;
  }
  return `../assets/full/${filename}.jpg`;
};

// check if image is here
interface checkProps {
  exists: boolean;
  cached: boolean;
}
const isImageExists = async (
  fileName: string,
  height: string,
  width: string
): Promise<checkProps> => {
  try {
    const cachedurl = getimagePath(fileName, height, width, true);
    const fullurl = getimagePath(fileName);
    const cachedImage = fs.existsSync(path.resolve(__dirname, cachedurl));
    const fullImage = fs.existsSync(path.resolve(__dirname, fullurl));
    if (cachedImage) {
      return { exists: true, cached: true };
    }
    if (fullImage) {
      return { exists: true, cached: false };
    }
    return { exists: false, cached: false };
  } catch (e) {
    return { exists: false, cached: false };
  }
};

const createCache = async (filename: string, height: string, width: string): Promise<void> => {
  const srcFilePath = path.resolve(__dirname, getimagePath(filename, height, width));
  const dstFilePath = path.resolve(__dirname, getimagePath(filename, height, width, true));
  const cachedFolder = path.resolve(__dirname, '../assets/cached');
  if (!fs.existsSync(cachedFolder)) {
    fs.mkdirSync(cachedFolder);
  }
  await sharp(srcFilePath)
    .resize(Number(width), Number(height))
    .toFormat('jpeg')
    .toFile(dstFilePath);
};

const getResizedImage = async (filename: string, height: string, width: string) => {
  const imageCheck = await isImageExists(filename as string, height as string, width as string);
  if (!imageCheck.cached) {
    await createCache(filename as string, height as string, width as string);
  }
  const dstFilePath = path.resolve(
    __dirname,
    getimagePath(filename as string, height as string, width as string, true)
  );
  return dstFilePath;
};

export { isImageExists, getResizedImage };
