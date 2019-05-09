import BorderColor from '@material-ui/icons/BorderColor'
import Context from '../../../Context/Context'
import React, { useContext } from 'react'
import Delete from '@material-ui/icons/Delete'
import { GET_PRODUCTS, DELETE_PRODUCT } from '../../../utils/Query/ProductQuery'
import { useSubscription, useMutation } from 'react-apollo-hooks'
import {
  Grid,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@material-ui/core'

const GetProduct = () => {
  const [state] = useContext(Context)
  const deleteProduct = useMutation(DELETE_PRODUCT)
  const { data } = useSubscription(GET_PRODUCTS, {
    suspend: false,
    variables: {
      company_id: state.company.id,
    },
  })

  const deleteHandeler = id => {
    deleteProduct({
      variables: {
        id: id,
      },
    })
  }

  return (
    <Grid container lg={12}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Comapny id</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Del</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ? data.Product.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.company_id}</TableCell>
                    <TableCell>
                      <BorderColor />
                    </TableCell>
                    <TableCell>
                      <Delete onClick={deleteHandeler.bind(this, product.id)} />
                    </TableCell>
                  </TableRow>
                )
              })
            : null}
        </TableBody>
      </Table>
    </Grid>
  )
}

export default GetProduct
