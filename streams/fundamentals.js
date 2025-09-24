// ler pequenas partes de algo e conseguir trabalhar com os dados mesmo sem ler o arquivo todo

//process.stdin // ler
// .pipe(process.stdout) // tudo que estou recebendo como entrada estamos encanminhando para a saída

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const trasformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(trasformed)));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundredStream()
  .pipe(new MultiplyByTenStream())
  .pipe(new InverseNumberStream());
