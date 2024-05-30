import User from '~/models/schemas/User.schemas'

class GeneralService {
  async getUserProfile(id: string) {
    const user = await User.findById(id)

    return user
  }
}

const generalService = new GeneralService()
export default generalService
