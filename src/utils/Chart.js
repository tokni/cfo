import React, {
  Fragment,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { Bar } from 'react-chartjs-2'
import CustomizedDialogs from '../Helpers/CustomizedDialogs'

const Chart = props => {
  const inputRef = useRef('chart')
  const [payment, setPayment] = useState([])
  const [income, setIncome] = useState([])
  const [paymentsPerMonth, setPaymentsPerMOnth] = useState({})
  const [incomePerMonth, setIncomePerMOnth] = useState({})

  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false)
  const [item, setItems] = useState(null)
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
        backgroundColor: props.color_payment,
        borderColor: props.color_payment,
        borderCapStyle: props.color_payment,
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        data: payment,
      },
      {
        label: 'Income',
        fill: false,
        lineTension: 0.1,
        backgroundColor: props.color_income,
        borderColor: props.color_income,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        data: income,
      },
    ],
  }

  const handleClose = () => {
    setOpen(false)
    setItems(null)
  }

  const getArray = useCallback((array, type) => {
    let objectArray = [
      { jan: { total: 0, items: [] } },
      { feb: { total: 0, items: [] } },
      { mar: { total: 0, items: [] } },
      { apr: { total: 0, items: [] } },
      { mai: { total: 0, items: [] } },
      { jun: { total: 0, items: [] } },
      { jul: { total: 0, items: [] } },
      { aug: { total: 0, items: [] } },
      { sep: { total: 0, items: [] } },
      { oct: { total: 0, items: [] } },
      { nov: { total: 0, items: [] } },
      { dec: { total: 0, items: [] } },
    ]
    let condition = 0
    let monthsTotal = []

    array.forEach(item => {
      if (item.__typename === 'Transaction') {
        condition = new Date(item.time_stamp).getMonth()
      } else {
        condition = new Date(item.payment_due).getMonth()
      }

      switch (condition) {
        case 0:
          objectArray[0].jan.total += item.payment
          objectArray[0].jan.items.push(item)
          break
        case 1:
          objectArray[1].feb.total += item.payment
          objectArray[1].feb.items.push(item)
          break
        case 2:
          objectArray[2].mar.total += item.payment
          objectArray[2].mar.items.push(item)
          break
        case 3:
          objectArray[3].apr.total += item.payment
          objectArray[3].apr.items.push(item)
          break
        case 4:
          objectArray[4].mai.total += item.payment
          objectArray[4].mai.items.push(item)
          break
        case 5:
          objectArray[5].jun.total += item.payment
          objectArray[5].jun.items.push(item)
          break
        case 6:
          objectArray[6].jul.total += item.payment
          objectArray[6].jul.items.push(item)
          break
        case 7:
          objectArray[7].aug.total += item.payment
          objectArray[7].aug.items.push(item)
          break
        case 8:
          objectArray[8].sep.total += item.payment
          objectArray[8].sep.items.push(item)
          break
        case 9:
          objectArray[9].oct.total += item.payment
          objectArray[9].oct.items.push(item)
          break
        case 10:
          objectArray[10].nov.total += item.payment
          objectArray[10].nov.item.push(item)
          break
        case 11:
          objectArray[11].dec.total += item.payment
          objectArray[11].dec.items.push(item)
          break
        default:
          break
      }
    })
    monthsTotal.push(objectArray[0].jan.total)
    monthsTotal.push(objectArray[1].feb.total)
    monthsTotal.push(objectArray[2].mar.total)
    monthsTotal.push(objectArray[3].apr.total)
    monthsTotal.push(objectArray[4].mai.total)
    monthsTotal.push(objectArray[5].jun.total)
    monthsTotal.push(objectArray[6].jul.total)
    monthsTotal.push(objectArray[7].aug.total)
    monthsTotal.push(objectArray[8].sep.total)
    monthsTotal.push(objectArray[9].oct.total)
    monthsTotal.push(objectArray[10].nov.total)
    monthsTotal.push(objectArray[11].dec.total)

    if (type === 'invoices') {
      setIncome(monthsTotal)
      setIncomePerMOnth(objectArray)
    } else {
      setPayment(monthsTotal)
      setPaymentsPerMOnth(objectArray)
    }
  }, [])

  useEffect(() => {
    getArray(props.bills, 'bills')
    getArray(props.invoices, 'invoices')

    data.current = inputRef
  }, [data, props.invoices, props.bills, getArray])

  return (
    <Fragment>
      {props.invoices && props.bills ? (
        <Bar
          name="kristmund"
          ref={inputRef}
          data={data}
          getElementAtEvent={e => {
            try {
              const type = e[0]._model.datasetLabel === 'Bills' ? 0 : 1 // find the correct type, so that we cann use the correct array
              let money = null
              if (type === 0) {
                money = paymentsPerMonth
              } else {
                money = incomePerMonth
              }
              let items

              switch (e[0]._index) {
                case 0:
                  items = money[e[0]._index].jan.items
                  break
                case 1:
                  items = money[e[0]._index].feb.items
                  break
                case 2:
                  items = money[e[0]._index].mar.items
                  break
                case 3:
                  items = money[e[0]._index].apr.items
                  break
                case 4:
                  items = money[e[0]._index].mai.items
                  break
                case 5:
                  items = money[e[0]._index].jun.items
                  break
                case 6:
                  items = money[e[0]._index].jul.items
                  break
                case 7:
                  items = money[e[0]._index].aug.items
                  break
                case 8:
                  items = money[e[0]._index].sep.items
                  break
                case 9:
                  items = money[e[0]._index].oct.items
                  break
                case 10:
                  items = money[e[0]._index].nov.items
                  break
                case 11:
                  items = money[e[0]._index].nov.items
                  break
                default:
                  break
              }
              setItems(items)
            } catch (e) {
              console.log('error chart', e)
            }
          }}
        />
      ) : null}
      {item ? (
        <CustomizedDialogs items={item} handleClose={handleClose} />
      ) : null}
    </Fragment>
  )
}

export default Chart
