const mongoUri = process.env.MONGO_URI
if (!mongoUri) {
	throw Error('MONGO_URI debe estar definido')
}

const nodeEnv = process.env.NODE_ENV
if (!nodeEnv) {
	throw Error('NODE_ENV debe estar definido')
}

const clientUrl = process.env.CLIENT_URL
if (!clientUrl) {
	throw Error('CLIENT_URL debe estar definido')
}

const emailPort = parseInt(process.env.EMAIL_PORT || '587')
if (!emailPort) {
	throw Error('EMAIL_PORT debe estar definido')
}

const emailHost = process.env.EMAIL_HOST
if (!emailHost) {
	throw Error('EMAIL_HOST debe estar definido')
}

const emailUser = process.env.EMAIL_USER
if (!emailUser) {
	throw Error('EMAIL_USER debe estar definido')
}

const emailPassword = process.env.EMAIL_PASSWORD
if(!emailPassword){
	throw Error('EMAIL_PASSWORD debe estar definido')
}

const jwtSecret = process.env.JWT_SECRET
if(!jwtSecret){
	throw Error('EMAIL_PASSWORD debe estar definido')
}

const port = parseInt(process.env.PORT || '3000')

export default {
	auth: {
		jwtSecret,
	},
	db: {
		mongoUri,
	},
	nodeEnv,
	port,
	clientUrl,
	emailPort,
	emailHost,
	emailUser,
	emailPassword
}