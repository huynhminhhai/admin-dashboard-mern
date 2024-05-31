import Product from '~/models/schemas/Product.schemas'

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
}

const clientService = new ClientService()
export default clientService
