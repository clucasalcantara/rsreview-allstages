import React, { Component } from 'react'
// Styles
import './RestaurantCard.css'
// Utils
import { weekdays } from '../../../utils/weekdays'

class RestaurantCard extends Component {
  state = {
    isFavorite: false,
  }

  componentDidMount = () => {
    const { restaurant } = this.props
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    const isFavorite = (favorites || []).filter(favorite => favorite === restaurant.id).length > 0
    
    this.setState({ isFavorite })
  }

  componentDidUpdate = () => {
    const { mode } = this.state
    
    if (mode && mode === 'review') {
      alert('TO REVIEW')
    }
  }
  
  render () {
    const { restaurant } = this.props
    const { isFavorite } = this.state
    const today = new Date().getDay()
    const weekday = weekdays[today]
    const todaySchedule = restaurant.operating_hours[weekday]
    const method = () => isFavorite ? 'remove' : 'add'
    const imgID = restaurant.photograph || restaurant.id

    return (
      <div className="restaurant-detail">
        <img className="restaurant--image" alt="restaurant pic" src={`/assets/imgs/${imgID}.jpg`} />
        <div className="restaurant-info">
          <p className="restaurant--name">{restaurant.name} - Cuisine: {restaurant.cuisine_type}</p>
          <p className="restaurant--address"><b>Address: </b>{restaurant.address}</p>
          <p className="restaurant--dailyschedule">
            <b>Working hours:</b> {todaySchedule}
          </p>
          <div className="restaurant--review">
            <button onClick={() => this._restaurantReview(restaurant)}>
              Restaurant Reviews
            </button>
          </div>
        </div>
        <button className={`buttton ${isFavorite ? 'isFavorite' : 'toFavorite'}`} onClick={() => this._favoriteRestaurant(restaurant.id, method())}>
            {!isFavorite ? 'Set as favorite' : 'Remove from favorites'}
          </button>
      </div>
    )
  }

  _restaurantReview = () => this.setState({ mode: 'review' })

  _favoriteRestaurant = (id, method) => {
    const { handleFavorites } = this.props
    const { isFavorite } = this.state
    
    this.setState({ isFavorite: !isFavorite })

    return handleFavorites(id, method)
  }
}

export default RestaurantCard
