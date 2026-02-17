import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { buildContext } from "./graphql/contexts";
import { AuthResolver } from "./resolvers/auth.resolver";
import { UserResolver } from "./resolvers/user.resolver";

async function bootstrap() {
  const app = express()

  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver],
    validate: false,
    emitSchemaFile: "./schema.graphql"
  })

  const server = new ApolloServer({
    schema,
  })

  await server.start()

  app.use(
    "graphql",
    cors(),
    express.json(),
    expressMiddleware(server, { context: buildContext })
  )

  app.listen(
    {
      port: 4000,
    },
    () => {
      console.log("Servidor iniciado na porta 4000 🎉☕")
    }
  )
}

bootstrap()