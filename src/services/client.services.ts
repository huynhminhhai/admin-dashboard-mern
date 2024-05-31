import Product from '~/models/schemas/Product.schemas'
import User from '~/models/schemas/User.schemas'

class ClientService {
  async getProducts({ limit, page }: { limit: number; page: number }) {
    const [productWithStat, total] = await Promise.all([
      Product.aggregate([
        // {
        //   $skip: limit * (page - 1)
        // },
        // {
        //   $limit: limit
        // },
        {
          $addFields: {
            stringId: {
              $toString: '$_id'
            }
          }
        },
        {
          $lookup: {
            from: 'productstats',
            localField: 'stringId',
            foreignField: 'productId',
            as: 'state'
          }
        },
        {
          $unwind: {
            path: '$state'
          }
        },
        {
          $project: {
            stringId: 0
          }
        }
      ]),
      Product.aggregate([
        {
          $addFields: {
            stringId: {
              $toString: '$_id'
            }
          }
        },
        {
          $lookup: {
            from: 'productstats',
            localField: 'stringId',
            foreignField: 'productId',
            as: 'state'
          }
        },
        {
          $unwind: {
            path: '$state'
          }
        },
        {
          $project: {
            stringId: 0
          }
        },
        {
          $count: 'total'
        }
      ])
    ])

    return { productWithStat, total: total[0].total }
  }

  async getCustomers({ limit, page }: { limit: number; page: number }) {
    const [users, total] = await Promise.all([
      User.aggregate([
        {
          $match: {
            role: 'user'
          }
        },
        // {
        //   $skip: 0
        // },
        // {
        //   $limit: 10
        // },
        {
          $project: {
            password: 0
          }
        }
      ]),
      User.aggregate([
        {
          $match: {
            role: 'user'
          }
        },
        {
          $project: {
            password: 0
          }
        },
        {
          $count: 'total'
        }
      ])
    ])

    return {
      users,
      total: total[0].total
    }
  }
}

const clientService = new ClientService()
export default clientService
