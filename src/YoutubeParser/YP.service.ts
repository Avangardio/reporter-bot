import { Injectable } from '@nestjs/common';
import Browsers from '../Components/Browsers';
//Обьявляем тип данных запроса
type VideoReportType = {
  link: string;
  time: string;
};

@Injectable()
//Экспортируем класс Сервиса
export class YPService {
  //Метод для работы с инстансом марионеток
  async reportService(type: string, data: VideoReportType): Promise<string> {
    //Обьявляем инстанс класса марионеток
    const activateWorkers = await Browsers.instance;
    //Отдаем команду инстансу, не ждем ответа
    return activateWorkers.CommandWorkers(type, data);
  }
}
