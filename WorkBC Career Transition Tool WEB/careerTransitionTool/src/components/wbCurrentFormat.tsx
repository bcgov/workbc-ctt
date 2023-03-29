import React, { FunctionComponent } from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

import { CURRENCY_SYMBOL } from '../helpers/config'

const CurrencyFormat: FunctionComponent<NumberFormatProps> = (props) => {
  return <NumberFormat
    //decimalScale={2}
    displayType="text"
    fixedDecimalScale={true}
    prefix={CURRENCY_SYMBOL}
    thousandSeparator={true}
    {...props}
         />
}

export default CurrencyFormat