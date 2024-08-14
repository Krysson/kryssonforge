const AWS = require('aws-sdk');
const s3 = new AWS.S3();

async function uploadToS3(file) {
  const params = {
    Bucket: 'kf.doc.bucket', // Replace with your actual bucket name
    Key: file.name, // The name of the file to be saved in S3
    Body: file.data, // The file data
    ContentType: file.type // The MIME type of the file
  };

  try {
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully at ${data.Location}`);
    return data.Location;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
}

module.exports = uploadToS3;
