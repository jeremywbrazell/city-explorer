import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      searchQuery: '',
      imgSrc: '',
      displayResults: false
    }

  }

  getLocationInfo = async (e) => {
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MAP_KEY}&q=${this.state.searchQuery}&format=json`;
    const location = await axios.get(url);
    const locationArray = location.data;
    this.setState({
      location: locationArray[0],
      displayResults: true,
      imgSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MAP_KEY}&center=${locationArray[0].lat},${locationArray[0].lon}&zoom=13`
    });
  }
  render() {
    return (
      <>
        <Form onSubmit={this.getLocationInfo} >
          <input onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="city" />
          <Button type="submit">explore!</Button>
        </Form>
        <h1>Welcome</h1>
        {this.state.displayResults &&
          <Card style={{ width: '25rem' }}
            bg='success'
            text='secondary'
          >
            <Card.Img variant="top" img src={this.state.imgSrc} alt='map' title='map' />
            <Card.Body>
              <Card.Title><h2>{this.state.location.display_name}</h2></Card.Title>
              <Card.Text>
                <p>Latitude: {this.state.location.lat}</p>
                <p>Longitude: {this.state.location.lon}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        }
      </>
    )
  }
}

export default App;
