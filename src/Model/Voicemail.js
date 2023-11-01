import mongoose from 'mongoose';

const voicemailSchema = new mongoose.Schema({
  callerPhoneNumber: String,
  voicemailUrl: String,
  timestamp: { type: Date, default: Date.now },
});

const Voicemail = mongoose.model('Voicemail', voicemailSchema);

export default Voicemail;
