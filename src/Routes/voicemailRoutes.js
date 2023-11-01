import express from 'express';

// Use 'express' to access Request and Response
const { Request, Response } = express;
import * as VoicemailController from '../Controller/VoicemailController.js';

const router = express.Router();

router.post('/record-voicemail', VoicemailController.handleVoicemail);

export default router;
