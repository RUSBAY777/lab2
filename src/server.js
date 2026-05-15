const path = require("path");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const methodOverride = require("method-override");
const config = require("./config/env");
const { createContainer } = require("./container");
const { createRouter } = require("./routes");

const app = express();
const container = createContainer(config);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(process.cwd(), "public")));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.use(createRouter(container));

app.use((err, req, res, next) => {
  container.logger.error("Unhandled error", err.stack || err);
  res.status(500).send("Ошибка сервера");
});

app.listen(config.port, () => {
  container.logger.info(`Server started on http://localhost:${config.port}`);
});
