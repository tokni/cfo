import { useState } from 'react'

export const useForm = initialState => {
  const [values, setValue] = useState(initialState)

  return [
    values,
    e => {
      setValue({
        ...values,
        [e.target.name]: e.target.value,
      })
    },
  ]
}
