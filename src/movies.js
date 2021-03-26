import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieArray: []

        }

    }

    componentDidMount = async () => {
        const mov = 'seattle';
        const SERVER = 'http://localhost:3001';
        const movie = await axios.get(`${SERVER}/movies?=${mov}`);
        const movieArray = movie.data;
        this.setState({ movieLists: movieArray });
    }


    movieRender = () => {
        const data = this.state.movieArray;
        return (<ul>{data.map((item, index) => <li key={index}>{item.date}: {item.description}</li>)}</ul>)

    }


    render() {
        return (
            <>
                <h2>Movies</h2>
                {this.movieRender()}
            </>
        )
    }

}
export default Movies;