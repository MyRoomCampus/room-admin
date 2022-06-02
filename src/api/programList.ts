import baseRequest from '.'
interface IAddProgramParam {
  houseId:number
  name:string
  data:string|null
}

interface IProgramListParam{
  page:number
  perpage:number
}

interface IProgramInfoDataField{
  houseId:string,
  name:string,
  createdAt:string
}

interface IProgramInfoData{
  data:IProgramInfoDataField[],
  count:number
}
export interface IProgramInfo{
  msg:string
  data:IProgramInfoData
}
const PROGRAMLIST_URL = {
  addProgram: '/project',
  getAllProjectOfUser:'/project'
}

class ProgramListApi {
  static async AddProgramRequest(data: IAddProgramParam) {
    return await baseRequest.postJson<IAddProgramParam>(PROGRAMLIST_URL.addProgram, data)
  }

  static async GetAllProgramOfUserRequest(data: IProgramListParam) {
    return await baseRequest.get<IProgramInfo>(PROGRAMLIST_URL.getAllProjectOfUser, data)
  }
}

export default ProgramListApi
