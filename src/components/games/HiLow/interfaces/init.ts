import { CardType, ChipType, OptionType } from './option'

export interface gameDataType {
  code: string
  image: string
  name: string
  _id: string
}

export interface PassingDataType {
  token: string
  gameData: gameDataType
}

export const optionHiLowPoker: OptionType[] = [
  { key: 'optionHi', value: 0, text: 'สูง' },
  { key: 'optionLow', value: 1, text: 'ต่ำ' },
]

export const cardOptionPoker: CardType[] = [
  { key: 'spades', value: 'spades' },
  { key: 'diamonds', value: 'diamonds' },
  { key: 'hearts', value: 'hearts' },
  { key: 'clubs', value: 'clubs' },
]

export const chipOptionPoker: ChipType[] = [
  {
    text: '10',
    price: 10,
  },
  {
    text: '50',
    price: 50,
  },
  {
    text: '100',
    price: 100,
  },
  {
    text: '150',
    price: 150,
  },
]
