import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, RequestMethod, ValidationPipe } from '@nestjs/common';
import { Environment } from './core/enums/environment.enum';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';

async function bootstrap() {

  const NODE_ENV = process.env.NODE_ENV;
  const port = parseInt(process.env.PORT) || 4000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
console.log("env: ", port)
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  let connectSrc = [
    "'self'",
  ];

  if(NODE_ENV === Environment.DEVELOPMENT){
    connectSrc.push('*');
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

  app.useStaticAssets(join(__dirname,'..','public'));
  app.setBaseViewsDir(join(__dirname,'..','views'));
  app.setViewEngine('hbs');

  await app.listen(port, ()=>{
    console.log(`server running on ${port}`);
  });

}
bootstrap();
