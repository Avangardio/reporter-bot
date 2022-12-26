import { Module } from '@nestjs/common';

import { YPModule } from '../YoutubeParser/YP.module';
import { TAPIModule } from '../TelegramAPI/TAPI.module';

@Module({
  //Ипортируем телеграм модуль и ютуб модуль
  imports: [YPModule, TAPIModule],
  controllers: [],
  providers: [],
})
//Экспортируем класс Модуля
export class AppModule {}
