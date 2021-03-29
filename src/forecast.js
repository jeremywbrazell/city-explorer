import React from 'react';
import axios from 'axios';

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherForecast: []
    }
  }

  componentDidMount = async () => {
    // for testing purposes
    const lat = this.props.location.lat;
    const lon = this.props.location.lon;
    console.log('soiboisbois;b', lat, lon);


    // LOCAL SERVER
    const SERVER = process.env.REACT_APP_LOCAL_SERVER;
    // const forecast = await axios.get(`${process.env.REACT_APP_LOCAL_SERVER}/weather?city_name=${this.state.searchQuery}`);
    
    // HEROKU SERVER
    // const SERVER = process.env.REACT_APP_BACKEND;
    const weather = await axios.get(`${SERVER}/weather?lat=${lat}&lon=${lon}`);
 console.log(weather);
    const forecastArray = weather.data;
    this.setState({ weatherForecast: forecastArray });
 
  }

  forecastRender() {
    const data = this.state.weatherForecast;
  
    return (<ul>{data.map((item, index) => <li key={index}>{item.date}: {item.description}</li>)}</ul>)
  }

  render() {
    return (
      <>
        <h2>Weather</h2>
        {this.forecastRender()}
      </>

    )
  }
}

export default Forecast;