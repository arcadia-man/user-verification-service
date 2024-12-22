const AWS = require("aws-sdk");

const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const DateHelper = require("../../helpers/dataHelper");
const S3CONSTANTS = require("../../constants/awsConstants/s3Constants");
const dateHelper = new DateHelper();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

class UploadFileToS3Webservice {
  async getS3UrlAnduploadFileToS3(file) {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${S3CONSTANTS.PROOFS_FOLDER}/${dateHelper.getCurrentDate()}-${
          file.originalname
        }`,
        Body: file.buffer,
      },
    });
    const data = await upload.done();
    return data.Location;
  }
}

module.exports = UploadFileToS3Webservice;
