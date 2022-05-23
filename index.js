const {ApolloServer}  = require('apollo-server')
const gql =require('graphql-tag')

const typeDefs=gql`
        type Query{
            hello:String!
        } 
`

// Logic of typeDef
const resolvers = {
    Query:{
        hello:()=>{

        }
    }

}


const server  = new ApolloServer({
    typeDefs:typeDefs,
    resolvers:resolvers
})

server.listen({port:5000}).then(res=>{
        console.log(`server is Running on ${res.url}`)
})