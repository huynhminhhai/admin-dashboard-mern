import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'
import User from '~/models/schemas/User.schemas'
import { validate } from '~/utils/validation'

export const getUserValidator = validate(
  checkSchema(
    {
      id: {
        isString: {
          errorMessage: 'Id user must be string'
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            if (!ObjectId.isValid(value)) {
              throw new Error('Id user is invalid')
            }

            const user = await User.findById(value)

            if (user === null) {
              throw new ErrorWithStatus({
                message: 'User not found',
                status: HTTP_STATUS.NOT_FOUND
              })
            }

            req.user = user

            return true
          }
        }
      }
    },
    ['params']
  )
)
