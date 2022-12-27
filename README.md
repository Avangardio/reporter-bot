  <h1 align = 'center'> Сервис автоматизированных действий с работой через телеграмм-бота</h1>
  
## Описание

Сервер на [NestJS](https://github.com/nestjs/nest), выполняющий работу по автоматизации определенных процессов и взаимодействию с клиентом через телеграмм бота.
<p>Функционал на данный момент: логин в аккаунт, переход по ссылкам и отправка фидбека, проверка валидности токена видео. Общение через телеграмм.
  
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
  <img src='https://user-images.githubusercontent.com/55236752/209662206-ae58fef4-2e81-4bd5-b26c-7cb25a744742.png'/>
<p>И, наконец, поставляем ключи в файлы: <a href = 'https://github.com/Avangardio/reporter-bot/blob/master/src/Components/Browsers.ts'>ID таблицы<a/>, <a href = 'https://github.com/Avangardio/reporter-bot/blob/master/src/TelegramAPI/TAPI.module.ts'>Токен бота<a/>, и, наконец, в <a href = 'https://github.com/Avangardio/reporter-bot/blob/master/src/conf.ts'>Гугл ключи<a/> 
  
## Старт приложения

```bash
# старт
$ npm run start

# старт разработки
$ npm run start:dev
```

## Разработчики
  
- Автор - [Белянин Артем](https://github.com/Avangardio)

## Лицензия
Крайне приветствуется доработка, копирование и поддержка данного проекта.
