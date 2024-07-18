// src/models/users.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [{ text: String, isCorrect: Boolean }],
  explanation: String,
});

const quizSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  questions: [questionSchema],
  category: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  comments: [{ body: String, date: { type: Date, default: Date.now } }],
  date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },
  meta: {
    votes: { type: Number, default: 0 },
    favs: { type: Number, default: 0 },
  },
});

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    quizzesPlayed: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    favoriteQuizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    score: { type: Number, default: 0 },
    rank: { type: String, default: 'Beginner' },
    badges: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

const Quiz = mongoose.model('Quiz', quizSchema);
const User = mongoose.model('User', UserSchema);

module.exports = { User, Quiz };
