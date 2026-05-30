# NovaBoost Deployment

## Локальный git commit и push

1. Добавь изменения в git:
```bash
cd /d d:\Projects\agency
npm install
git add .
git commit -m "Add server deployment configs, Express API, admin auth and streamer form fields"
git push origin main
```

> Если ветка не `main`, замени на свою.

## Подготовка на сервере

На сервере в Ubuntu 22.04 выполните:

```bash
sudo apt update
sudo apt install -y curl git nginx build-essential python3 pkg-config libsqlite3-dev
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo useradd -m -s /bin/bash novaboost || true
sudo mkdir -p /var/www/novaboost
sudo chown -R novaboost:www-data /var/www/novaboost
sudo chmod -R 750 /var/www/novaboost
```

## Клонирование в папку на сервере

```bash
cd /var/www/novaboost
sudo -u novaboost git clone <REPO_URL> .
sudo -u novaboost npm ci
sudo -u novaboost npm run rebuild:sqlite3
sudo -u novaboost npm run build
```

> Если после `npm ci` сервис всё ещё падает на `node_sqlite3.node`, значит бинарный модуль sqlite3 был собран под другую версию glibc. В этом случае повторно выполните `sudo -u novaboost npm run rebuild:sqlite3`.

## Настройка сервиса backend

Скопируйте `server/novaboost.service` в `/etc/systemd/system/`:

```bash
sudo cp server/novaboost.service /etc/systemd/system/novaboost.service
sudo systemctl daemon-reload
sudo systemctl enable novaboost.service
sudo systemctl start novaboost.service
sudo systemctl status novaboost.service
```

## Настройка nginx

Скопируйте `server/nginx.novaboost.conf` в `/etc/nginx/sites-available/novaboost.conf`:

```bash
sudo cp server/nginx.novaboost.conf /etc/nginx/sites-available/novaboost.conf
sudo ln -sf /etc/nginx/sites-available/novaboost.conf /etc/nginx/sites-enabled/novaboost.conf
sudo nginx -t
sudo systemctl restart nginx
```

## Проверка

- Открой `http://agency.novaboost.cloud`
- Проверка API: `http://agency.novaboost.cloud/api/health`

## Обновление с сервера

При следующих изменениях на локальной машине:

```bash
cd /var/www/novaboost
sudo -u novaboost git pull origin main
npm install
npm run build
sudo systemctl restart novaboost.service
sudo systemctl reload nginx
```
