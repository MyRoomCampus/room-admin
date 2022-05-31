import baseRequest from '.'
interface IProgramListParam {
  name: string
}

const PROGRAMLIST_URL = {
  addProgram: '/project'
}

class ProgramListApi {
  static async AddProgramRequest(accessToken: string, data: IProgramListParam) {
    return await baseRequest.post<{
      accessToken: string
      refreshToken?: string
    }>(PROGRAMLIST_URL.addProgram, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default ProgramListApi
