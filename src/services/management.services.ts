import mongoose from 'mongoose'
import Transaction from '~/models/schemas/Transaction.schemas'
import User from '~/models/schemas/User.schemas'

class ManagementService {
  async getUserRoleAdmin({ limit, page }: { limit: number; page: number }) {
    const [users, total] = await Promise.all([
      User.aggregate([
        {
          $match: {
            role: 'admin'
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

  async getPerformance({ limit, page, id }: { limit: number; page: number; id: string }) {
    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'affiliatestats',
          localField: '_id',
          foreignField: 'userId',
          as: 'affiliateStats'
        }
      },
      { $unwind: '$affiliateStats' }
    ])

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id: string) => {
        return Transaction.findById(id)
      })
    )
    const filteredSaleTransactions = saleTransactions.filter((transaction) => transaction !== null)

    return { user: userWithStats[0], sales: filteredSaleTransactions }
  }
}

const managementService = new ManagementService()
export default managementService
