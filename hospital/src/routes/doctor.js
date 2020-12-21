const express = require("express");
const Doctor = require("../modules/doctor");
const router = express.Router();

router.get("/doctor/all", async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      status: "ok",
      data: doctors,
      msg: "get all doctors successfuly",
    });
  } catch (e) {
    res.status(500).send({
      status: "0",
      data: e,
      msg: "failed to get doctors",
    });
  }
});

router.get("/doctor/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      res.status(200).send({
        status: "ok",
        data: {},
        msg: "doctor not found",
      });
    }
    res.status(200).send({
      status: "ok",
      data: doctor,
      msg: "found doctor successfuly",
    });
  } catch (e) {
    res.status(500).send({
      status: "0",
      data: e,
      msg: "error loading data",
    });
  }
});

router.post("/doctor/login", async (req, res) => {
  try {
    const user = await Doctor.login(req.body.username, req.body.pass);
    res.status(200).send({
      status: "ok",
      data: user,
      msg: "loged in successfuly",
    });
  } catch (e) {
    res.status(200).send({
      status: "0",
      data: e,
      msg: "failed to login",
    });
  }
});

router.post("/doctor/register", async (req, res) => {
  const user = new Doctor(req.body);
  try {
    await user.save();
    res.status(200).send({
      status: "ok",
      data: user,
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

router.patch("/doctor/disable/:id", async (req, res) => {
  const updateKeys = Object.keys(req.body);
  if (updateKeys.length > 1 && updateKeys[0] == "status")
    res.status(400).send({
      status: "0",
      data: {},
      msg: "failed to update , many updates.expect status only",
    });
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doctor) {
      res.status(200).send({
        status: "0",
        data: "",
        msg: "doctor not found",
      });
    }
    res.status(200).send({
      status: "ok",
      data: doctor,
      msg: "doctor status changed successfuly",
    });
  } catch (e) {
    res.status(500).send({
      statue: "0",
      data: e,
      msg: "error edit status",
    });
  }
});

module.exports = router;
