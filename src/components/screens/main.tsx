import React, { useContext } from 'react'
import { Text } from '../ui'
import { AppContext } from '../../reducer'

export const Main: React.FC = () => {
  const { state } = useContext(AppContext)

  console.log(state.calculateBanknotes)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {state.calculateBanknotes.banknotes && (
        <>
          <div className="cash_table">
            <div className="cash_row head">
              <span>Банкнота</span>
              <span>Вывод</span>
              <span>Остаток</span>
            </div>

            {Object.entries(state?.calculateBanknotes?.banknotes || {}).map(
              ([nominal, amount]) => (
                <div key={nominal} className="cash_row">
                  <span style={{ width: 50 }}>{nominal}</span>
                  <span
                    style={{
                      width: 50,
                      textAlign: 'center'
                    }}
                  >
                    {amount}
                  </span>
                  <span
                    style={{
                      width: 50,
                      textAlign: 'right'
                    }}
                  >
                    {state.banknotes[+nominal]}
                  </span>
                </div>
              )
            )}
          </div>

          <div
            style={{
              justifyContent: 'space-between',
              fontSize: 14,
              marginTop: 10,
              display: 'flex'
            }}
          >
            <span>Сумма: {state?.calculateBanknotes?.amount || 0}</span>
            <span>
              Не выплачено: {state?.calculateBanknotes?.remainder || 0}
            </span>
          </div>
        </>
      )}

      <Text
        styleLabel={{ marginTop: 20 }}
        label={'Введите сумму, которую хотите снять:'}
        value={state.value}
        readonly={true}
      />
    </div>
  )
}
