import { S3 } from 'aws-sdk';
import { UploadedFile } from 'express-fileupload';

const {
  AWS_REGION = 'us-east-1',
  AWS_S3_BUCKET = 'mtasa-launcher',
  AWS_ACCESS_KEY_ID = '',
  AWS_SECRET_ACCESS_KEY = '',
} = process.env;

export class AWS_S3_HELPER {
  constructor(
    private client: S3 = new S3({
      region: AWS_REGION,
      credentials: {
        
      }
    })
  ) { }

  async uploadFile(file: UploadedFile) {
    const result = await this.client.upload({
      Bucket: AWS_S3_BUCKET,
      Body: file.data,
      Key: this.convertName(file.name),
    }).promise();

    return result;
  }

  private convertName(name: string) {
    const ext = name.split('.').at(-1);
    const newName = new Date().getTime() + '.' + ext;
    return newName;
  }
}
