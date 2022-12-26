import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

//Асинхронная функция бустрапа сервера
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4444);
}
//Запускаем сервер, логируем ссылку для удобства.
bootstrap().then(() => console.log('http://localhost:4444'));
