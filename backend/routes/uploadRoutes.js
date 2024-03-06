import path from 'path';
import express from 'express';
import multer from 'multer';
import { existsSync, unlinkSync } from 'fs';
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const checkFileType = (file, cb) => {
    const fileTypes = /jpg|jpeg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
        return cb(null, true);
    } else {
        cb('Image only');
    }
}

const upload = multer({
    storage,
    checkFileType
});

router.route('/').post(upload.single('image'), (req, res, next) => {
    if (req.file.path) {
        res.send({
            message: 'Image uploaded',
            image: `/${req.file.path}`
        });
    }
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