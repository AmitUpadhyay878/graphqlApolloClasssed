const {ApolloServer}  = require('apollo-server')
const mongoose = require('mongoose')
const {ApolloServerPluginLandingPageGraphQLPlayground}=require ('apollo-server-core')
const{MONGODB} =require('./config.js')
// require('dotenv').config()

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')




const server  = new ApolloServer({
    typeDefs:typeDefs,
    resolvers:resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

mongoose.connect(MONGODB,{useNewUrlParser:true})
.then(()=>{return server.listen({port:5000})})
.then((res)=>{console.log(`server is Running on ${res.url}`)})

