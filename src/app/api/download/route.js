import { NextResponse } from 'next/server';
import { S3 } from 'aws-sdk';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ success: false, error: 'No file key provided' }, { status: 400 });
  }

  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key
    };

    const data = await s3.getObject(params).promise();

    // Set appropriate headers for file download
    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${key}"`);
    headers.set('Content-Type', data.ContentType);

    return new NextResponse(data.Body, {
      status: 200,
      headers: headers
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
