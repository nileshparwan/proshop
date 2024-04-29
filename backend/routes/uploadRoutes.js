import path from 'path';
import express from 'express';
import multer from 'multer';
import { existsSync, unlinkSync } from 'fs';
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

function fileFilter(req, file, cb) {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Images only!'), false);
    }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }

        res.status(200).send({
            message: 'Image uploaded successfully',
            image: `/${req.file.path}`,
        });
    });
});

router.route('/:filename').delete((req, res) => {
    const filename = req.params.filename;
    const dirname = path.resolve();
    const file = path.join(dirname, `/uploads/${filename}`)
    if(existsSync(file)){
        unlinkSync(file)
    }
    res.json({});
}); 

export default router;