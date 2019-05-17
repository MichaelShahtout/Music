import apollo from 'apollo';
import React from 'react';
import {gql, pubsub, schema} from 'graphql';

import {user_types} from '../socializer/lib/socializer_web/schema/user_types.ex'

const Dates = gql`
	type CalendarTime {
		date: String!
		id: ID!
		createdAt: String!
		Accepted: bool
		ReceiveInfo: ID 
	},

	type ReceiveInfo {
		sentTo: ID!
		sentFrom: ID!
	},

	enum Accepted(@default: false) {
		false: bool
		true: bool
	},


`;

let date = new Date();

type Query {
		date
		id
		createdAt
		Accepted
		ReceiveInfo
	},



	type Mutation {
		sentFrom: User.data.id
		sentTo: User.data.id
		date: date
		createdAt: date
	}