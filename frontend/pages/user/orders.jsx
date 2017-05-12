import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import OrderItem from 'components/OrderItem/OrderItem'
import Pagination from 'components/Pagination/Pagination'


const ord = {}
const links = [];
for (var i = 0; i < 12; i++) links.push({value: "#", name: i+1})

export default class UserOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {page: 0}
  }

  render () {

    const orderList = ord.map( (order, index) =>
      <OrderItem key={index} {...order}/>
    )


    return (
      <section className="col-9">
        <h2>
          Mis Pedidos
          <Link to="#" className="sub-text light" style={{float: 'right'}}>Salir</Link>
        </h2>

        {orderList}
        <Pagination
          links={links}
          page={this.state.page}
          onRequestClick={this.handlePageClick}/>
      </section>
    )
  }
}
