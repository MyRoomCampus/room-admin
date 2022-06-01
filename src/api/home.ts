import baseRequest from '.'
export interface IHouse {
  key: string
  name: string
  owner: string
  size: number
  updateTime: string
  avatarBg: string
}

interface IGetHouseParam {
  page: number
  perpage:number
}
const getHouseDataURL='/project'
export const getHouseDataRequest = async (data:IGetHouseParam) => {
  return await baseRequest.get<IGetHouseParam>(getHouseDataURL, data)
}

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
