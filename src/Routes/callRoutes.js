import express from 'express';
import * as CallController from '../Controller/CallController.js';

const router = express.Router();

router.post('/handle-incoming-call', CallController.handleCall);
router.post('/redirect', CallController.handleRedirect);
export default router;
