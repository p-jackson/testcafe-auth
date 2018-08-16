import { Router } from "express";

const loginHelper = Router();

loginHelper.get("/test-login", (req, res) => {
  res.send(`
    <body>
      <script>
        function login() {
          fetch("/login", {
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ auth: true })
          });
        }
      </script>
      <button onclick="login()">Login</button>
    </body>
    `);
});

export = loginHelper;
