import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { TAPIService } from './TAPI.service';

@Module({
  //Ипортируем Телеграф для текущего модуля
  imports: [
    TelegrafModule.forRoot({
      token: '5885040927:AAFzxlIEM-v_C554133BN4Ylj6ANPR7oLwg',
      middlewares: [session()],
    }),
  ],
  controllers: [],
  //Добавляем обязательно сервис
  providers: [TAPIService],
})
//Экспортируем класс модуля
export class TAPIModule {}
