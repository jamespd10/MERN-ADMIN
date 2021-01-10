import { Express } from 'express'
import configureMongoDb from './mongodb'
import configureExpress from './express'

export default async (app: Express) => {
	await configureMongoDb()
	await configureExpress(app)
}