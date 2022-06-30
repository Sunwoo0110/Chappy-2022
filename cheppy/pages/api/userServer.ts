import { ApolloServer } from 'apollo-server-micro';
// import { buildSchema } from 'type-graphql';
// // import { createConnection } from 'typeorm';
// import { UserResolver } from '../../src/schema/UserResolver';

// const schema = await buildSchema({
//     resolvers: [UserResolver]
// })

// const server = new ApolloServer({
//     schema,
// });

// export const config = {
//     api:{
//         bodyParser: false,
//     },
// };

// const startServer =  server.start();

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
//     await server.createHandler({path: "/api/userServer"})(req, res);
// }
