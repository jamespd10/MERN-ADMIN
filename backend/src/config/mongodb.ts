import mongoose from 'mongoose'
import env from '../env'
import { Db } from 'mongodb';

export default async (): Promise<Db>=>{
    const {
		connection: { db },
	} = await mongoose.connect(env.db.mongoUri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
    })
    return db
}