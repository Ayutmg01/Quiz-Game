const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quizzesPlayed: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    favoriteQuizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    createdQuizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    createdAt: { type: Date, default: Date.now },
  });
  
 
  
  const User = mongoose.model('User', userSchema);
  module.exports = User