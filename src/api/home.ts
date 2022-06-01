import baseRequest from '.'
interface IHouseInfoDataOfUserField{
  houseId:string
  listingName:string
}
interface IHouseInfoOfUser{
  msg:string
  data:IHouseInfoDataOfUserField[]
}

interface IHouseInfoDataOfHouseField{
  id: number,
  listingName: string,
  firstUploadAt: Date,
  pricing: number,
  squaremeter: number,
  downpayment: number|null,
  floor: number|null,
  totalFloor: number|null,
  dictHouseId: number|null,
  roomStructure: number|null,
  ladderRation: number|null,
  heatingType: number|null,
  houseDuration: number|null,
  propertyRight: number|null,
  mortgage: number|null,
  usageArea: number|null,
  floorLevel: number|null,
  facingType: number|null,
  decorationType: number|null,
  buildingType: number|null,
  builtYear: string,
  cityName: string,
  cityCode: string,
  neighborhoodName: string,
  neighborhoodSourceCode: string,
  floorPlanRoom: number|null,
  floorPlanHall: number|null,
  floorPlanBath: number|null,
  floorPlanKitchen: number|null,
  houseType: number|null,
  layoutType: number,
  lastPublishTime: Date,
  ownership: number|null,
  rightProperty: string,
  propertyManagementType: number|null,
  elevator: number|null,
  houseStatus: number,
  onlineHouseStatus: number|null,
  createdAt: Date,
  updatedAt: Date,
  dataSourceId: number,
  offlineCode: string,
  sourceCode: string,
  startVersion: number,
  lastVersion: number,
  crawlId: number,
  taskId: number|null,
  houseCard: string,
  onlineNeighborhoodId: number,
  onlineCityId: number,
  onlineDistrictId: number,
  onlineAreaId: number,
  propertyOnly: number|null,
  propertyCertificatePeriod: number|null
}

export interface IHouseDataOfHouse{
  msg:string
  data:IHouseInfoDataOfHouseField
}
const getHouseDataURL={
  getAllHouseInfoOfUser:'/house/own'
}
class HouseApi {
  static async GetAllHouseInfoOfUserRequest() {
    return await baseRequest.get<IHouseInfoOfUser>(getHouseDataURL.getAllHouseInfoOfUser)
  }
}

export default HouseApi

// const data = 
// for (let i = 0; i < 46; i++) {
//   const isSemiDesign = i % 2 === 0
//   const randomNumber = (i * 1000) % 199
//   data.push({
//     key: `${i}`,
//     name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi Pro 设计稿${i}.fig`,
//     owner: isSemiDesign ? '姜鹏志' : '郝宣',
//     size: randomNumber,
//     updateTime: '111',
//     avatarBg: isSemiDesign ? 'grey' : 'red'
//   })
// }
// export const getHouseRequest = async ({ page,perpage }: IGetHouseParam): Promise<IHouse[]> => {
//   return await new Promise((resolve) => {
//     const dataSource = data.slice((page - 1) * perpage, page * perpage)
//     resolve(dataSource)
//   })
// }
