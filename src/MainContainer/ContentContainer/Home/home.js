import React, { useContext } from 'react'
import Context from '../../../Context/Context'

const Home = () => {
  const [state, dispatch] = useContext(Context)

  const handler = () => {
    dispatch({
      type: 'change_company',
      name: 'Torkil',
    })
  }

  return (
    <header>
      <div>
        <h1>
          Hello mr.{state.name}
          {localStorage.getItem('accessToken')
            ? localStorage.getItem('accessToken')
            : 'tú'}
        </h1>
        <p>Bergur & Kristmund</p>

        <button onClick={handler}>button</button>
      </div>
    </header>
  )
}

export default Home
