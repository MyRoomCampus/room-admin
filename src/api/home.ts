export interface IHouse {
  key: string
  name: string
  owner: string
  size: number
  updateTime: string
  avatarBg: string
}

interface IGetHouseParam {
  currentPage: number
}

const PAGE_SIZE = 5
const data: IHouse[] = []
for (let i = 0; i < 46; i++) {
  const isSemiDesign = i % 2 === 0
  const randomNumber = (i * 1000) % 199
  data.push({
    key: `${i}`,
    name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi Pro 设计稿${i}.fig`,
    owner: isSemiDesign ? '姜鹏志' : '郝宣',
    size: randomNumber,
    updateTime: '111',
    avatarBg: isSemiDesign ? 'grey' : 'red'
  })
}
export const getHouseRequest = async ({ currentPage }: IGetHouseParam): Promise<IHouse[]> => {
  return await new Promise((resolve) => {
    const dataSource = data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    resolve(dataSource)
  })
}
