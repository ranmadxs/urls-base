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
![swagger](https://raw.githubusercontent.com/ranmadxs/urls-base/main/doc/img03.png)

## Heroku

Para revisar los logs y efectuar "escalado manual", el automático es de pago.
```
heroku logs --tail --app urls-ln

heroku ps:scale web=2 --app urls-ln
```
