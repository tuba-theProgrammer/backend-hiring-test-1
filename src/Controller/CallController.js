import express from 'express';
// Use 'express' to access Request and Response
const { Request, Response } = express;
import Call from '../Model/Call.js';
import twilio  from 'twilio';

export const handleCall = async (req, res, next) => {
  try {
    const twiml = new twilio.twiml.VoiceResponse();
    const gather = twiml.gather({
      numDigits: 1,
      action: '/calls/redirect',
      method: 'POST',
    });
    gather.say('Press 2 to record the call.');

    // Assuming you have Twilio request parameters in req.body
    const { callerPhoneNumber } = req.body; // Replace with the actual parameter name

    // Create an instance of the Call model and populate it
    const call = new Call({
      callerPhoneNumber,
      recipientPhoneNumber: 'Destination Phone Number', // Replace with the actual recipient number
      callStatus: 'Incoming', // Or any other relevant call status
      callDuration: 0, // Initialize with 0, update as needed
      voicemailUrl: '', // Initialize with an empty string
    });

    // Save the call information to the database
    await call.save();

    res.set('Content-Type', 'text/xml');
    res.send(twiml.toString());
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}


    export const handleRedirect = async (req, res, next) => {
      try {
          // Assuming you have Twilio request parameters in req.body
          const twiml = new twilio.twiml.VoiceResponse();
          if (req.body.Digits === '1') {
            twiml.dial('+923094991779'); // Replace with the number you want to forward the call to
          } else if(req.body.Digits === '2') {
            twiml.say('Please record your message in 3, 2, 1. Now.');
            twiml.record({
              action: '/voicemail/record-voicemail',
              method: 'POST',

            });
          } else {
            twiml.say('Invalid Input, try Again.');
          }
          res.set('Content-Type', 'text/xml');
          res.send(twiml.toString());
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      }






