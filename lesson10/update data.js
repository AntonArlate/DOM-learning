const downloadBtn = document.getElementById('downloadBtn');

/*
отправляя запросы на сыйт http://jservice.io можно получить json объекты. Используем это в примере
*/

// при нажатии на кнопку
downloadBtn.addEventListener('click', () => {
    //отправляем запрос
    fetch('http://jservice.io/api/random?count=9')
        // парсим ответ сервера в json 
        // ...наверное. Работа с промисами ещё не пройдена, сложно понять функционал функции .then()
        // видимо это что-то вроде иного вида try...catch
        .then(response => response.json())
        // берём этот самый json отправляем в переменную data и работаем с ним
        .then(data => {
            const jsonArray = data; // Массив объектов JSON

            /*
            в целом наверное задание на этом можно считать выполненым, но далее я попытался при помощи кода выполнить их запись в файл.
            */

            const jsonString = JSON.stringify(jsonArray, null, 2); // Преобразование в строку JSON

            console.log('JSON-объекты успешно получены.');

            // это строка которая будет записана в файл
            const fileContent = `const data = ${jsonString};\n\nexport default data;`;

            // Создаем Blob из содержимого файла
            // Тоже не очень понятный мне тип данных, но необходим для найденого мной способа создания файла для скачивания в браузере. Способ создать или изменить файл на прямую не нашёл, мешает защита браузера
            const blob = new Blob([fileContent], { type: 'text/javascript' });

            // Создаем ссылку на Blob            
            const url = URL.createObjectURL(blob);

            // Создаем ссылку для скачивания файла
            const link = document.createElement('a');
            link.href = url;
            link.download = 'data.js';

            // Добавляем ссылку на страницу
            document.body.appendChild(link);

            // Автоматическое нажатие на ссылку для скачивания файла
            link.click();

            // Удаляем ссылку после завершения скачивания
            link.remove();

            console.log('JSON-объекты успешно сохранены в файле data.js.');

            /*
            также на задачу "4. Создать переменную которая будет хранить данные из публичных api." было найдено такое решение
            */
            localStorage.setItem('result', jsonString); // Сохранение в локальное хранилище
            // в данном примере данные сохраняются в переменной внутри браузера. К ним можно получить доступ через методы localStorage по ключу result. Судя по тому как легко их можно изменить из любого скрипта, очень ненадёжное хранилище.

        })
        .catch(error => {
            console.error(error);
        });
});