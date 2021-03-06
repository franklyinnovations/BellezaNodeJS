import React from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination/Pagination'
import { connect } from 'react-redux'
import { getClients, resetClients } from 'actions/clients'
import queryString from 'query-string'
import Loader from 'components/Loader/Loader'


@connect(store => {
	return {
		clients: store.clients,
		user: store.user
	}
})
export default class UsersIndex extends React.Component {
	constructor(props){
		super(props)
		this.state = {page: 0, prePage: 20}

		this.handleUrlChanged = this.handleUrlChanged.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.handleError = this.handleError.bind(this)
		this.unlisten = null
	}

	componentDidMount() {
		this.handleUrlChanged(this.props.history.location)
		this.unlisten = this.props.history.listen(this.handleUrlChanged)
	}

	componentWillUnmount() {
		this.unlisten()
		this.props.dispatch(resetClients())
	}

	handleUrlChanged(location) {
		if(this.props.match.url === location.pathname){
			const parse = queryString.parse(location.search)

			this.props.dispatch(getClients(parse.query, parse.page, this.props.user.get('token')))
				.then()
				.catch(this.handleError)
		}
	}

	handlePageClick(index, event){
		this.setState({page: index})
	}

	handleSearch(event) {
		event.preventDefault()
		let input = event.target.elements['query']
		let search = input.value ? `?query=${input.value}&page=0&sort=0` : '?page=0&sort=0'

		this.props.history.push({
			pathname: '/backoffice/users',
			search: search
		})
	}

	handleError(response) {

	}

	render () {
		const {
			clients,
			match,
			history
		} = this.props

		const userList = clients.get('rows').map( (client, index) =>
			<UserItem
				client={client}
				key={index}/>
		)

		const parse = queryString.parse(history.location.search)
		const links = []
		for(let i = 0; i < Math.ceil(clients.get('count')/this.state.prePage); i++ ){
			if(parse.query){
				links.push({value: `${match.url}?query=${parse.query}&page=${i}`, name: i+1})
			}else{
				links.push({value: `${match.url}?page=${i}`, name: i+1})
			}
		}

		return (
			<div>
				<Loader>
					<table className='backoffice-table'>
						<thead>
							<tr>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Email</th>
								<th>Total Amount</th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</thead>

						<tbody>
							{userList}
						</tbody>

						<tfoot>
							<tr>
								<td colSpan='7'>
									<Pagination
										links={links}
										page={this.state.page}
										onRequestClick={this.handlePageClick}/>
								</td>
							</tr>
						</tfoot>
					</table>
				</Loader>

			</div>
		)
	}
}


const UserItem = props => (
	<tr>
		<td>{props.client.get('first_name')}</td>
		<td>{props.client.get('last_name')}</td>
		<td>{props.client.get('email')}</td>
		<td>${props.client.get('amount')}</td>
		<td>
			<Link  to={`/user/${props.client.get('id')}/orders`}>Pedidos</Link>
		</td>
		<td>
			<Link  to={`/backoffice/user/${props.client.get('id')}/codes/new`}>Give Discount</Link>
		</td>
		<td>
			<Link  to={`/user/${props.client.get('id')}/codes`}>Show Discounts</Link>
		</td>
	</tr>
)
