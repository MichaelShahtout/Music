
import { makeExecutableSchema } from 'graphql-tools';

import { find, filter } from 'lodash';



const { gql } = require('apollo-server');

const typeDefs = gql`const typeDefs = [
  schema {
    query: RootQuery
  }

  type RootQuery {
    aNumber: Int
  }
];	`


module.exports = typeDefs;





// example data
const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

const resolvers = {
  Query: {
    posts: () => posts,
    author: (_, { id }) => find(authors, { id }),
  },

  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },

  Author: {
    posts: author => filter(posts, { authorId: author.id }),
  },

  Post: {
    author: post => find(authors, { id: post.authorId }),
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});



















const { gql } = require('apollo-server');
module.exports = typeDefs;

import { makeExecutableSchema } from 'graphql-tools';

import { find, filter } from 'lodash';

const typeDefs = gql`const typeDefs = [
  schema {
    query: RootQuery
  }

  type RootQuery {
    aNumber: Int
  }

	type Author {
	id : Int!
	firstName : String
	lastName : String
	}

	type Users( requires @ID) {
	 id: ID! @unique
	  title: String!
	  published: Boolean! @default(value: "false")
	  author: User
	}



	"""
	type object node
	"""
	type Admin( requires @ID) {
	 id: ID! @unique
	  title: String!
	  published: Boolean! @default(value: "false")
	  author: User

	}


	type Post {
	  id: ID! @unique
	  title: String!
	  published: Boolean! @default(value: "false")
	  author: User
	}

	type sessionID(requires @ID) {
		cookieTXT: ID! @unique
		passwrd: ID! @uniwue

	  }

	
	"""
	type object node
	"""
	type Guests (requires @ID) {
	  type Query {
	  UserID: ID!
	  }

	  
	  type Mutate {  
	    echo "logged in" 
	    sessionID = UserID;
	  } 
	  type Subscription {
	    
	  }
	} 

	"""
	"""
	type Tutors {
	  union time: String
	 
	}


	Mutate addGuest  {
	}


	"""
	interface products {
	  query specificToProducts(last:3) {
	  }
	}

	"""
	interface schedules {
	  query specificToSchedules(last: 3) {
	  }
	}

	"""

	interface songs {
	  enum caption : String; 
	  enum pdfURL : ID;
	  enum heroImage : String;
	  enum title : String;
	  enum description : String;
	  enum publishedBy : User
	  
	  Query specificToSongs(last: 3) {
	  }
	}

	"""



	

	"""
	Query default(first: 5) {
	    
	}

}

// example data
const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

const resolvers = {
  Query: {
    posts: () => posts,
    author: (_, { id }) => find(authors, { id }),
  },

  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error("Couldn't find post with id ${postId}");
      }
      post.votes += 1;
      return post;
    },
  },

  Author: {
    posts: author => filter(posts, { authorId: author.id }),
  },

  Post: {
    author: post => find(authors, { id: post.authorId }),
  },
};
];
`
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});