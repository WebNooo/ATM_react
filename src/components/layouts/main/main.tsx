import React, { useCallback, useContext, useEffect, useState } from 'react'
import '../../../assets/styles/app.scss'
import { Button, Icon, Numpad, Text } from '../../ui'
import { Actions, ActionTypes, AppContext } from '../../../reducer'
import { KITS } from '../../../constants'

export const Main: React.FC = () => {
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('')
  const { state, dispatch } = useContext(AppContext)
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    },
    []
  )
  const screens = {
    main: {
      title: 'Снятие наличных',
      component: (
        <>
          <Text
            label={'Введите сумму, которую хотите снять:'}
            value={value}
            onChange={handleChange}
          />
        </>
      )
    },
    help: {
      title: 'Информация о купюрах',
      component: (
        <div className="cash_table">
          <div className="cash_row head">
            <span>Номинал купюр</span> <span>Кол-во</span>
          </div>
          {Object.entries(state?.cash || {}).map((x) => (
            <div key={x[0]} className="cash_row">
              <span>{x[0]}</span> <span>{x[1]}</span>
            </div>
          ))}
        </div>
      )
    }
  }

  type screenType = keyof typeof screens;

  const [screen, setScreen] = useState<screenType>('main')

  useEffect(() => {
    dispatch({
      type: ActionTypes.SET_CASH,
      cash: KITS[0]
    })
  }, [])

  const screenButtonProps = {
    width: 80,
    height: 60,
    margin: 15
  }

  const setInfoMessage = useCallback((message: string) => {
    setMessage(message)
    setTimeout(() => setMessage(''), 2000)
  }, [])

  const handleClickKit = useCallback(
    (index: number) => () => {
      dispatch(Actions.setCash(KITS[index]))
      setInfoMessage('Набор купюр изменен')
    },
    []
  )

  const handleChangeScreen = useCallback(
    (screenName: screenType) => () => {
      setScreen(screenName)
    },
    []
  )

  const handleOk = useCallback(() => {
    console.log('OK')
  }, [])

  const handleCancel = useCallback(() => {
    setValue('')
  }, [])

  const handleNumpadClick = useCallback(
    (valueNumpad: any) => () => {
      setValue(`${value}${valueNumpad}`)
    },
    [value]
  )

  return (
    <div className="container">
      <div className="screen">
        <div className="screen-controls left">
          <Button {...screenButtonProps} onClick={handleClickKit(0)} />
          <Button {...screenButtonProps} onClick={handleClickKit(1)} />
          <Button {...screenButtonProps} onClick={handleClickKit(2)} />
          <Button {...screenButtonProps} onClick={handleChangeScreen('main')} />
        </div>
        <div className="screen-display">
          <div className="screen-display_side left">
            <div className="button-label">Набор 1</div>
            <div className="button-label">Набор 2</div>
            <div className="button-label">Набор 3</div>
            <div className="button-label">Ввод</div>
          </div>

          <div className="screen-display_content">
            <div className="header">{screens[screen].title}</div>
            <div className="body">{screens[screen].component}</div>
            <div className="footer">{message}</div>
          </div>

          <div className="screen-display_side right">
            <div className="button-label">Набор 4</div>
            <div className="button-label">Набор 5</div>
            <div className="button-label">Набор 6</div>
            <div className="button-label">Справка</div>
          </div>
        </div>
        <div className="screen-controls right">
          <Button {...screenButtonProps} onClick={handleClickKit(3)} />
          <Button {...screenButtonProps} onClick={handleClickKit(4)} />
          <Button {...screenButtonProps} onClick={handleClickKit(5)} />
          <Button {...screenButtonProps} onClick={handleChangeScreen('help')} />
        </div>
      </div>

      <div className="controls">
        <Numpad onChange={handleNumpadClick} />
        <div className="controls-action">
          <Button
            onClick={handleOk}
            width={180}
            height={40}
            margin={20}
            style={{
              justifyContent: 'flex-start',
              paddingLeft: 20
            }}
          >
            <Icon name="Ok" color="darkgreen" style={{ marginRight: 10 }} />
            Подтвердить
          </Button>
          <Button
            onClick={handleCancel}
            width={180}
            height={40}
            margin={20}
            style={{
              justifyContent: 'flex-start',
              paddingLeft: 20
            }}
          >
            <Icon name="Close" color="darkred" style={{ marginRight: 10 }} />
            Отмена
          </Button>
        </div>
      </div>
    </div>
  )
}
