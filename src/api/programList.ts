import baseRequest from '.'
interface IProgramListParam {
  projectId?:number
  projectName:string|null
  createdAt:string
  data:object
}

const PROGRAMLIST_URL = {
  addProgram: '/project'
}

class ProgramListApi {
  static async AddProgramRequest(data: IProgramListParam) {
    return await baseRequest.post<IProgramListParam>(PROGRAMLIST_URL.addProgram, data)
  }
}

export default ProgramListApi
