import React, { useCallback, useContext } from 'react'
import { Icon } from '../../../ui'
import { Actions, AppContext } from '../../../../reducer'
import { useBanknotes } from '../../../../hooks/useBanknotes'
import { Numpad } from '../index'
import { PanelButton } from './panel-button'

export const Panel: React.FC = () => {
  const { dispatch } = useContext(AppContext)
  const { calculate } = useBanknotes()

  const handleOk = useCallback(() => {
    calculate()
  }, [calculate])

  const handleClear = useCallback(() => {
    dispatch(Actions.setValue('0'))
    dispatch(Actions.setCalculateBanknotes({}))
  }, [dispatch])

  return (
    <div className="controls">
      <Numpad />
      <div className="controls-action">
        <PanelButton onClick={handleOk}>
          <Icon name="Ok" color="darkgreen" style={{ marginRight: 10 }} />
          Вывод
        </PanelButton>

        <PanelButton onClick={handleClear}>
          <Icon name="Close" color="darkred" style={{ marginRight: 10 }} />
          Очистить
        </PanelButton>
      </div>
    </div>
  )
}
