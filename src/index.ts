import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import * as morgan from "morgan";

async function run() {
  const app = express();

  app.use(
    session({
      secret: "my secret",
      resave: false,
      saveUninitialized: true
    })
  );

  app.use(bodyParser.json());

  app.use(morgan("dev"));

  app.post("/login", (req, res) => {
    if (req.body.auth === true) {
      if (req.session) {
        req.session.isLoggedIn = true;
        req.session.save(() => {
          res.sendStatus(200);
        });
      }
    } else res.sendStatus(406);
  });

  if (process.env.NODE_ENV !== "production") {
    app.use(require("../test/login-helper"));
  }

  app.get("/view", (req, res) => {
    if (!req.session || !req.session.isLoggedIn) {
      res.status(403);
      res.send(`<h1 data-testid="message">Not logged in</h1>`);
    } else {
      res.send(`<h1 data-testid="message">Logged in</h1>`);
    }
  });

  app.listen(3000, () => {
    console.log("Listening at http://localhost:3000");
  });
}

run().catch(e => {
  console.log(e.stack);
  process.exit(1);
});
