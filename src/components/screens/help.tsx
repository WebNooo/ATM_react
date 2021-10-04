import React, { useContext } from 'react'
import { AppContext } from '../../reducer'

export const Help: React.FC = () => {
  const { state } = useContext(AppContext)
  return (
    <div className="cash_table">
      <div className="cash_row head">
        <span>Номинал купюр</span> <span>Кол-во</span>
      </div>
      {Object.entries(state.banknotes).map(([nominal, amount]) => (
        <div key={nominal} className="cash_row">
          <span>{nominal}</span> <span>{amount}</span>
        </div>
      ))}
    </div>
  )
}
