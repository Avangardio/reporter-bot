import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { TAPIService } from './TAPI.service';

@Module({
  //Ипортируем Телеграф для текущего модуля
  imports: [
    TelegrafModule.forRoot({
      token: 'ТОКЕН БОТА ТЕЛЕГРАММА',
      middlewares: [session()],
    }),
  ],
  controllers: [],
  //Добавляем обязательно сервис
  providers: [TAPIService],
})
//Экспортируем класс модуля
export class TAPIModule {}
