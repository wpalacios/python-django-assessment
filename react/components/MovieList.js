import React, { Component } from 'react';
import { getAllMovies } from '../network/getAllMovies';
import { MdAdd } from 'react-icons/md';
import { PAGES } from '../constants';
import '../styles/MovieList.scss';
import Stars from './Stars';

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
                    return (
                        <div 
                            className='LIST__ITEM' 
                            onClick={() => this.props.navigate(PAGES.DETAIL_PAGE, movie.pk)}
                            key={movie.pk}
                        >
                            <div>{movie.fields.title}</div>
                            <Stars count={movie.fields.rating}/>
                        </div>
                    );
                })}
                <div className='LIST__ADD'><MdAdd /></div>
                
            </div>
        );
    }
}

export default MovieList;