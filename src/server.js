import http from "node:http";
import { json } from "./middleware/json.js";
import { routes } from "./routes.js";

// uuid -> UNIVERSAL UNIQUE ID

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });

  if (route) {
    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

// Stateful -> sempre guarada informações na memoria (dados armazenados localmente em memoria)
// Stateles -> não salva nada em memoria, geralmente salva as informações em formas externas (db, dispositivos, etc)

server.listen(3333);

//localhost:3333

// req => request
// res => response
