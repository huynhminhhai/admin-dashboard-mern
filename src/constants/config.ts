import dotenv from 'dotenv'

dotenv.config()

export const envConfig = {
  mongoUrl: process.env.MONGO_URL as string,
  port: (process.env.PORT as string) || 4001
}
