import express from "express";
import { ApolloServer } from "apollo-server-express";

import resolvers from "../graphql/resolvers";
import typeDefs from "../graphql/typeDefs";
import cors from "cors";

const port = process.env.PORT || 3000;

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs
});

const app = express();

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true
    // preflightContinue: true,
    // exposedHeaders: [
    //   "Access-Control-Allow-Headers",
    //   "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
    //   "X-Password-Expired"
    // ],
    // optionsSuccessStatus: 200
  })
);

apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

app.all("*", (req, res) => {
  res.status(404).json({ status: "Missing endpoint" });
});

app.listen(port, () => console.log(`servers listening on port${port}`));
