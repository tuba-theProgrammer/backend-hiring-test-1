import express from 'express';
// Use 'express' to access Request and Response
const { Request, Response } = express;
import Voicemail from '../Model/Voicemail.js';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse.js';
export const handleVoicemail = async (req, res, next) => {
    try {
      // Assuming you have Twilio request parameters in req.body
      const { RecordingUrl, From } = req.body;

      // Save the voicemail recording URL to the database
      const voicemail = new Voicemail({
        callerPhoneNumber: From,
        voicemailUrl: RecordingUrl,
      });
      await voicemail.save();

      // Respond with a message indicating successful voicemail recording
      const twiml = new VoiceResponse();
      twiml.say('Thank you for leaving a voicemail. Goodbye.');
      twiml.hangup();
      res.set('Content-Type', 'text/xml');
      res.send(twiml.toString());
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

