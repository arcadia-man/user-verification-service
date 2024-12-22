const userVerificationDetails = require("../models/userVerificationDetails");

class UserVerificationRepository {
  async createUserVerificationData(data) {
    const user = new userVerificationDetails(data);
    return user.save();
  }

  async findByUserId(userId) {
    const user = await userVerificationDetails.findOne({ userId });
    return user;
  }

  async updateDetailsByUserId(userId, data) {
    const user = await userVerificationDetails.findOneAndUpdate(
      { userId },
      data,
      { new: true }
    );
    return user;
  }

  async deleteUserByUserId(userId) {
    const user = await userVerificationDetails.findOneAndDelete({ userId });
    return user;
  }

  async listUsersByFilters(filters, page, limit) {
    const users = await userVerificationDetails
      .find(filters)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    return users;
  }

  async appendIdProof(userId, data) {
    const user = await userVerificationDetails.findOneAndUpdate(
      { userId },
      { $push: { idProof: data } },
      { new: true }
    );
    return user;
  }
}

module.exports = UserVerificationRepository;
