const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
  },

  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  physics: {
    type: mongoose.SchemaTypes.Number,
  },
  chemistry: {
    type: mongoose.SchemaTypes.Number,
  },
  maths: {
    type: mongoose.SchemaTypes.Number,
  },
  biology: {
    type: mongoose.SchemaTypes.Number,
  },
  english: {
    type: mongoose.SchemaTypes.Number,
  },
});

module.exports = mongoose.model("student", UserSchema);
