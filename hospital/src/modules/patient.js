const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
    minlength: 5,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 15,
    trim: true,
  },
  pass:{
    type:String,
    required:true
  },
  history: [
    {
      type: String,
    },
  ],
  doctor: {
    type: mongoose.Types.ObjectId,
    ref: "Doctore",
  },
});
patientSchema.methods.toJSON = function () {
  const pat = this;
  const patOb = pat.toObject();
  delete patOb.pass;
  return patOb;
};

patientSchema.pre('save', async function (next) {
  const pat = this;
  if(pat.isModified('pass')) {
    pat.pass = await bcrypt.hash(pat.pass, 12);
  }
  next();
});
patientSchema.statics.login = async (username, pass) => {
  const user = await Patient.findOne({ username });
  if (!user) throw new Error("wrong username");
  const auth = await bcrypt.compare(pass, user.pass);
  if (!auth) throw new Error("wrong password");
  return user;
};
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
