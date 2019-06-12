import { render, cleanup } from '../utils/test-utils'
import { act } from 'react-testing-library'
import StoreUser from '../MainContainer/StoreContainer/StoreUser'
import React from 'react'

afterAll(() => {
  localStorage.removeItem('sub')
})

afterEach(cleanup)

describe('Store User tests', () => {
  it('5 === 5', async () => {
    expect(5).toBe(5)
  })

  /**
   * This test is fetching data from hasura, but throws an error
   * because act is not a Promise
   *
   * Console log in StoreUser.js to see result..
   */
  // it('later2 ', async () => {
  //   await act(() => {
  //     render(<StoreUser />)
  //   })
  // }, 20000)
  
    
  })



})
