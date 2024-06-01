import OverallStat from '~/models/schemas/OverallStat.schemas'

class SalesService {
  async getOverallStat() {
    const overallStats = await OverallStat.find()

    return overallStats
  }
}

const salesService = new SalesService()
export default salesService
