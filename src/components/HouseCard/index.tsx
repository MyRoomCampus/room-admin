import AppContext from '@//store'
import React, { CSSProperties, useContext } from 'react'
import styles from './index.module.less'

type HouseCardProps = {
  style: CSSProperties
}
const getCount = (count: number) => {
  if (count < 0) {
    return
  }
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万'
  } else {
    return Math.floor(count / 10000000) / 10 + '亿'
  }
}
const HouseCard: React.FC<HouseCardProps> = (props) => {
  const { store } = useContext(AppContext)
  const { lowCodeInfo } = store
  const cardData = lowCodeInfo && lowCodeInfo.houseCardData
  const { style } = props
  return cardData ? (
    <div className={styles['card-container']} style={style}>
      <img src={cardData.image} alt="加载失败" />
      <div className={styles['content-container']}>
        <div className={styles.title}>{cardData.listingName}</div>
        <div className={styles.area}>
          {cardData.cityName} | {cardData.neighborhoodName} |{cardData.squaremeter / 100}m²
        </div>
        <div className={styles.tags}>
          {cardData.tags.map((v, index) => {
            return (
              <div className={styles['tags-item']} key={index}>
                {v}
              </div>
            )
          })}
        </div>
        <div className={styles.price}>
          {getCount(cardData.pricing / 100)}
          <span className={styles['unit-price']}>{(cardData.pricing / cardData.squaremeter).toFixed(2)}元/平</span>
        </div>
      </div>
    </div>
  ) : null
}

export default HouseCard
