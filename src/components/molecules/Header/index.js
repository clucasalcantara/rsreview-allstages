import React from 'react'
import PropTypes from 'prop-types'
// Components
import { Filters } from '../../organisms'
// Styles
import './Header.css'

const Header = ({ title, filters, onChangeFilter }) => (
  <header className="header">
    <h1 className="title">{title}</h1>
    <Filters {...filters} onChangeFilter={onChangeFilter} />
  </header>
)

Header.propTypes = {
  Filters: PropTypes.object,
}

Header.defaultProps = {
  filters: {},
}

export default Header
