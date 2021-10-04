import { useMessage } from './useMessage'
import { useCallback, useContext } from 'react'
import { Actions, AppContext } from '../reducer'

export const useBanknotes = () => {
  const { state, dispatch } = useContext(AppContext)
  const { setMessage } = useMessage()

  const calculate = useCallback(() => {
    const sum = parseFloat(state.value.replace(',', '.'))

    // Проверяем хватит ли банкнот в банкомате для вывода
    if (sum > state.amountBanknotes) {
      setMessage('Сумма превышает лимит на вывод')
      return
    }

    // Получаем список номиналов в текущем наборе банкнот и сортируем
    // в порядке убывания
    const notesNominal = Object.keys(state.banknotes)
      .map(Number)
      .sort((a, b) => b - a)

    // Получаем банкноту с минимальным номиналом
    const lastBanknote = notesNominal[notesNominal.length - 1]

    // Сверяем сумму для вывода с минимальной банкнотой
    if (sum < lastBanknote) {
      setMessage(`Сумма должна быть больше или ровняться ${lastBanknote}`)
      return
    }

    // Проходимся по всем банкнотам
    const resultCalc = notesNominal.reduce(
      (result, note: number) => {
        // Узнаем кол-во банкнот нужного наминала
        const totalBanknotes: number = state.banknotes?.[note] || 0
        // Узнаем кол-во требуемых банкнот
        const neededBanknotes: number = Math.floor(result.amount / note)

        // Проверяем хватает ли нам банкнот, если нет выдаем все что осталось
        const amountBanknotes =
          totalBanknotes > neededBanknotes ? neededBanknotes : totalBanknotes

        // Вычитаем из суммы номинал банкноты умноженный на кол-во
        result.amount = result.amount - note * amountBanknotes

        // Заполняем объект с требуемыми банкнотами
        // если их требуется хотя бы 1 и более
        if (amountBanknotes > 0) {
          result.banknotes = {
            ...result.banknotes,
            [note]: amountBanknotes
          }
        }

        return result
      },
      {
        banknotes: {},
        amount: sum
      }
    )
    if (state.screen === 'main') {
      dispatch(Actions.updateBanknotes(resultCalc.banknotes))
      dispatch(
        Actions.setCalculateBanknotes({
          banknotes: resultCalc.banknotes,
          amount: sum,
          remainder: resultCalc.amount
        })
      )
    }
  }, [
    state.value,
    state.amountBanknotes,
    state.banknotes,
    state.screen,
    setMessage,
    dispatch
  ])

  return {
    calculate
  }
}
