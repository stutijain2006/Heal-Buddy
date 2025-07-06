const multer = require('multer');
const path = require('path');

const storage= multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter= (req, file, cb) => {
    const allowedTypes= /jpeg|jpg|png|pdf/;
    const extname= allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype= allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Invalid file type, only jpeg, jpg, png and pdf are allowed'));
};

const upload = multer({
    storage,
    fileFilter
});

module.exports= upload;
