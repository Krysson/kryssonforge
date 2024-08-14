import { NextResponse } from 'next/server';
import { S3 } from 'aws-sdk';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export async function GET() {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME
    };

    const data = await s3.listObjectsV2(params).promise();

    const files = data.Contents.map(file => ({
      key: file.Key,
      lastModified: file.LastModified,
      size: file.Size,
      url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${encodeURIComponent(file.Key)}`
    }));

    return NextResponse.json({ success: true, files });
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
