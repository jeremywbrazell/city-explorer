import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieArrayFromApp: this.props.movies

        }

    }

    movieRender = () => {
        const data = this.props.movies;
        console.log(data);
        return (<ul>{data.map((item, index) => <li key={index}>{item.date}: {item.description}</li>)}</ul>)

    }
    render() {
        console.log(this.props);
        return (
            <>
                <h2>Movies</h2>
                {this.movieRender()}
            </>
        )
    }

}
export default Movies;