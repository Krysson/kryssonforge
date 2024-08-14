// lib/s3.js

import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

export const uploadFile = async (file, key) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: file
  }

  return s3.upload(params).promise()
}

export const getFile = async key => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key
  }

  return s3.getObject(params).promise()
}

export const deleteFile = async key => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key
  }

  return s3.deleteObject(params).promise()
}
