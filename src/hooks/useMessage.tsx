import { Actions, AppContext } from '../reducer'
import { useCallback, useContext } from 'react'

export const useMessage = () => {
  const { state, dispatch } = useContext(AppContext)
  const setMessage = useCallback(
    (text: string) => {
      if (state.message?.timeout) {
        clearTimeout(state.message.timeout)
      }

      dispatch(
        Actions.setMessage({
          text,
          timeout: setTimeout(
            () => dispatch(Actions.setMessage({})),
            3000
          ) as unknown as number
        })
      )
    },
    [state.message]
  )

  return { setMessage }
}
