# SNPTV deployment
> Instructions I used when deploying this on an Ubuntu server

## Creation of the user who will execute the app
```sh
sudo useradd project-prod
sudo passwd project-prod
sudo mkdir /home/project-prod
sudo adduser project-prod sudo
sudo chown -Rv project-prod /home/project-prod/
sudo mkdir /home/project-prod/project
sudo chown -Rv project-prod /home/project-prod/project/ 
```

## Nginx conf file
```.nginxconf
upstream project.project.fr {
    server 127.0.0.1:3110;
}

server {
    listen 80;
    server_name project.project.fr;

    location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;

    proxy_pass http://project.project.fr/;
    proxy_redirect off;
    }
}
```


```sh
sudo vi /etc/nginx/sites-available/project-prod
sudo ln -s /etc/nginx/sites-available/project-prod /etc/nginx/sites-enabled/
sudo service nginx reload
```

## Deploy the app
Create a file called `.ftppass` at the root of the project formated like this :
```json
{
  "prod": {
    "username": "project-prod",
    "password": "XXXXXXXXXX"
  }
}
```

```sh
npm install --production
grunt prod
```


## Run the app on the distant server
```sh
cd /home/project-prod/project-prod/
npm install forever -g 
npm install --production
forever start app.js
```
