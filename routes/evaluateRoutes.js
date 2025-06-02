import express from 'express';
import multer from 'multer';
import { evaluateFiles } from '../controllers/evaluateController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.array('files'), evaluateFiles);

export default router;
