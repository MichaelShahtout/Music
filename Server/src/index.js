import {Component, Suspense, Data} from 'react';
import {App} from 'react-native';


const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');


const server = new ApolloServer({ typeDefs })

import gqlsuspense from 'graphql-suspense'
const client = new ApolloClient({
  uri: "<SOMEURI>"
})
class Data extends React.Component {
  render() {
    const data = gqlsuspense(client.query, { query: listTodos })
    return data.listTodos.map((t, i) => <p key={i}>{t.name}</p>)
  }
}
const App = () => (
  <Suspense fallback={<div>loading ...</div>}>
    <Data />
  </Suspense> 
)