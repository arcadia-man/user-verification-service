const UserVerificationService = require("../services/userVerificationService");

const userVerificationService = new UserVerificationService();

class UserVerificationController {
  async createUserVerification(req, res) {
    try {
      const user = await userVerificationService.createUserVerification(
        req.body
      );
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  async getUserVerificationById(req, res) {
    try {
      const user = await userVerificationService.getUserVerificationById(
        req.params.userId
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllUserVerifications(req, res) {
    try {
      const users = await userVerificationService.getAllUserVerifications(
        req.body
      );
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateUserVerification(req, res) {
    try {
      const user = await userVerificationService.updateUserVerification(
        req.body
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  async deleteUserVerification(req, res) {
    try {
      const user = await userVerificationService.deleteUser(req.body.userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
  async uploadIdProof(req, res) {
    const { userId, name } = req.body;
    const file = req.file;

    try {
      const proofDetails = await userVerificationService.uploadProofs(
        userId,
        name,
        file
      );
      res
        .status(200)
        .json({ message: "File uploaded successfully", proofDetails });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserVerificationController;
