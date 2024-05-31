import { ParamSchema, checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'

export const limitSchema: ParamSchema = {
  trim: true,
  isNumeric: {
    errorMessage: 'Limit must be Number'
  },
  custom: {
    options: (value, { req }) => {
      const num = Number(value)

      if (num > 100 || num < 1) {
        throw new Error('Limit must be 1 - 100')
      }

      return true
    }
  }
}

export const pageSchema: ParamSchema = {
  trim: true,
  isNumeric: {
    errorMessage: 'Page must be Number'
  },
  custom: {
    options: (value, { req }) => {
      const num = Number(value)

      if (num > 100 || num < 1) {
        throw new Error('Page must be 1 - 100')
      }

      return true
    }
  }
}

export const paginationValidator = validate(
  checkSchema(
    {
      limit: limitSchema,
      page: pageSchema
    },
    ['query']
  )
)
