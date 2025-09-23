import http from 'node:http'

const server = http.createServer((req, res) => {
    return res.end('DANILO')
})


server.listen(3333)

//localhost:3333


// req => request
// res => response
