const getRandomArbitrary = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min)
}

export default getRandomArbitrary
