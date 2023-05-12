import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UploadsService {
  constructor(private readonly configureService: ConfigService) {}
  private readonly s3Client = new S3Client({
    // region: this.configureService.getOrThrow('AWS_S3_REGION'),
  });

  async upload(fileName: string, file: Buffer) {
    // await this.s3Client.send({
    //       new PutObjectCommand({
    //         Bucket:'upload-nestjs',
    //       })
    // });
  }
}
