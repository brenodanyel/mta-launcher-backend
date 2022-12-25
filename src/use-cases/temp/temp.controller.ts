import { RequestHandler } from 'express';
import { UploadedFile } from 'express-fileupload';
import { InvalidRequestError } from '../../utils/error-handling';
import { AWS_S3_HELPER } from '../../utils/aws-s3-helper';

export class Controller {
  constructor(
    private s3Helper: AWS_S3_HELPER = new AWS_S3_HELPER()
  ) { }

  public readonly create: RequestHandler<{}, {}, {}, {}> = async (req, res, next) => {
    try {
      const file = req.files?.file as UploadedFile;

      if (!file) {
        throw new InvalidRequestError('File is missing!');
      }

      const result = await this.s3Helper.uploadFile(file);

      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };
}
