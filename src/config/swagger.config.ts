import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerConfig {
  public static build(app: INestApplication<any>): OpenAPIObject {
    const config = new DocumentBuilder()
      .setTitle('Auto Distribution')
      .setDescription('User management API')
      .setVersion('1.0')
      .build();
    return SwaggerModule.createDocument(app, config);
  }
}
