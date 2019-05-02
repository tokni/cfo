import React, { useContext } from 'react'
import Context from '../../Context/Context'
import { useQuery } from 'react-apollo-hooks'
import { GET_COMPANY } from '../../utils/query'
const Home = () => {
  const { data } = useQuery(GET_COMPANY, {
    suspend: false,
  })

  const [state, dispatch] = useContext(Context)

  const companiesLoader = () => {
    dispatch({
      type: 'change_company',
      companies: data.Company,
    })
  }

  const companyHandler = () => {
    dispatch({
      type: 'set_company',
      index: 0,
    })
  }

  return (
    <header>
      {console.log(data)}

      <div>
        <h1>
          {/* {localStorage.getItem("accessToken")
            ? localStorage.getItem("accessToken")
            : "tú"} */}
        </h1>
        <p>Bergur & Kristmund</p>
        <p>current company: {state.company ? state.company.user_id + " " + state.company.name : console.log("error")}</p>

        <button onClick={companiesLoader}>button</button>
        <button onClick={companyHandler}>get company</button>

        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">user id</th>
              <th scope="col">company name</th>
            </tr>
          </thead>
          <tbody>
            {state.companies ? state.companies.map((item, key) => {
              return (
                <tr key={key}>
                  <th>{item.user_id}</th>

                  <td>{item.name}</td>
                </tr>
              )
            }) : console.log("error") }
          </tbody>
        </table>
      </div>
    </header>
  )
}

export default Home
