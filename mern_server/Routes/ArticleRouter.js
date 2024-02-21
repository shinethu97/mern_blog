import express from 'express';
import * as aricleController  from '../Controllers/ArticleController.js';

const router = express.Router();

router.get("/tagandlanguage",aricleController.getTagsLanguage);
export default router;