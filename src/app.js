import express from 'express';
import mongoose from 'mongoose';

import callRoutes from './Routes/callRoutes.js';
import voicemailRoutes from './Routes/voicemailRoutes.js';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Connect to MongoDB (configure your MongoDB connection)
const mongoURI = 'mongodb+srv://naruto:3AQuB5poMPPsbdPK@cluster0.jvov5cj.mongodb.net/mydb?'
if (!mongoURI) { throw new Error('mongoURI is empty') }

app.use('/calls', callRoutes);
app.use('/voicemail', voicemailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoose.connect(mongoURI)
});
