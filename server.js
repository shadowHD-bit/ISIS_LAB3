const path = require("path");
const express = require('express')
const sequelize = require("./utils/db");
const model = require("./model/Book");
const router = require('./routes/routes')

//Require Swagger
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const app = express()
const port = 8080

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/ajax', express.static(__dirname + '/ajax'));

app.get("/", async (req, res) => {
  const books = await model.findAll();
  res.render("main", {books});
});

app.use("/api", router);

const swaggerDefinition = {
  info: {
    title: 'Docker_book Swagger',
    version: '1.0.0',
    description: 'Documentation api to server'
  },
  components:{
    schemas: require("./schemas/schemas.json")
  }
}

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJsDoc(options)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))


const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => console.log(`Server started...`));
  } catch (e) {
    console.log(e);
  }
};

start()