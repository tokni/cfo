import Context from '../../../Context/Context'
import React, { useContext, Fragment } from 'react'
import SnackBar from '../SnackBar/SnackBar'
import { useSubscription } from 'react-apollo-hooks'
import { GET_DAY_BOOK } from '../../../utils/Query/DaybookQuery'
import TableHelper from '../../../Helpers/TableHelper';

const DayBook = () => {
  const [state] = useContext(Context)

  const { data, error } = useSubscription(GET_DAY_BOOK, {
    suspend: false,
    variables: {
      company_id: state.company ? state.company.id : null,
    },
  })

  if (error) {
    return <SnackBar message={'Error loading day book'} state={'error'} />
  }

  return (

    <Fragment>
      {data ? <TableHelper array={data.day_book} /> : null}
    </Fragment>
  )
}

export default DayBook
