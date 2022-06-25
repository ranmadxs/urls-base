const swaggerUi = require('swagger-ui-express')
const express = require('express')
const app = express()
const loadSwagger = require('../swagger');

//const swaggerFile = require('../swagger-output.json')
/* Routes */
const router = require('./routes')

/* Middlewares */
app.use(router)

app.listen(3000, async () => {

  await loadSwagger.swaggerBase();
  const swaggerFile = require('../swagger-output.json')
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  console.log("Server is running!\nAPI documentation: http://localhost:3000/doc")
})
