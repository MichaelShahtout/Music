import react from 'react';
import react_native from 'react-native';


const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('/schema');


const app = express();

app.use('/graphql', bodyParser.json(),
		graphqlExpress(async (req, res) => {
			const schema;

			return {

			schema: schema,
			graphiql: true,
			tracing: true,
			cacheControl: {
				defaultMaxAge: 130
			},
			context : {req, res}
			};
		}
	);

		app.use(`/graphiql`, graphiqlExpress({
			endpointURL: '/graphql'
		}));

		const engine = new ApolloEngine({
			apiKey : 'service:microservices-example:-eduiehdiuehduihe'
		});

		engine.listen({
			port : 4000,
			expressApp: app
		});

app.listen(4000, () => {
	console.log("server is running on port 4000")
});



// function that will throw promise for Suspense to catch
const createFetcher = fetcher => {
  let cache = {};
  return {
    read: (...args) => {
      if (cache[args] === undefined) {
        throw fetcher(args).then(v => (cache[args] = v));
      } else {
        return cache[args];
      }
    }
  }
}




// calling createFetcher
const myResource = createFetcher(async() => {
  const data = await API.graphql(graphqlOperation(query))
  return data.listTodos.items
})
function Data() {
  const todos = myResource.read()
  return todos.map((t, i) => <p>Todo {i}</p>)
}


<Suspense fallback={<div>loading...</div>}>
  <Data />
</Suspense>

retrieveUser = () => {
	let retrieveUser = useSuspense(0);
	data.listTodos.items

}