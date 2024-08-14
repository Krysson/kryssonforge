import s3 from 'aws-sdk/clients/s3';
import axios from 'axios';
import { Content } from 'next/font/google';

export default async function aws(file) {
  const s3 = new s3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
  });

  try {
    const fileParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      key: file.name,
      Expires: 600,
      ContentType: file.type
    };

    return 'Uploaded!';
  } catch (error) {
    return error;
  }
}

const url = await s3.getSignedUrlPromise('putObject', fileParams);

await axios.put(url, file, {
  headers: {
    'Content-Type': file.type
  }
});
