import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
//Styles
import './Filters.css'

class Filters extends Component {
  static propsTypes = {
    cuisines: PropTypes.array,
    neighborhoods: PropTypes.array,
    onChangeFilter: PropTypes.func.isRequired,
  }

  static defaultProps = {
    cuisines: [],
    neighborhoods: [],
  }

  state = {
    cousine: 'all',
    neighborhood: 'all',
  }

  render() {
    const { cuisines, neighborhoods } = this.props

    return(
      <Fragment>
        <h3 className="filters-title">Filter restaurants </h3>
        <div className="filters">
          <div className="cuisines">
            <label htmlFor="cuisines">Cuisines: </label>
            <select onChange={ this._handleCuisineChange } name="cuisines">
              <option value="all">All cuisines</option>
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
          </div>
          <div className="neighborhoods">
            <label htmlFor="neighborhoods">Neighborhoods: </label>
            <select onChange={this._handleNeighborhoodChange } name="neighborhoods">
              <option value="all">All neighborhoods</option>
              {neighborhoods.map(neighborhood => (
                <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
              ))}
            </select>
          </div>
        </div>
      </Fragment>
    )
  }

  _handleCuisineChange = (ev) => {
    const value = ev.target.value
    const { onChangeFilter } = this.props

    onChangeFilter('cuisine', value)
  }
  
  _handleNeighborhoodChange = (ev) => {
    const value = ev.target.value
    const { onChangeFilter } = this.props
    
    onChangeFilter('neighborhood', value)
  }
}

export default Filters