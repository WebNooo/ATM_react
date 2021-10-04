import React, { useCallback, useContext } from 'react'
import { Button } from '../../../ui'
import { KITS, SCREEN_BUTTON_STYLE } from '../../../../constants'
import { Actions, AppContext } from '../../../../reducer'
import { useMessage } from '../../../../hooks'
import { screenTypes } from '../../../../types'
import { HelpScreen, MainScreen } from '../../../screens'

interface ScreenPropsType {}

export const Screen: React.FC<ScreenPropsType> = () => {
  const { state, dispatch } = useContext(AppContext)
  const { setMessage } = useMessage()

  const SCREENS = {
    main: {
      title: 'Снятие наличных',
      component: <MainScreen />
    },
    help: {
      title: 'Информация о купюрах',
      component: <HelpScreen />
    }
  }

  const handleClickKit = useCallback(
    (index: number) => () => {
      dispatch(Actions.setBanknotes(KITS[index]))
      setMessage('Набор купюр изменен')
    },
    [dispatch, setMessage]
  )

  const handleChangeScreen = useCallback(
    (screenName: screenTypes) => () => {
      dispatch(Actions.setScreen(screenName))
    },
    [dispatch]
  )

  return (
    <div className="screen">
      <div className="screen-controls left">
        <Button {...SCREEN_BUTTON_STYLE} onClick={handleClickKit(0)} />
        <Button {...SCREEN_BUTTON_STYLE} onClick={handleClickKit(1)} />
        <Button {...SCREEN_BUTTON_STYLE} onClick={handleClickKit(2)} />
        <Button {...SCREEN_BUTTON_STYLE} onClick={handleChangeScreen('main')} />
      </div>
      <div className="screen-display">
        <div className="screen-display_side left">
          <div className="button-label">Набор 1</div>
          <div className="button-label">Набор 2</div>
          <div className="button-label">Набор 3</div>
          <div className="button-label">Ввод</div>
        </div>

        <div className="screen-display_content">
          <div className="header">{SCREENS[state.screen].title}</div>
          <div className="body">{SCREENS[state.screen].component}</div>
          <div className="footer">{state.message?.text}</div>
        </div>

        <div className="screen-display_side right">
          <div className="button-label">Набор 4</div>
          <div className="button-label">Набор 5</div>
          <div className="button-label">Набор 6</div>
          <div className="button-label">Справка</div>
        </div>
      </div>
      <div className="screen-controls right">
        <Button {...SCREEN_BUTTON_STYLE} onClick={handleClickKit(3)} />
        <Button {...SCREEN_BUTTON_STYLE} onClick={handleClickKit(4)} />
        <Button {...SCREEN_BUTTON_STYLE} onClick={handleClickKit(5)} />
        <Button {...SCREEN_BUTTON_STYLE} onClick={handleChangeScreen('help')} />
      </div>
    </div>
  )
}
