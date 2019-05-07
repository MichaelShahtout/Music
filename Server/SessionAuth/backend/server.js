import express from 'express';
import mongoose from 'mongoose';

import session from 'express-session';
import connectStore from "connect-mongo";


import {PORT, NODE_ENV, MONGO_URI, SESS_NAME, SESS_SECRET, SESS_LIFETIME} from './config';

import {userRouter} from './routes/index';

(async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true
		});
		console.log('MongoDB connected');
	


const app = express();
const MongoStore = connectStore(session);


app.disable('x-powered-by');

app.use(express.urlencoded({
	extended: true
}));

app.use(express.json());

app.use(session({
	name: SESS_NAME,
	secret: SESS_SECRET,
	saveUninitialized: false,
	resave: false,
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		collection: 'session',
		ttl: parseInt(SESS_LIFETIME) / 100
	}),
	cookie: {
		sameSite: true,
		secure: NODE_ENV === 'production',
		maxAge: parseInt(SESS_LIFETIME)
	}
}));
...

const apiRouter = express.Router();



app.use('/api', apiRouter);
apiRouter.use('/users', userRouter);

apiRouter.use('/session', sesionRoutes);
...

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
} catch(err) {
	console.log(err);
}


})();