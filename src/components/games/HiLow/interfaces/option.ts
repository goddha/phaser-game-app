export interface OptionType {
  key: string
  value: 0 | 1
  text: string
}

export interface CardType {
  key: string
  value: 'spades' | 'diamonds' | 'hearts' | 'clubs'
}

export interface ChipType {
  text: string
  price: number
}
