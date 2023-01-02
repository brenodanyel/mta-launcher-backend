import { S3 } from 'aws-sdk';

const {
  USE_AWS_REGION = '',
  USE_AWS_S3_BUCKET = '',
  USE_AWS_ACCESS_KEY_ID = '',
  USE_AWS_SECRET_ACCESS_KEY = '',
} = process.env;

export class AWS_S3_HELPER {
  constructor(
    private client: S3 = new S3({
      region: USE_AWS_REGION,
      credentials: {
        accessKeyId: USE_AWS_ACCESS_KEY_ID,
        secretAccessKey: USE_AWS_SECRET_ACCESS_KEY,
      },
    })
  ) { }

  async uploadFile(params: {
    file: {
      name: string,
      data: Buffer;
      mimetype: string;
    },
    folder: string,
    fileId: string;
  }) {
    const { file, folder, fileId } = params;

    const extension = file.name.split('.').at(-1);

    const fileName = `${folder}/${fileId}.${extension}?${Date.now()}`;

    const result = await this.client.upload({
      ACL: "public-read",
      Bucket: USE_AWS_S3_BUCKET,
      Body: file.data,
      Key: fileName,
      ContentType: file.mimetype,
    }).promise();

    return result;
  }

  async deleteFile(params: { folder: string, fileName: string; }) {
    const { folder, fileName } = params;

    const result = await this.client.deleteObject({
      Bucket: USE_AWS_S3_BUCKET,
      Key: `${folder}/${decodeURIComponent(fileName)}`,
    }).promise();

    return result;
  }
};
