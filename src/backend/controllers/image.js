import express from 'express';
import multer from 'multer';
import { Image } from '/models';
import { imageUploadPaths } from '/common/config';

const router = express.Router();

const upload = multer({ dest: imageUploadPaths.original }).single('image');

const addImage = (req, res, next) => {
  const { file } = req;
  Image.upload(file)
    .then(image => image.setAuthor(req.author).save())
    .then(image => res.return({ image }))
    .catch(err => {
      Image.unlinkFiles(file.filename).catch(console.error);
      next(err);
    });
};

const deleteImage = (req, res, next) => {
  const { image_id } = req.params;
  Image.get(image_id)
    .then(image => image.setAuthor(req.author).remove())
    .then(image => res.return({ image }))
    .catch(next);
};

const viewOriginalImage = (req, res, next) => {
  const { image_id } = req.params;
  Image.get(image_id)
    .then(image => {
      res.set('Content-type', image.mimeType);
      return image.read(null);
    })
    .then(content => res.end(content))
    .catch(next);
};

const viewThumbnailImage = (req, res, next) => {
  const { image_id, image_size } = req.params;
  Image.get(image_id)
    .then(image => {
      res.set('Content-type', image.mimeType);
      return image.read(image_size);
    })
    .then(content => res.end(content))
    .catch(next);
};

router.route('/')
  .post(upload, addImage);

router.route('/:image_id')
  .delete(deleteImage);

router.route('/:image_id/original')
  .get(viewOriginalImage);

router.route('/:image_id/thumbnail/:image_size')
  .get(viewThumbnailImage);

export default router;
