import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from './map.js';
import Error from './error.js';
import Forecast from './forecast';
import Movies from './movies';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      searchQuery: '',
      imgSrc: '',
      displayResults: false,
      displayError: null,
      error: {},
      forecast: [],
      movieArray: []
    }

  }
handleAllClicks = async (e) => {
e.preventDefault();
await this.getLocationInfo()
.then(() => {
  this.getWeather()
  this.getMovies()
})
}
  getLocationInfo = async () => {
    try {
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MAP_KEY}&q=${this.state.searchQuery}&format=json`;
      const location = await axios.get(url);
      const locationArray = location.data;

      this.setState({
        location: locationArray[0],
        displayResults: true,
        imgSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MAP_KEY}&center=${locationArray[0].lat},${locationArray[0].lon}&zoom=13`
      });
    }catch (error){
      console.log('This is an error');
    }
  }
   
getWeather = async () => {
    try{
      // LOCAL SERVER
      const SERVER = process.env.REACT_APP_LOCAL_SERVER;
      // const forecast = await axios.get(`${process.env.REACT_APP_LOCAL_SERVER}/weather?city_name=${this.state.searchQuery}`);
      // HEROKU SERVER
      // const SERVER = process.env.REACT_APP_BACKEND;
      const weather = await axios.get(`${SERVER}/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}`);
      console.log(weather);
      const forecastArray = weather.data;
      this.setState({ forecast: forecastArray });
    } catch (error) {
      console.error(error);
      this.setState({ displayError: true, error: error.message })
    }
  }

getMovies = async () => {
  try {
  const mov = this.state.searchQuery;
  const SERVER = process.env.REACT_APP_LOCAL_SERVER;
  const movie = await axios.get(`${SERVER}/movies?movies=${mov}`);
  const movieArray = movie.data;
    this.setState({ movieArray });
console.log(this.state);
}
catch (error) {
  this.setState({ displayError: true, error: error.message })
}
}
render() {
  return (
    <>
      <center>
        <h1>Welcome To City Explorer</h1>
        <Form onSubmit={this.handleAllClicks} >
          <input onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="city" />
          <Button type="submit">explore!</Button>
        </Form>

      </center>
      {this.state.displayResults &&
        <center>
          <Card style={{ width: '25rem' }}
            bg='info'
            text='white'
          >
            <Map imageSrc={this.state.imgSrc}>
            </Map>
            <Card.Body>
              <Card.Title><h2>{this.state.location.display_name}</h2></Card.Title>
              <Card.Text>
                Latitude: {this.state.location.lat}
              </Card.Text>
              <Card.Text>
                Longitude: {this.state.location.lon}
              </Card.Text>
              <Forecast
                forecast={this.state.forecast}
              />
              <Movies
                movies={this.state.movieArray} />
            </Card.Body>
          </Card>
        </center>

      }
      {this.state.displayError &&
        <>
          <Error handleError={this.state.error}

          ></Error>
        </>
      }
    </>
  )
}
}

export default App;

