import puppeteer from 'puppeteer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GoogleSpreadsheet } = require('google-spreadsheet');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { private_key, client_email } = require('../conf');

//добавляем ключ для спрешдщита
const doc = new GoogleSpreadsheet(
  'Айди таблицы гугл',
);
//тип видео: ссылка и таймкод
type VideoReportType = {
  link: string;
  time: string;
};

//Синглтон-класс, ответственный за работу марионеток
export default class Browsers {
  //Массив работников-марионеток
  public Workers = [];

  //метод инициализации Спредшита
  private async GoogleSheet(): Promise<any[]> {
    //Инициализируем документ
    await doc.useServiceAccountAuth({
      client_email: client_email,
      private_key: private_key,
    });
    //Загружаем и ждем документ
    await doc.loadInfo();
    //Инициализируем страницу 0
    const sheet = doc.sheetsByIndex[0];
    //Получаем все строки
    const rows = await sheet.getRows();
    //Возвращаем массив строк
    return rows;
  }

  //метод инициализации, принимает [имеил, пароль] аккаунта
  private async InitWorker([email, password]: string[]): Promise<number> {
    //Запускаем хромиум на марионетке
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--lang=ru-RU,ru'],
    });
    //Открываем новую страницу
    const page = await browser.newPage();
    //Добавляем настройку языка
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'ru',
    });
    //Переходим на Ютуб
    await page.goto(`https://YouTube.com/`);
    //Логируем Начало Иниализации аккаунта
    console.log('Initiating %s', email);
    //Ждем прогрузки страницы в лице кнопки Войти
    await page.waitForSelector('text/Войти');
    //Кликаем на нее
    await page.click('text/Войти');

    //Прописываем имейл кваери для поиска
    const emailInputQuery = 'input[name="identifier"]';
    //Прописываем пароль кваери для поиска
    const passwordInputQuery = 'input[name="Passwd"]';
    //Ждем появления формы ввода имейла
    await page.waitForSelector(emailInputQuery);
    //Прописываем заданный имейл в формку
    await page.type(emailInputQuery, email);
    //Кликаем далее
    await page.click('text/Далее');
    //Ждем появления формы ввода пароля
    await page.waitForSelector(passwordInputQuery);
    //Ждем секунду, потому что без этого может возникнуть баг
    await new Promise((r) => setTimeout(r, 1000));
    //Прописываем заданный пароль в форму
    await page.type(passwordInputQuery, password);
    //Кликаем далее
    await page.click('text/Далее');
    //Далее идет авто переадрисация на ютуб главную страницу
    //(опционально) делаем скриншот
    await page.screenshot({ path: `${email}` });
    //Логируем окончание инициализации аккаунта на марионетке
    console.log(email + ' inited!');
    //Добавляем марионетку в массив Workers
    return this.Workers.push(page);
  }

  //Открытый метод для управления марионетками, принимает тип работы и дату, состоящую из ссылки и таймкода
  public async CommandWorkers(type: string, data: VideoReportType): Promise<string> {
    //Делаем заготовку для счета успешных вызовов
    let sucess = 0;
    //Делаем заготовку для счета неудачных вызовов
    let errors = 0;
    //Запускаем комманду Репорта Видео если тип задачи = видео
    if (type === 'video')
      //Ждем выполнение всех промисов в массиве марионеток
      await Promise.all(
        //Создаем копию массива Марионеток
        this.Workers.map((page) =>
          //и запускаем для каждого Работу Репорта Видео, коллбеком добавляем в счетчик результат
          this.ReportVideo(data.link, data.time, page).then(
            (result) => sucess++,
            (error) => errors++,
          ),
        ),
      );
    //Возвращаем строку с количеством ошибок и успехов.
    return `Job Done. ${sucess} Succseed, ${errors} errors`;
  }

  //Приватный метод репорта видео, принимает ссылку, таймкод и обьект страницы Марионетки
  private async ReportVideo(link: string, time: string, page): Promise<string> {
    //Если нет времени, ставим ноль
    if (!time) time = '0';
    //Переходим по ссылке, используя код видео и таймкод
    await page.goto(`https://youtube.com/watch?v=${link}&t=${time}`);
    //Ждем прогрузки элемента фидбека, нужного нам
    await page.waitForSelector('div.yt-spec-touch-feedback-shape__fill');
    //Фокусируемся на нем
    await page.focus('div.yt-spec-touch-feedback-shape__fill');
    //Кликаем на него, !!!Используем механический клик, так как ютуб сделал некликабельную ноду чтобы не работали боты
    await page.mouse.click(759, 532, {});
    //Ждем анимацию
    await new Promise((r) => setTimeout(r, 300));
    //Кликаем на следующую ступень
    await page.mouse.click(644, 451, {});

    //Ждем анимацию
    await new Promise((r) => setTimeout(r, 1000));
    //Ждем прогрузку Элемента
    await page.waitForSelector('text/Пропаганда терроризма');
    //Кликаем на него
    await page.click('text/Пропаганда терроризма');
    //Кликаем на далее
    await page.click('text/Далее');
    //Ждем появления текстового окна
    await page.waitForSelector('textarea#textarea');
    //пишем туда текст
    await page.type(
      'textarea#textarea',
      'Разжигание ненависти и призывы к насилию.',
    );
    //Ждем для того, чтобы ютуб не заигнорировал репорт(может)
    await new Promise((r) => setTimeout(r, 1000));
    //Отправляем репорт
    await page.mouse.click(555, 483);
    //В случае успеха отправляем Готово
    return 'Done';
  }
  //Публичный статичный метод-инстанс, служит для того, чтобы был только один набор инициализированных марионеток, число = номер марионеток
  //todo можно доработать метод выборки и количества марионеток
  public static instance = new Browsers(3);

  //конструктор, принимает количество марионеток
  constructor(number: number) {
    //Запускаем метод инициализации гуглшита и ставим колбек
    this.GoogleSheet().then((rows) => {
      //Определяем счетчик
      let i = 0;
      //Обьявляем функцию которая запускает марионетку
      function processNext() {
        //Если нет строки, значит файл закончиолся, выклюаем функцию
        if (!rows[i]) return;
        //Запускаем метод инициализации марионетки, достаем из строки, ждем колбека
        this.InitWorker([rows[i]._rawData[0], rows[i]._rawData[1]]).then(
          //Колбек удачи
          (result) => {
            //Логируем готовность
            console.log('done!');
            //добавляем в счетчик 1
            i += 1;
            //Запускаем функцию, через другую функцию, см ниже
            thisProcessNext();
          },
          //Колбек неудачи
          (error) => {
            //Логируем ошибку
            console.log('error!');
            //Добавляем в счетчик 1
            i += 1;
            //Запускаем функцию
            thisProcessNext();
          },
        );
      }
      //ВАЖНО!!! так как в функции выше нужен корректный this, биндим констатнте функцию с нужным this
      const thisProcessNext = processNext.bind(this);
      //запускаем функцию
      thisProcessNext();
    });
  }
}
