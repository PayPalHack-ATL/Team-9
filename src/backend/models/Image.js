import mongoose from 'mongoose';
import Sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { deleteFile, isImageFile } from '/common/util';
import db from '/common/db';
import { authorPlugin } from '/models/plugins';
import { thumbnailSizes, imageUploadPaths } from '/common/config';

const { Schema } = mongoose;

const imageSchema = new Schema({
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true, validate: isImageFile },
  fileName: { type: String, required: true },
});

imageSchema.plugin(authorPlugin, {
  insert: {
    user: true,
  },
  get: {
    guest: true,
  },
  remove: {
    user: true,
  }
});

const getOriginalPath = fileName => path.resolve(imageUploadPaths.original, fileName);
const getThumbnailPath = (fileName, thumbnailSize) => path.resolve(imageUploadPaths.thumbnail, thumbnailSize.toString(), fileName);

imageSchema.statics.upload = file => {
  const { originalname: originalName, mimetype: mimeType, filename: fileName } = file;
  const originalPath = getOriginalPath(fileName);
  const sharp = Sharp(originalPath);
  const promises = thumbnailSizes.map(thumbnailSize => {
    return new Promise((resolve, reject) => {
      const thumbnailPath = getThumbnailPath(fileName, thumbnailSize);
      resolve(sharp.resize(thumbnailSize, thumbnailSize).max().withoutEnlargement().toFile(thumbnailPath));
    })
  });
  return Promise.all(promises)
    .then(() => new Image({
      originalName,
      mimeType,
      fileName,
    }));
};

imageSchema.statics.unlinkFiles = fileName => {
  const originalPath = getOriginalPath(fileName);
  const promises = thumbnailSizes.map(thumbnailSize => {
    const thumbnailPath = getThumbnailPath(fileName, thumbnailSize);
    return deleteFile(thumbnailPath);
  });
  return Promise.all(promises)
    .then(deleteFile(originalPath));
};

imageSchema.methods.read = function (thumbnailSize) {
  const image = this;
  return new Promise((resolve, reject) => {
    const path = thumbnailSize === null ?
      getOriginalPath(image.fileName) :
      getThumbnailPath(image.fileName, thumbnailSize);
    fs.readFile(path, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
};

imageSchema.methods.unlinkFiles = function () {
  return Image.unlinkFiles(this.fileName);
};

imageSchema.pre('remove', function (next) {
  this.unlinkFiles()
    .then(() => next())
    .catch(next);
});

const Image = db.model('Image', imageSchema);

export default Image;
