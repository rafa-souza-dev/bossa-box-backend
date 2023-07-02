import fastify from "fastify";

const app = fastify()

app.listen({
    host: "0.0.0.0",
    port: 8000
})
.then(server => {
    console.log(`HTTP server running at ${server}...`)
})
