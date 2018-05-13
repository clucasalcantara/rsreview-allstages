import React, { Component } from 'react';
import Modal from 'react-modal'
// Components
import { Header, Footer, RestaurantCard } from '../../molecules'
import { MapComponent } from '../../organisms'
// Styles
import './Home.css';

//Services
import { getData } from '../../../services/api'

const customStyles = {
  content : {
    padding: '.5rem',
    minHeight: '70%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class Home extends Component {
  state = {
    restaurants: [],
    neighborhood: 'all',
    cuisine: 'all',
    isOpen: false,
    selected: undefined,
  }

  componentDidMount = async  () => {
    const restaurants = await getData('restaurants')

    this.setState({
      restaurants,
      neighborhoods: [...new Set(restaurants.map(restaurant => restaurant.neighborhood))],
      cuisines: [...new Set(restaurants.map(restaurant => restaurant.cuisine_type))],
    })

    Modal.setAppElement('#root')
  }

  componentWillUpdate = async (nextProps, nextState) => {
    const { selected = {} } = nextState
    let detailData = {}
    
    if (selected.length > 0 && (selected.id !== this.state.selected.id)) {
      detailData = await getData(`restaurants/${selected.id}`)

      this.setState({ selected: detailData })
    }
  }

  render() {
    const {
      neighborhoods,
      cuisines,
      restaurants,
      cuisine,
      neighborhood,
      selected,
      isOpen,
    } = this.state

    return (
      <div className="App">
        <Header
          title="Restaurant Reviews App"
          filters={{ neighborhoods, cuisines }}
          onChangeFilter={ this._handleFilters }
        />
        <Modal
          isOpen={isOpen}
          onRequestClose={this._closeModal}
          style={customStyles}
          overlayClassName="Overlay"
        >
          {selected &&
            <RestaurantCard
              className="restaurant--card"
              restaurant={selected}
              handleFavorites={ this._handleFavorites } 
            />
          }
        </Modal>
        <MapComponent
          filters={{ neighborhood, cuisine }}
          restaurants={ restaurants }
          showDetails={ this._handleShowRestaurant }
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <div className="app-intro">
          Application to evaluate myself as Udacity Reviewer for Nanodegree program
        </div>
        <Footer />
      </div>
    );
  }

  _handleFilters = (key, value) => this.setState({ [key]: value })

  _handleShowRestaurant = (restaurant) => this.setState({
    isOpen: !this.state.isOpen,
    selected: restaurant
  })

  _closeModal = () => this.setState({ isOpen: false })
  
  _handleFavorites = async (restaurant, method) => {
    const favorites = await localStorage.getItem('favorites')
    await localStorage.clear()
    
    let ids = JSON.parse(favorites) || []

    if (method === 'remove') {
      delete ids[ids.indexOf(restaurant)]
      ids = ids.filter(id => id) || []
    }

    if (ids && method === 'add' && !ids.includes(restaurant)) {  
      ids.push(restaurant)
      ids = [...new Set(ids)]
    }

    return localStorage.setItem('favorites', JSON.stringify(ids))
  }
}

export default Home;
