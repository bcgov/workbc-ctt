import { Row } from 'antd'
import { RowProps } from 'antd/lib/row'
import React, { FunctionComponent } from 'react'

interface OwnProps {}

type Props = OwnProps & RowProps

const WbRow: FunctionComponent<Props> = ({ children, ...rest }) => {
  return (
    <Row
      gutter={[32, 0]}
      style={{ marginBottom: 16 }}
      {...rest}>
      {children}
    </Row>
  )
}

export default WbRow
