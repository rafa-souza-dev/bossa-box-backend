import fastify from "fastify";
import { ZodError } from "zod";
import { appRoutes } from "./http/route";

const app = fastify()

app.register(appRoutes, {
    prefix: "tools"
})

app.setErrorHandler((error, _, res) => {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .send({ message: 'Validation error.', issues: error.format() })
    }
  
    return res.status(500).send({ message: 'Internal server error.' })
})

app.listen({
    host: "0.0.0.0",
    port: 8000
})
.then(server => {
    console.log(`HTTP server running at ${server}`)
})
