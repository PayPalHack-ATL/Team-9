import fs from 'fs';
import { AuthorizationError } from './error';

const replaceMe = (req, res, next) => {
  if (req.params.object_id === 'me') {
    const { author } = req;
    if (!author.isUser()) return next(new AuthorizationError());
    req.params.object_id = author._id;
  }
  next();
};

const isMongooseObject = object => object && object.constructor.name === 'model';

const now = () => {
  return new Date();
};

const isImageFile = value => {
  const [type, subtype] = value.split('/');
  return type === 'image' && ['gif', 'jpeg', 'png', 'svg+xml'].includes(subtype);
};

const deleteFile = path => {
  return new Promise((resolve, reject) => {
    fs.access(path, err => {
      if (err) return reject(err);
      fs.unlink(path, err => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
};

export {
  replaceMe,
  isMongooseObject,
  now,
  isImageFile,
  deleteFile,
};
