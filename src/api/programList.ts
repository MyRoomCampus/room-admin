import baseRequest from '.'
interface IhandleProgramParam {
  houseId: number
  name?: string
  data?: string | null
}

interface IProgramListParam {
  page: number
  perpage: number
}

export interface IProgramInfoDataField {
  houseId: number
  name: string
  isPublished: boolean
  updateTime: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

interface IProgramInfoData {
  data: IProgramInfoDataField[]
  count: number
}
interface IAllProgramInfo {
  msg: string
  data: IProgramInfoData
}
export interface IAProgramInfo {
  msg: string
  data: IProgramInfoDataField
}

export interface IUpadateProgrameParam {
  name: string
  houseId: number
  data: string
}
const PROGRAMLIST_URL = {
  addProgram: '/project',
  getAllProjectOfUser: '/project',
  updateProgramInfo: '/project'
}

class ProgramListApi {
  static async AddProgramRequest(data: IhandleProgramParam) {
    return await baseRequest.postJson<IhandleProgramParam>(PROGRAMLIST_URL.addProgram, data)
  }

  static async GetAllProgramOfUserRequest(data: IProgramListParam) {
    return await baseRequest.get<IAllProgramInfo>(PROGRAMLIST_URL.getAllProjectOfUser, data)
  }

  static async UpdateOneProgram(data: IUpadateProgrameParam) {
    return await baseRequest.put(PROGRAMLIST_URL.updateProgramInfo, data, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export default ProgramListApi
