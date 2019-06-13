import Context from '../../Context/Context'
import Language from '../../utils/language'
import { useContext } from 'react'

const MenuItems = () => {
  const [state] = useContext(Context)
  let menu = []

  if (!localStorage.getItem('sub')) {
    menu.push(Language['en'].overview)
  } else if (localStorage.getItem('sub') && !state.company) {
    menu.push(Language['en'].overview)
    menu.push(Language['en'].companies)
  } else if (state.company) {
    menu.push(Language['en'].overview)
    menu.push(Language['en'].invoice)
    menu.push(Language['en'].bills)
    menu.push(Language['en'].transactions)
    menu.push(Language['en'].tax)
    menu.push(Language['en'].accounts)
    menu.push(Language['en'].companies)
    menu.push(Language['en'].customers)
    menu.push(Language['en'].products)
    menu.push(Language['en'].daybook)
    menu.push(Language['en'].vendor)
    menu.push(Language['en'].expense)
    menu.push(Language['en'].balancesheet)
    menu.push(Language['en'].balance)


  }
  return menu
}

export { MenuItems }
