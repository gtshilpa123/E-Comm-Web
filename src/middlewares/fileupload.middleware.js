// npm i multer
// import multer
import multer from "multer";

// configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // destination directory
    // execution stars from server. From server, uploads folder is ./uploads. Not according to fileupload.middleware.js
    // null -> for error handling
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname); // unique filename
  },
});

export const upload = multer({ storage: storage });
