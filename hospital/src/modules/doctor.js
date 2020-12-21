const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const Patient = require("./patient");
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 60,
    minLength: 5,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    maxLength: 70,
    minLength: 10,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: 4,
    maxLength: 11,
  },
  pass: {
    type: String,
    required: true,
  },
  spesialize: {
    type: String,
    required: true,
    trim: true,
    maxLength: 25,
  },
  phone: {
    type: String,
    unique: true,
    required:true,
    maxlength: 11,
    minlength:11
  },
  whatsapp: {
    type: String,
    unique: true,
    required:true,
    maxlength: 11,
    minlength:11
  },
  status: {
    type: Boolean,
    default: true,
  },
});
doctorSchema.methods.toJSON = function(){
  const doc = this
  const docOb = doc.toObject();
  delete docOb.pass;
  return docOb;
};

doctorSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isModified('pass')) {
    doc.pass = await bcrypt.hash(doc.pass, 12);
  }
  next();
});

doctorSchema.statics.login = async (username, pass) => {
  const user = await Doctor.findOne({ username });
  if (!user) throw new Error("wrong username");
  const auth = await bcrypt.compare(pass, user.pass);
  if (!auth) throw new Error("wrong password");
  return user;
};
doctorSchema.virtual("Patient", {
  ref: Patient,
  localField: "_id",
  foreignField: "doctor",
});
const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
