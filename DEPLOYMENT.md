# NovaBoost: установка на VPS Ubuntu 22.04

NovaBoost в текущем виде — это не статический SPA-сайт. Это TanStack Start SSR-приложение с отдельными Express API routes и SQLite.

Правильная production-схема:

```text
nginx
  ├── статические файлы из /var/www/novaboost/dist/client
  └── proxy -> Node.js :4000
        └── server/server.cjs
              ├── /api/* через Express + SQLite
              └── HTML-страницы через dist/server/server.js, TanStack Start SSR
```

Node.js нужен обязательно, потому что после сборки нет файла `dist/client/index.html`, а HTML генерируется SSR-сервером.

## 1. Подключиться к VPS

```bash
ssh root@SERVER_IP
```

Замените `SERVER_IP` на IP вашего сервера.

## 2. Обновить систему и поставить зависимости

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y curl git nginx build-essential python3 pkg-config libsqlite3-dev ca-certificates
```

## 3. Установить Node.js 22

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

Node должен быть версии `22.12.0` или выше.

## 4. Создать системного пользователя и папки проекта

```bash
sudo useradd -m -s /bin/bash novaboost || true
sudo mkdir -p /var/www/novaboost
sudo mkdir -p /etc/novaboost
sudo chown -R novaboost:www-data /var/www/novaboost
sudo chmod -R 750 /var/www/novaboost
```

## 5. Создать production env-файл

```bash
sudo tee /etc/novaboost/novaboost.env >/dev/null <<'EOF'
PORT=4000
ADMIN_USER=admin@novaboost.cloud
ADMIN_PASS=CHANGE_THIS_STRONG_PASSWORD
EOF
```

Обязательно замените `CHANGE_THIS_STRONG_PASSWORD` на нормальный пароль.

```bash
sudo chown root:www-data /etc/novaboost/novaboost.env
sudo chmod 640 /etc/novaboost/novaboost.env
```

## 6. Скачать проект

Если это первая установка на чистую папку:

```bash
cd /var/www/novaboost
sudo -u novaboost git clone https://github.com/MrJinPro/novaboost-ecosystem-launch .
```

Если проект уже был склонирован раньше и нужно подтянуть свежую версию из GitHub:

```bash
cd /var/www/novaboost
sudo -u novaboost git pull origin main
```

Важно: команда пишется `origin`, не `orgin`.

Если папка уже не пустая и вы не уверены, что внутри, сначала проверьте её содержимое:

```bash
ls -la /var/www/novaboost
```

## 7. Установить npm-зависимости

```bash
cd /var/www/novaboost
sudo -u novaboost npm ci
```

Если на сервере возникнет ошибка с `sqlite3`, пересоберите нативный модуль:

```bash
cd /var/www/novaboost
sudo -u novaboost npm run rebuild:sqlite3
```

## 8. Собрать проект

```bash
cd /var/www/novaboost
sudo -u novaboost npm run build
```

После успешной сборки должны появиться:

```bash
ls -la /var/www/novaboost/dist
ls -la /var/www/novaboost/dist/client
ls -la /var/www/novaboost/dist/server
```

Ожидаемо:

```text
dist/client  - клиентские JS/CSS/assets
dist/server  - SSR bundle TanStack Start
```

## 9. Подготовить SQLite-папку

```bash
cd /var/www/novaboost
sudo -u novaboost mkdir -p data
sudo chown -R novaboost:www-data /var/www/novaboost/data
sudo chmod 750 /var/www/novaboost/data
```

База создастся автоматически при старте:

```text
/var/www/novaboost/data/db.sqlite
```

## 10. Проверить Node-сервер вручную

```bash
cd /var/www/novaboost
sudo -u novaboost env $(cat /etc/novaboost/novaboost.env | xargs) node server/server.cjs
```

В другом SSH-окне проверьте:

```bash
curl -I http://127.0.0.1:4000/
curl http://127.0.0.1:4000/api/health
```

Должно быть:

```text
HTTP/1.1 200 OK
{"ok":true}
```

Остановите ручной запуск:

```bash
Ctrl+C
```

## 11. Установить systemd service

```bash
sudo cp /var/www/novaboost/server/novaboost.service /etc/systemd/system/novaboost.service
sudo systemctl daemon-reload
```

Запустить сервис:

```bash
sudo systemctl start novaboost.service
```

Включить автозапуск после ребута:

```bash
sudo systemctl enable novaboost.service
```

Проверить статус:

```bash
sudo systemctl status novaboost.service
```

Смотреть логи:

```bash
sudo journalctl -u novaboost.service -f
```

В unit-файле уже включено:

```text
Restart=always
RestartSec=5
WantedBy=multi-user.target
```

Это значит: systemd поднимет сервис после ребута и перезапустит его при падении.

## 12. Проверить Node-сервис через localhost

```bash
curl -I http://127.0.0.1:4000/
curl http://127.0.0.1:4000/api/health
```

## 13. Установить nginx config

```bash
sudo cp /var/www/novaboost/server/nginx.novaboost.conf /etc/nginx/sites-available/novaboost.conf
sudo ln -sf /etc/nginx/sites-available/novaboost.conf /etc/nginx/sites-enabled/novaboost.conf
```

Если включён дефолтный сайт nginx и он мешает, отключите его:

```bash
sudo rm -f /etc/nginx/sites-enabled/default
```

Проверить nginx:

```bash
sudo nginx -t
```

Перезагрузить nginx:

```bash
sudo systemctl reload nginx
```

## 14. Проверить сайт через домен

```bash
curl -I http://agency.novaboost.cloud/
curl http://agency.novaboost.cloud/api/health
```

В браузере откройте:

```text
http://agency.novaboost.cloud
```

## 15. Получить HTTPS-сертификат Let's Encrypt

Перед этим должно уже работать:

```bash
curl -I http://agency.novaboost.cloud/
curl http://agency.novaboost.cloud/api/health
```

Установите Certbot через snap:

```bash
sudo snap install core
sudo snap refresh core
sudo apt remove -y certbot 2>/dev/null || true
sudo snap install --classic certbot
sudo ln -sf /snap/bin/certbot /usr/bin/certbot
```

Получите сертификат и разрешите Certbot автоматически поправить nginx:

```bash
sudo certbot --nginx -d agency.novaboost.cloud -m admin@novaboost.cloud --agree-tos --no-eff-email --redirect
```

Проверьте nginx и HTTPS:

```bash
sudo nginx -t
sudo systemctl reload nginx
curl -I https://agency.novaboost.cloud/
curl https://agency.novaboost.cloud/api/health
```

Проверьте автообновление сертификата:

```bash
sudo certbot renew --dry-run
```

Важно: после Certbot не копируйте заново файл:

```bash
sudo cp /var/www/novaboost/server/nginx.novaboost.conf /etc/nginx/sites-available/novaboost.conf
```

Эта команда перезапишет SSL-настройки, которые добавил Certbot. Если случайно перезаписали nginx config, повторите:

```bash
sudo certbot --nginx -d agency.novaboost.cloud -m admin@novaboost.cloud --agree-tos --no-eff-email --redirect
```

## 16. Проверить автозапуск после ребута

```bash
sudo reboot
```

После переподключения:

```bash
ssh root@SERVER_IP
sudo systemctl status novaboost.service
sudo systemctl status nginx
curl http://127.0.0.1:4000/api/health
curl http://agency.novaboost.cloud/api/health
```

## 17. Проверить перезапуск после падения

Найдите PID процесса:

```bash
pgrep -af "server/server.cjs"
```

Убейте процесс:

```bash
sudo pkill -f "server/server.cjs"
```

Через несколько секунд проверьте, что systemd поднял его снова:

```bash
sleep 7
sudo systemctl status novaboost.service
pgrep -af "server/server.cjs"
curl http://127.0.0.1:4000/api/health
```

## 18. Обновление проекта на VPS

```bash
cd /var/www/novaboost
sudo -u novaboost git pull origin main
sudo -u novaboost npm ci
sudo -u novaboost npm run build
sudo systemctl restart novaboost.service
sudo systemctl reload nginx
```

Не копируйте nginx config из репозитория после настройки HTTPS, если не хотите заново запускать Certbot.

## 19. Полезные команды диагностики

Статус Node-сервиса:

```bash
sudo systemctl status novaboost.service
```

Логи Node-сервиса:

```bash
sudo journalctl -u novaboost.service -n 200 --no-pager
sudo journalctl -u novaboost.service -f
```

Статус nginx:

```bash
sudo systemctl status nginx
```

Проверка nginx config:

```bash
sudo nginx -t
```

Логи nginx:

```bash
sudo tail -n 100 /var/log/nginx/novaboost.access.log
sudo tail -n 100 /var/log/nginx/novaboost.error.log
```

Проверка базы:

```bash
ls -lah /var/www/novaboost/data/db.sqlite
```

## 20. Итоговая команда запуска

Вручную запускать приложение в production не нужно. Его запускает systemd:

```bash
sudo systemctl start novaboost.service
sudo systemctl enable novaboost.service
```

Главная production-точка входа:

```text
/var/www/novaboost/server/server.cjs
```
