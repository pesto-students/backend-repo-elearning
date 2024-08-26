import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, RequestMethod, ValidationPipe } from '@nestjs/common';
import { Environment } from './core/enums/environment.enum';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const NODE_ENV = process.env.NODE_ENV;
  const port = parseInt(process.env.PORT,10) || 4000;
  console.log("port set on: ",port)
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  let connectSrc = [
    "'self'",
  ];

  if (NODE_ENV === Environment.DEVELOPMENT) {
    connectSrc.push('*');
    app.enableCors()
    const config = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  // app.use(cookieParser()) // node module
  app.enableVersioning();
  // app.use(
  //   compression({
  //     threshold: 1000,
  //   }), // node module
  // );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(port, () => {
    console.log(`server running on ${port}`);
  });

}
bootstrap();
