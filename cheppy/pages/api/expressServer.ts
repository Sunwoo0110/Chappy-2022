import { typeDefs } from '../../database/schema'
import { resolvers } from '../../database/resolvers'
import connectDb from '../../database/config/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import compression from 'compression'
import { makeExecutableSchema } from '@graphql-tools/schema'
import expressPlayground from "graphql-playground-middleware-express"
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import cors from 'cors'
import http from 'http'

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

export default async function handler() {
    const app = express();
    app.use('*', cors)
    app.use(compression)

    const httpServer = http
        .createServer(app)

    const server =  new ApolloServer({ 
        typeDefs,
        resolvers,
        // csrfPrevention: true,
        // cache: 'bounded',
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    app.get("/", (req, res) => {
        res.send("Hello, This is letter.");
        expressPlayground({ endpoint: "/graphql" })
    });

    await server.start()
    server.applyMiddleware({ 
        app,
        // path: "/api/expressServer" 
    })

    await new Promise<void>((resolve, reject) => 
        httpServer.listen().once('listening', resolve).once('error', reject)
            // {port: 3000},
        //     res,
        //     (): void => console.log('server Start'),
        // )
    )
    // httpServer.listen( (): void => console.log('server Start'), res)
    // console.log('server Start at http://localhost:3000${server.graphqlPath}')

    // httpServer.listen(
    //     {port: 3000},
    //     (): void => console.log('server Start')
    // )
    
}

// const startServer = server.start();

// export default async function handler(req, res){
//     // await createConnection();
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader(
//         "Access-Control-Allow-Origin",
//         "https://studio.apollographql.com"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
//     );
//     if (req.method === "OPTIONS") {
//         res.end();
//         return false;
//     }
//     await startServer;
//     await server.createHandler({path: "/api/expressServer"})(req, res);
// }

