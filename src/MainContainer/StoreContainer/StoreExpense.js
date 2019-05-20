import Context from '../../Context/Context'
import { useContext } from 'react'
import { useSubscription } from 'react-apollo-hooks'
import { GET_EXPENSE_SUBSCRIPTION } from '../../utils/Query/ExpenseQuery'

const StoreExpense = () => {
  const [state] = useContext(Context)
  const { data, error } = useSubscription(GET_EXPENSE_SUBSCRIPTION, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  if (error) {
    return error
  }
  return data ? data.Expense : null ? data.Expense : null
}

export default StoreExpense
