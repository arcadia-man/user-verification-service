const userVerificationDetails = require("../models/userVerificationDetails");
const UserVerificationRepository = require("../repositories/userVerificationRepository");
const userVerificationRepository = new UserVerificationRepository();
const { S3CONSTANTS } = require("../constants/awsConstants/s3Constants");
const UploadFileToS3Webservice = require("../webservices/s3Services/uploadFileToS3");
const uploadFileToS3 = new UploadFileToS3Webservice();

class UserVerificationService {
  async createUserVerification(data) {
    return userVerificationRepository.createUserVerificationData(data);
  }

  async getUserVerificationById(userId) {
    const user = await userVerificationRepository.findByUserId(userId);
    if (!user) throw new Error("User not found");
    return user;
  }

  async getAllUserVerifications(filters) {
    const { country, city, occupation, page = 1, limit = 10 } = filters;
    filters = {
      ...(country && { country }),
      ...(city && { city }),
      ...(occupation && { occupation }),
    };
    const users = await userVerificationRepository.listUsersByFilters(
      filters,
      page,
      limit
    );
  }
  async updateUserVerification(data) {
    const { userId } = data;
    const user = await userVerificationRepository.updateDetailsByUserId(
      userId,
      data
    );
    if (!user) throw new Error("User not found");
    return user;
  }

  async deleteUser(userId) {
    const user = await userVerificationRepository.deleteUserByUserId(userId);
    if (!user) throw new Error("User not found");
    return user;
  }

  async uploadProofs(userId, name, file) {
    try {
      const docUrl = await uploadFileToS3.getS3UrlAnduploadFileToS3(file);
      const proofDetails = {
        name,
        docUrl,
        uploadedAt: new Date(),
      };
      const user = await userVerificationRepository.appendIdProof(
        userId,
        proofDetails
      );
      if (!user) throw new Error("User not found");
      return proofDetails;
    } catch (err) {
      throw new Error(`Error uploading file to S3: ${err.message}`);
    }
  }
}

module.exports = UserVerificationService;
