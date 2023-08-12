const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  admin_id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

module.exports = mongoose.model("admin", UserSchema);
