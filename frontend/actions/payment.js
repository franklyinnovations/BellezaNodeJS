import * as types from 'actions/types'
import axios from "axios"

export const cashPayment = (formData) => {
  return {
    type: types.CASH_PAYMENT,
    payload: axios.post('/payment/cash', formData)
  }
}

export const cardPayment = (formData) => {
  return {
    type: types.CARD_PAYMENT,
    payload: axios.post('/payment/card', formData)
  }
}
