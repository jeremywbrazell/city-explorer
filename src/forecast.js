import React from 'react';


class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherForecast: [],
      forecastArray: []
    }
  }

  // componentDidMount = async () => {
  //   // for testing purposes
  //   const lat = this.props.forecastArray.lat;
  //   const lon = this.props.forecastArray.lon;
  //   console.log('yep yep yep', lat, lon);


    
 
  // }

  forecastRender() {
    const data = this.props.forecast;
  
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