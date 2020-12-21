const express = require("express");
const Patient = require("../modules/patient");
const router = express.Router();

router.get("/patient/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      res.status(200).send({
        status: "ok",
        data: {},
        msg: "patient not found",
      });
    }
    res.status(200).send({
      status: "ok",
      data: patient,
      msg: "get patient successfuly",
    });
  } catch (e) {
    res.status(500).send({
      status: "0",
      data: e,
      msg: "failed to get patient",
    });
  }
});

router.post("/patient/login", async (req, res) => {
  try {
    const patient = Patient.login(req.body.username, req.body.pass);
    res.status(200).send({
      status: "ok",
      data: patient,
      msg: "loged in successfuly",
    });
  } catch (e) {
    res.status(500).send({
      status: "0",
      data: e,
      msg: "loged in failed",
    });
  }
});

router.post("/patient/register", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    console.log(patient);
    await patient.save();
    res.status(200).send({
      status: "ok",
      data: patient,
      msg: "registered successfuly",
    });
  } catch (e) {
    res.status(500).send({
      status: "0",
      data: e,
      msg: "failed to register",
    });
  }
});

module.exports = router;
