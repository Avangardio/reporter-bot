import { Controller, Get, Query } from '@nestjs/common';
import { YPService } from './YP.service';
import { getVideoInfo, VideoInfoResponse } from "youtube-video-exists";

//Обьяляем асинхронную функцию проверки видео
async function videoCheck(link: string): Promise<boolean> {
  //Заворачиваем в трай кетч
  try {
    //Пишем регекс, ловит ссылки типа .be/ и ?v=
    const string = '(?<=v=)([^&]*)|(?<=\.be\/)([^&?]*)';
    //Достаем токен из ссылки
    const id = link.match(new RegExp(string))[0];
    //Отправляем запрос и ждем ответа
    const result = await getVideoInfo(id);
    //Возвращаем результат
    return result.existing;
    //В случае ошибки
  } catch (error) {
    //Отправляем отрицательный ответ
    return false;
  }
}

@Controller('yp')
//Экспортируем класс Контроллера
export class YPController {
  //Добавляем методы Сервиса
  constructor( private readonly appService: YPService ) {}

  //Get-запрос на репорт видео
  @Get('report')
  //Метод, принимающий кваери типа, ссылки и таймкода
  async reportController(@Query() query: { type: string,  link: string; t: string }): Promise<string> {
    //Меняем полную ссылку на токен
    const id = query.link.match(new RegExp('(?<=v=)([^&]*)|(?<=\.be\/)([^&?]*)'))[0];
    //ОБЯЗАТЕЛЬНО ЖДЕМ РЕЗОЛВА ФУНКЦИИ, ТАК КАК МАРИОНЕТКИ ИНАЧЕ ЛОМАЮТСЯ!!!
    return await this.appService.reportService(query.type, {
      link: id,
      time: query.t,
    });
  }

  //Get-запрос на проверку видео
  @Get('checkVideo')
  //Метод, принимающий кваери ссылки
  async checkVideoController(@Query() query: { link: string }): Promise<boolean> {
    //Запускаем и ждем резолва функции
    return await videoCheck(query.link);
  }
}
