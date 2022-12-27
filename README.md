  <h1 align = 'center'> Сервис автоматизированных действий с работой через телеграмм-бота</h1>
  
## Описание

Сервер на [NestJS](https://github.com/nestjs/nest), выполняющий работу по автоматизации определенных процессов и взаимодействию с клиентом через телеграмм бота.
<p>Функционал на данный момент: логин в аккаунт, переход по ссылкам и отправка фидбека, проверка валидности токена видео. Общение через телеграмм.
<p>Ссылка на бота - <a href = 'https://t.me/ospa_report_bot'>Telegram</a>.
  
## Цели
<p>Добавление возможности автоматической регистрации аккаунтов.
<p>Проверка списка аккаунтов в таблице с вычеркиванием недействительных.
<p>Возможность отправки фидбека на каналы.
  
## Установка

Для начала, устанавливаем все зависимости:
```bash
npm install
```
<p>Далее, проводим стандартную конфигурацию бота через <a href = 'https://t.me/botFather'>@BotFather<a/>.
<p>После, для работы приложения нужно получить ключ апи <a href = 'https://support.google.com/googleapi/answer/6158862?hl=en'>Гугл Таблиц<a/>.
<p>Затем, создаем таблицу, в первой строке пишем email, password. Далее по примеру: 
  <img src='https://user-images.githubusercontent.com/55236752/209675488-88fb146e-d773-4cc9-a021-98a6d490a4d0.png'/>
<p>И, наконец, поставляем ключи в файлы: <a href = 'https://github.com/Avangardio/reporter-bot/blob/master/src/Components/Browsers.ts'>ID таблицы<a/>, <a href = 'https://github.com/Avangardio/reporter-bot/blob/master/src/TelegramAPI/TAPI.module.ts'>Токен бота<a/>, и, наконец, в <a href = 'https://github.com/Avangardio/reporter-bot/blob/master/src/conf.ts'>Гугл ключи<a/> 
  
## Старт приложения

```bash
# старт
$ npm run start

# старт разработки
$ npm run start:dev
```

## Используемые библиотеки
  <ul>
    <li><a href='https://www.npmjs.com/package/nestjs-telegraf'>Nest-Telegraf</a> - библиотека telegraf, адаптированная под NestJS.
    <li><a href='https://nestjs.com'>NestJS</a> - Node.js фреймворк для сервера.
    <li><a href='https://axios-http.com/docs/intro'>Axios</a> - отличная библиотека для создания и отправки запросов.
    <li><a href='https://pptr.dev/'>Puppeteer</a> - Практически сердце приложения, позволяет управлять "марионетками" для действий на сайтах.
  </ul>
  
## Разработчики
  
- Автор - [Белянин Артем](https://github.com/Avangardio)

## Лицензия
Крайне приветствуется доработка, копирование и поддержка данного проекта.
