import React from 'react';
import axios from 'axios';

class Forecast extends React.Component {
  constructor(props){
    super(props);
    this.state={
      weatherForecast: []
    }
  }

  componentDidMount = async() => {
    console.log('component did mount');
    const SERVER = 'http://localhost:3001';
    const weather = await axios.get(`${SERVER}/weather`);
    console.log(weather);
    const weatherListArray = weather.data.weather;
    const cityData = weather.data.city;
    // console.log({weatherListArray});
    this.setState({ city: cityData });
    this.setState({ weatherForecast: weatherListArray.weather})
    console.log(weather.data.weather);
  }

  forecastRender() {
    const data = this.state.weatherForecast;
    console.log('xxxxxx', data);
      return (<ul>{data.map(item => <li>{item.date}: {item.description}</li>)}</ul>)
  }

  render() {
    return(
      <>
        <h2>Weather</h2>
        {this.forecastRender()}
      </>

    )
  }
}

export default Forecast;