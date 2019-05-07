export const {

	PORT = 5000,
	NODE_ENV = 'development',

	MONGO_URI = "mongodb+srv://J3T4R0:Agoura8942!@cluster0-bdwph.gcp.mongodb.net/test?retryWrites=true",

	...
	SESS_NAME = 'sid',
	SESS_SECRET = 'secret!session',
	SESS_LIFETIME = 1000 * 60 * 60 *2

} = process.env;