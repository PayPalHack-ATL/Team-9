import path from 'path';
import { publicPath } from '/environment';

const jwtSignOptions = {
  expiresIn: '30d',
};

const thumbnailSizes = [256, 512, 1024];

const imageUploadPaths = {
  original: path.resolve(publicPath, 'image', 'original'),
  thumbnail: path.resolve(publicPath, 'image', 'thumbnail'),
};

export {
  jwtSignOptions,
  thumbnailSizes,
  imageUploadPaths,
};
