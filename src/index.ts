import express from 'express'
import { defaultErrorHandler } from '~/middlewares/error.middlewares'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRoutes from '~/routes/client.routes'
import generalRoutes from '~/routes/general.routes'
import managementRoutes from '~/routes/management.routes'
import salesRoutes from '~/routes/sales.routes'
import { envConfig } from '~/constants/config'

dotenv.config()

const app = express()
const port = envConfig.port

//  Chỉ cho phép xử lý các dữ liệu dưới dạng chuỗi hoặc mảng
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Cho phép các tài nguyên có thể được tải từ bất kỳ nguồn gốc nào
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

app.use(cors())

// Ghi log
app.use(morgan('common'))

// Routes
app.use('/client', clientRoutes)
app.use('/general', generalRoutes)
app.use('/management', managementRoutes)
app.use('/sales', salesRoutes)

app.use(defaultErrorHandler)

// Mongoose setup
mongoose
  .connect(envConfig.mongoUrl)
  .then(() =>
    app.listen(port, () => {
      console.log(`Admin Dashboard app listening on port ${port}`)
    })
  )
  .catch((error) => console.log('Error: mongoose did not connected with ', error))
