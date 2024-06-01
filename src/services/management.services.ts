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
}

const managementService = new ManagementService()
export default managementService
