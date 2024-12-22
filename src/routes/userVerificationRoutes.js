const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const UserVerificationController = require("../controllers/userVerificationController");

const userVerificationController = new UserVerificationController();

router.get("/:userId", (req, res) =>
  userVerificationController.getUserVerificationById(req, res)
);
router.post("/list", (req, res) =>
  userVerificationController.getAllUserVerifications(req, res)
);
router.post("/", (req, res) =>
  userVerificationController.createUserVerification(req, res)
);
router.post("/update", (req, res) =>
  userVerificationController.updateUserVerification(req, res)
);
router.post("/delete", (req, res) =>
  userVerificationController.deleteUserVerification(req, res)
);
router.post("/:userId/upload", upload.single("idProof"), (req, res) =>
  userVerificationController.uploadIdProof(req, res)
);

module.exports = router;
