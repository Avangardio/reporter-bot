import { Injectable } from '@nestjs/common';
import {
  Action,
  Command,
  Hears,
  Help,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context } from 'telegraf';
import axios from 'axios';

//Обьявляем тип для запроса реквеста
type requestBodyType = {
  type?: string;
  link?: string;
};
//Обьявляем тип для обьекта базы данных
type RequestDBType = {
  [key: string]: requestBodyType
};
//Обьявляем базу данных, можно обынчым обьектом так как просесс планируется быть один.
let requestDB: RequestDBType = {}

//Ответная клавиатура с вариантами ответа
const requestKeyboard = {
  reply_markup: {
    one_time_keyboard: false,
    inline_keyboard: [
      [{text: 'Репорт видео', callback_data: 'Report video'}],
    ],
  },
};

@Update()
@Injectable()
//Экспортируем класс сервиса TAPI
export class TAPIService {

  //Реакция на комманду /start
  @Start()
  //Метод реакции
  async startCommand(ctx: Context) {
    //Добавляем в бд пользователя
    requestDB[ctx.message.from.id] = {type: '', link: ''};
    //Отвечаем и отправляем клавиатуру
    await ctx.reply('Добрый день, выберите тип атаки.', requestKeyboard);
  }

  //Реакция на кнопку Репорт видео
  @Action('Report video')
  //Мето реакции
  async reportVideo(ctx: Context) {
    //Добавляем в дб нашего пользователя тип - видео
    requestDB[ctx.callbackQuery.from.id] = { type: 'video', link: '' };
    //Отвечаем
    await ctx.reply('Отправьте ссылку на видео с таймкодом или без него.');
  }

  //Прослушиваем ссылки по регексу
  @Hears(/\.(com|be)/)
  //Метод реакции
  async sendLink(ctx: Context) {
    //проверяем, добавил ли пользователь тип действия
    if(!requestDB[ctx.message.chat.id].type) {
      //если нет, то отвечаем с клавиатурой
      await ctx.reply('Вы не выбрали тип канала, повторите запрос.', requestKeyboard);
      //удаляем ссылку от пользователя
      await ctx.deleteMessage(ctx.message.message_id);
      //завершаем функцию
      return;
    }
    //Обьявляем текст с ссылкой пользователя
    // @ts-ignore
    const testLink = await ctx.message.text;
    //Обьявляем ответ, потом его заполним
    let answer;
    //Проводим трай кетч с реквестом на сервер, который проверяет, существует ли видео, возрвращает true или ошибку
    try {
      //Проводим опрос сервера, ждем ответ и записываем его
      answer = await axios.get(
        `http://localhost:4444/yp/checkVideo?link=${testLink}`,
      );
      //если запрос неудачный, выбрасывается ошибка и мы ничего не записываем в ответ
    } catch (error) {
      //логируем ошибку
      console.log(error);
    }
    //Если нет ответа
    if(!answer.data) {
      //Пишем пользователю что ссылка невалидная
      await ctx.reply(`Видео недоступно или скрыто, проверьте ссылку и отправьте заново.`);
      //Завершаем функцию
      return;
    }
    //Записываем измененную ссылку в бд, ссылку изменяем для уменьшения работы по расшифровке, так как пользователь пишет чуть другую ссылку
    //пользователь шлет https://youtube.com/watch?v=VIDEOCODE?t=TIME, а нам для кваери нужны https://youtube.com/watch?v=VIDEOCODE&t=TIME
    requestDB[ctx.message.chat.id].link = testLink.replace('?t', '&t');
    //Отвечаем пользователю
    await ctx.reply(`Видео проверено ☑, отправляю запрос... `);
    //Отправляем запрос на сервер
    axios.get(`http://localhost:4444/yp/report?type=${requestDB[ctx.message.chat.id].type}&link=${requestDB[ctx.message.chat.id].link}`)
      //Отвечаем об успехе запроса пользователю
      .then(result => ctx.reply("Запрос прошел успешно. Благодарим за участие."))
      //Отвечаем об неудаче запроса пользователю
      .catch(error => ctx.reply('Произошла ошибка на сервере. Повторите позже.'))
  }
}
