import { DashboradStatType } from '~/models/requests/general.requests'
import OverallStat from '~/models/schemas/OverallStat.schemas'
import Transaction from '~/models/schemas/Transaction.schemas'
import User from '~/models/schemas/User.schemas'

class GeneralService {
  async getUserProfile(id: string) {
    const user = await User.findById(id)

    return user
  }

  async getDashboardStat(payload: DashboradStatType) {
    const { currentYear, currentMonth, currentDay } = payload

    // Recent Transactions
    const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 })

    // Overall Stat
    const overallStat = await OverallStat.find({ year: currentYear })

    const { totalCustomers, yearlySalesTotal, yearlyTotalSoldUnits, monthlyData, salesByCategory, dailyData } =
      overallStat[0]

    const thisMonthStat = overallStat[0].monthlyData.find(({ month }) => month === currentMonth)

    const todayStat = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay
    })

    return {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      dailyData,
      salesByCategory,
      thisMonthStat,
      todayStat,
      transactions
    }
  }
}

const generalService = new GeneralService()
export default generalService
