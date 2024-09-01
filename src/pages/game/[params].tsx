import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { GET_GAME, GET_USER_DATA } from '../../graphql/queries'
import { Game, QueryGameArgs, QueryUserDataArgs, User } from '../../graphql/generated'
import dynamic from 'next/dynamic'

const HiLow = dynamic(() => import('../../components/games/HiLow'), { ssr: false })

interface gameDataType {
  code: string
  image: string
  name: string
  _id: string
}

export default function GamePage() {
  const router = useRouter()

  const { error: gameError, loading: gameLoading, data: gameData } = useQuery<{ game: Game }, QueryGameArgs>(GET_GAME, { variables: { code: String(router.query.code) } })
  const { error: userError, loading: userLoading, data: userData } = useQuery<{ userData: User }, QueryUserDataArgs>(GET_USER_DATA, {
    variables: { token: String(router.query.token) },
  })

  if (gameLoading || userLoading) return 'loading...'
  if (gameError) return 'gameError ' + gameError.message
  if (userError) return 'userError ' + userError.message

  const test: { [key: string]: React.ComponentType<{ token: string; gameData: gameDataType }> } = {
    'DG-HLP': HiLow,
  }

  const Display = !!gameData ? test[gameData.game.code] : null

  return (
    <>
      <div>
        {!!Display && gameData && <Display token={String(router.query.token)} gameData={gameData.game} />}
        <pre>{JSON.stringify(gameData?.game, null, 2)}</pre>
      </div>
      <div>
        <pre>{JSON.stringify(userData?.userData, null, 2)}</pre>
      </div>
    </>
  )
}
