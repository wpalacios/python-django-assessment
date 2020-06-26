import React, { Component } from 'react';
import { getAllMovies } from '../network/getAllMovies';
import { MdAdd } from 'react-icons/md';
import '../styles/MovieList.scss';

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        }
    }

    componentDidMount = () => {
        getAllMovies((movies) => {
            this.setState({movies})
        })
    }


    render() {
        return (
            <div className='LIST'>
                <div className='LIST__TITLE'>Movies</div>
                <div className='LIST__HR'/>
                {this.state.movies.map(movie => {
                    console.log(movie.fields)
                    return (
                        <div className='LIST__ITEM' key={movie.pk}>
                            {movie.fields.title}
                        </div>
                    );
                })}
                <div className='LIST__ADD'><MdAdd /></div>
                
            </div>
        );
    }
}

export default MovieList;