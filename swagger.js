const swaggerAutogen = require('swagger-autogen')()
const docBase = require('./resources/docBase.json')

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/index.js']


loadDocs = async function() {
    await swaggerAutogen(outputFile, endpointsFiles, docBase).then(() => {
    });
}

module.exports = {
    swaggerBase : loadDocs
}