import http from "node:http";
import { json } from "./middleware/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

// uuid -> UNIVERSAL UNIQUE ID

// O front end tem 3 formas de enviar requisições ao backend
// Query parameters: URL Stateful => Filtros, paginação, não obrigatórios
// Route parameters: identificação de recurso
// Request body: envio de informações em um formulário

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;
    s;
    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

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
