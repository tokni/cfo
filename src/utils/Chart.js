import React, {
  Fragment,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react'

import { Bar } from 'react-chartjs-2'

const Chart = props => {
  const inputRef = useRef('chart')
  const [payment, setPayment] = useState([])
  const [income, setIncome] = useState([])

  // const outcome = useRef(plotPoint)

  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Bills',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'red',
        borderColor: 'red',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        axisY: {
          valueFormatString: '#,###',
        },

        data: payment,
      },
      {
        label: 'Income',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'blue',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        axisX: {
          valueFormatString: 'DD-MMM',
        },
        axisY: {
          valueFormatString: '#,###',
        },

        data: income,
      },
    ],
  }

  const getArray = useCallback((array, type) => {
    let months = []
    let january = 0
    let feb = 0
    let march = 0
    let apr = 0
    let mai = 0
    let jun = 0
    let jul = 0
    let aug = 0
    let sep = 0
    let oct = 0
    let nov = 0
    let dec = 0
    let condition = 0
    array.forEach(item => {
      if (item.__typename === 'Transaction') {
        condition = new Date(item.time_stamp).getMonth()
      } else {
        condition = new Date(item.payment_due).getMonth()
      }

      switch (condition) {
        case 0:
          january += item.payment
          break
        case 1:
          feb += item.payment
          break
        case 2:
          march += item.payment
          break
        case 3:
          apr += item.payment
          break
        case 4:
          mai += item.payment
          break
        case 5:
          jun += item.payment
          break
        case 6:
          jul += item.payment
          break
        case 7:
          aug += item.payment
          break
        case 8:
          sep += item.payment
          break
        case 9:
          nov += item.payment
          break
        case 10:
          dec += item.payment
          break
        default:
          break
      }
    })
    months.push(january)
    months.push(feb)
    months.push(march)
    months.push(apr)
    months.push(mai)
    months.push(jun)
    months.push(jul)
    months.push(aug)
    months.push(sep)
    months.push(oct)
    months.push(nov)
    months.push(dec)

    if (type === 'invoices') {
      setIncome(months)
    } else {
      setPayment(months)
    }
  }, [])

  useEffect(() => {
    console.log('invoices ', props.invoices)
    getArray(props.invoices, 'invoices')
    getArray(props.bills, 'bills')

    data.current = inputRef
  }, [data, props.invoices, props.bills, getArray])

  return (
    <Fragment>
      {props.invoices && props.bills ? (
        <Bar ref={inputRef} data={data} />
      ) : null}
    </Fragment>
  )
}

export default Chart
