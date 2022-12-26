import { S3 } from 'aws-sdk';

const {
  AWS_REGION = 'us-east-1',
  AWS_S3_BUCKET = 'mtasa-launcher',
} = process.env;

export class AWS_S3_HELPER {
  constructor(
    private client: S3 = new S3({
      region: AWS_REGION,
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

    const fileName = `${folder}/${fileId}.${extension}`;

    const result = await this.client.upload({
      ACL: "public-read",
      Bucket: AWS_S3_BUCKET,
      Body: file.data,
      Key: fileName,
      ContentType: file.mimetype,
    }).promise();

    return result;
  }

  async deleteFile(params: { folder: string, fileName: string; }) {
    const { folder, fileName } = params;

    const result = await this.client.deleteObject({
      Bucket: AWS_S3_BUCKET,
      Key: `${folder}/${fileName}`,
    }).promise();

    return result;
  }
}
