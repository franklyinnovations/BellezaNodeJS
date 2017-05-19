import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Pagination from 'components/Pagination/Pagination'
import dateOptions from 'utils/date'
import queryString from 'query-string'
import { getBanners, resetBanners } from 'actions/others'




/**
* HTTP - GET
* @param {array} banners - An array of banners
*
* LOCAL - POST (on unmount)
* @param {array} reset - An empty array to banners array
*/

@connect(store => {
  return {
    banners: store.others.get('banners'),
    user: store.user
  }
})
class BannersIndex extends React.Component {
  constructor(props){
    super(props)
    this.state = {page: 0, prePage: 20}

    this.handleUrlChanged = this.handleUrlChanged.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
    this.handleError = this.handleError.bind(this)
    this.unlisten = null
  }

  componentDidMount() {
    this.handleUrlChanged(this.props.history.location, this.props.history.action)
    this.unlisten = this.props.history.listen(this.handleUrlChanged)
  }

  componentWillUnmount() {
    this.unlisten()
    this.props.dispatch(resetBanners())
  }

  handleUrlChanged(location, action) {
    if(this.props.match.url === location.pathname){
      const parse = queryString.parse(location.search)

      this.props.dispatch(getBanners(parse.page))
      .then()
      .catch(this.handleError)
    }
  }

  handlePageClick(index, event){
    this.setState({page: index})
  }

  handleError(response) {

  }

  render () {
    const {
      banners,
      user,
      match,
      history
    } = this.props

    const bannerList = banners.get('results').map( (banner, index) =>
      <BannerItem key={index} banner={banner} />
    )

    const parse = queryString.parse(history.location.search)
    const links = []
    for(let i = 0; i < Math.ceil(banners.get('total')/this.state.prePage); i++ ){
      links.push({value: `${match.url}?page=${i}`, name: i+1})
    }

    return (
      <div>
        <div className="protop">
          <Link to ="/backoffice/banners/new" className="secondary-button">Add Banner</Link>
        </div>

        <table className="backoffice-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Link To</th>
              <th>Active</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {bannerList}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="6">
                <Pagination
                  links={links}
                  page={this.state.page}
                  onRequestClick={this.handlePageClick}/>
              </td>
            </tr>
          </tfoot>
        </table>

      </div>
    )
  }
}

export default BannersIndex;


const BannerItem = props => (
  <tr>
    <td>
      <img className="banner-sm" src={props.img}/>
    </td>
    <td>
      <Link to={props.link}>Link</Link>
    </td>
    <td>{props.active ? "Yes": "No"}</td>
    <td>{props.start.toLocaleString('en-us', dateOptions)}</td>
    <td>{props.end.toLocaleString('en-us', dateOptions)}</td>
    <td>
      <Link to='/backoffice/banners/edit'>Update</Link>
    </td>
  </tr>
)
