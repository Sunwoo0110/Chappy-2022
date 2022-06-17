import { typeDefs } from '../../database/schema'
import { resolvers } from '../../database/resolvers'
import connectDb from '../../database/config/config'
import { ApolloServer } from 'apollo-server-micro'
import { makeExecutableSchema } from '@graphql-tools/schema'

connectDb()

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export const config = {
    api: {
        bodyParser: false,
    },
}

const server =  new ApolloServer({ schema });

const startServer = server.start();

export default async function handler(req, res){
    // await createConnection();
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://studio.apollographql.com"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
    );
    if (req.method === "OPTIONS") {
        res.end();
        return false;
    }
    await startServer;
    await server.createHandler({path: "/api/testServer"})(req, res);
}