import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const trasformed = Number(chunk.toString()) * -1;

    console.log(trasformed);

    callback(null, Buffer.from(String(trasformed)));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk); // percorrendo a stream e adicionando os chunks no array
  } 

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);

  return res.end(fullStreamContent);

//   return req.pipe(new InverseNumberStream()).pipe(res);
});

server.listen(3334);
