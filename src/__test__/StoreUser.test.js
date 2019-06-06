import { render } from '../utils/test-utils'
import StoreUser from '../MainContainer/StoreContainer/StoreUser'
import React from 'react'

describe('Store User tests', () => {
  it('5 === 5', async () => {
    expect(5).toBe(5)
  })

  it('later2 ', async () => {
    const res = await render(<StoreUser />)
    console.log(res)
    expect('hey').toEqual('hey')
  })
})
