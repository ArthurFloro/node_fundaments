import http from "node:http";
import { json } from "./middleware/json.js";
import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

// uuid -> UNIVERSAL UNIQUE ID

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");

    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    const user = {
      id: randomUUID(),
      name,
      email,
    };

    database.insert("users", user);

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

// Stateful -> sempre guarada informações na memoria (dados armazenados localmente em memoria)
// Stateles -> não salva nada em memoria, geralmente salva as informações em formas externas (db, dispositivos, etc)

server.listen(3333);

//localhost:3333

// req => request
// res => response
