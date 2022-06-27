# urls-base
API que permite efectuar la acción de CRUD de “urlshortener”

## Instalar

```
npm install
```
## Desplegar

```
npm start
```
## Documentación 
Para revisar la documentación "viva" (openApi)
```
https://urls-base.herokuapp.com/
```
![swagger](https://github.com/ranmadxs/urls-base/blob/main/img03.png?raw=true)

## Heroku

Para revisar los logs y efectuar "escalado manual", el automático es de pago.
```
heroku logs --tail --app urls-ln

heroku ps:scale web=2 --app urls-ln
```
