import Product from '~/models/schemas/Product.schemas'
import Transaction from '~/models/schemas/Transaction.schemas'
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

    return { productWithStat, total: total[0]?.total | 0 }
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
      total: total[0]?.total | 0
    }
  }

  async getTransactions({ limit, page, search }: { limit: number; page: number; search: string }) {
    console.log(search)

    const [transactions, total] = await Promise.all([
      Transaction.aggregate([
        {
          $match: {
            $or: [{ cost: { $regex: new RegExp(search, 'i') } }, { userId: { $regex: new RegExp(search, 'i') } }]
          }
        },
        {
          $skip: limit * (page - 1)
        },
        {
          $limit: limit
        }
      ]),
      Transaction.aggregate([
        {
          $match: {
            $or: [{ cost: { $regex: new RegExp(search, 'i') } }, { userId: { $regex: new RegExp(search, 'i') } }]
          }
        },
        {
          $count: 'total'
        }
      ])
    ])

    return { transactions, total: total[0]?.total | 0 }
  }
}

const clientService = new ClientService()
export default clientService
