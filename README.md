Генератор .pac файла для tor на базе выгрузки Роскомнадзора. Позволит серфить интернет оптимальным способом, не думая о переключении между *Прокси ↔ Прямое соединение*. На заблокированных сайтах будет включаться TOR, иначе - прямое соединение.

*Свежий .pac файл можно взять здесь: [http://proxypac-gen-russia.herokuapp.com/proxy.pac](http://proxypac-gen-russia.herokuapp.com/proxy.pac)*
*****

##Автоматическое использование
Вам понадобится установленный и запущенный [Tor](https://www.torproject.org/download/download.html.en).

**Chrome**: Настройки → Показать дополнительные настройки → Изменить настройки прокси-сервера → Настройка сети. Вставить ссылку [http://proxypac-gen-russia.herokuapp.com/proxy.pac](http://proxypac-gen-russia.herokuapp.com/proxy.pac) в строку "Использовать сценарий автоматической настройки".

**Firefox**: Правка → Настройки → Дополнительные → Сеть → Настроить... Вставить ссылку [http://proxypac-gen-russia.herokuapp.com/proxy.pac](http://proxypac-gen-russia.herokuapp.com/proxy.pac) в строку "URL автоматической настройки сервиса прокси".

**Opera**: CTRL+F12 → Расширенные → Сеть → Прокси-серверы. Вставить ссылку [http://proxypac-gen-russia.herokuapp.com/proxy.pac](http://proxypac-gen-russia.herokuapp.com/proxy.pac) в строку "Автоматическая конфигурция прокси-сервера".

##Ручная работа
Хотите запускать скрипт собственноручно?

`nodejs server.js` для запуска службы, которая раз в полчаса будет обновлять proxy.pac 

`nodejs server.js --once` для единовременного запуска

###Переменные
В начале скрипта задаются некоторые перменные, которые можно изменить, при желании

 `var dump_url = 'https://raw.githubusercontent.com/zapret-info/z-i/master/dump.csv';` - путь к выгрузке РосКомНадзора
 
 `var proxy_string = 'SOCKS5 127.0.0.1:9050';` - строка proxy.pac, отвечающая за использование прокси (в данном случае переменная настроена на использование Tor)
 
 `var proxy_pac_path = __dirname + '/static/proxy.pac';` - путь к генерируемому proxy.pac файлу