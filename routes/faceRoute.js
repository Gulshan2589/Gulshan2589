const express = require("express");
const Face = require("../models/Faceid");
const router = express.Router();

// router.post("/facelogin", async function (req, res) {
//   try {
//     const result = await Face.findOne({
//       email: req.body.email,
//       password: req.body.password,
//     });

//     if (result) {
//       res.send(result);
//     } else {
//       res.status(500).json("Error");
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

router.post("/faceregister", async function (req, res) {
    try {
      const newface = new Face(req.body);
      await newface.save();
      res.send('Face Registered Successfully')
    } catch (error) {
      res.status(500).json(error);
    }
  });


  module.exports = router;