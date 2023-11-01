import mongoose from 'mongoose';

const callSchema = new mongoose.Schema({
  callerPhoneNumber: String,
  recipientPhoneNumber: String,
  callStatus: String,
  callDuration: Number,
  voicemailUrl: String,
  timestamp: { type: Date, default: Date.now },
});

const Call = mongoose.model('Call', callSchema);

export default Call;
