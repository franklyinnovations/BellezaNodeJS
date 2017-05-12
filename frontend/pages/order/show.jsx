import React, { PropTypes } from 'react'
import OrderTable from 'components/OrderTable/OrderTable'
import { Address } from 'pages/checkout/confirmation'


const ord = {}

class OrderShow extends React.Component {
  render () {

    return (
      <main>
        <h2 style={{color: '#1eab30'}}>Status: Pago</h2>
        <h4 className="sub-text">Referencia #{ord.id}</h4>
        <div className="grid">
          <div className="col-9">
            <OrderTable editable={false} size="sm"/>
          </div>


          <div className="col-3">
            <Address {...ord.shippedTo} title="Dirección de Envío"/>
            <Address {...ord.invoiceTo} title="Facturacion"/>
          </div>
        </div>
      </main>
    )
  }
}

export default OrderShow;
