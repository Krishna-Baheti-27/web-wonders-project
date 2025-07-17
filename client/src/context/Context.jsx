import { createContext } from 'react'
import { fetchCurrentUser } from '../utils/api.js'

const curr_user = await fetchCurrentUser();
export const DataContext = createContext();
const data = {
  user: curr_user,
}

const Context = ({children}) => {
  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  )
}

export default Context