import baseRequest from '.'
interface IProgramListParam {
  name: string
}

const PROGRAMLIST_URL = {
  addProgram: '/project'
}

class ProgramListApi {
  static async AddProgramRequest(data: IProgramListParam) {
    return await baseRequest.post<unknown>(PROGRAMLIST_URL.addProgram, data)
  }
}

export default ProgramListApi
