#proxypac-gen-russia ![!img](http://s001.youpic.su/pictures/1404936000/cef2fefab7059a439aa8f4b3f6dececb.png)

Данные настройки позволят серфить интернет забыв о существовании цензуры и блокировок, не думать о переключении между `Прокси` ↔ `Прямое соединение`. На заблокированных сайтах будет включаться TOR, иначе - прямое соединение. 

Это самый рациональный способ использования TOR для обычных пользователей, которым необходимо иметь доступ к своим любимым сайтам.

Свежий .pac файл можно взять здесь:
*[http://proxypac-gen-russia.herokuapp.com/proxy.pac](http://proxypac-gen-russia.herokuapp.com/proxy.pac)*
##Автоматическое использование
####1 шаг:
Вам понадобится установленный и запущенный [Tor](https://www.torproject.org/download/download.html.en) (рекомендую в связке с Vidalia).
####2 шаг:
**Chrome**: Настройки → Показать дополнительные настройки → Изменить настройки прокси-сервера → Настройка сети. Вставить ссылку [http://proxypac-gen-russia.herokuapp.com/proxy.pac](http://proxypac-gen-russia.herokuapp.com/proxy.pac) в строку "Использовать сценарий автоматической настройки".

**Firefox**: Правка → Настройки → Дополнительные → Сеть → Настроить... Вставить ссылку [http://proxypac-gen-russia.herokuapp.com/proxy.pac](http://proxypac-gen-russia.herokuapp.com/proxy.pac) в строку "URL автоматической настройки сервиса прокси".

**Opera**: CTRL+F12 → Расширенные → Сеть → Прокси-серверы. Вставить ссылку [http://proxypac-gen-russia.herokuapp.com/proxy.pac](http://proxypac-gen-russia.herokuapp.com/proxy.pac) в строку "Автоматическая конфигурция прокси-сервера".

###Возможные проблемы
Настроили всё по инструкции, а блокировки остались? Ниже перечислены типичные проблемы и их решения

* Возможно, ваш Tor не запущен - убедитесь, что иконка Vidalia окрашена в зеленый цвет.
* Возможно, в качестве выходной ноды Tor выбрал узел из российского сегмента интернета - заходите в панель управления Vidalia → Сменить личность.
* Возможно, ваш провайдер осуществляет блокировки сайтов на уровне DNS - поможет установка [Google](https://developers.google.com/speed/public-dns/) / [Yandex](http://dns.yandex.ru/) DNS  в качестве DNS серверов.
 
##Схема работы
 ![!img](http://2.bp.blogspot.com/-lkftvqdHtPs/U7mSaIhtCbI/AAAAAAAAETs/PlMSHOie6IQ/s1600/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%821.png)

##Ручной запуск
Хотите запускать скрипт собственноручно?

`nodejs server.js` для запуска службы, которая раз в полчаса будет обновлять proxy.pac 

`nodejs server.js --once` для единовременного запуска

###Переменные
В начале скрипта задаются некоторые перменные, которые можно изменить, при желании

 `var dump_url = 'https://raw.githubusercontent.com/zapret-info/z-i/master/dump.csv';` - путь к выгрузке РосКомНадзора
 
 `var proxy_string = 'SOCKS5 127.0.0.1:9050';` - строка proxy.pac, отвечающая за использование прокси (в данном случае переменная настроена на использование Tor)
 
 `var proxy_pac_path = __dirname + '/static/proxy.pac';` - путь к генерируемому proxy.pac файлу
