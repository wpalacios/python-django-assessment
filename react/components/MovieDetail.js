import React, { Component } from 'react';
import { getMovie } from '../network/getMovie';
import Stars from './Stars';
import { AiOutlineArrowLeft as BackArrow } from 'react-icons/ai';
import { FaPencilAlt as Edit } from 'react-icons/fa';
import { PAGES } from '../constants';
import '../styles/MovieDetail.scss';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null
        }
    }

    componentDidMount = () => {
        getMovie(this.props.data, (movie) => {
            this.setState({movie})
        })
    }

    render() {
        if (this.state.movie === null) {
            return (
                <div className='DETAIL'>Loading</div>
            );
        }
        const movie = this.state.movie.fields;
        return (
            <div className='DETAIL'>
                <div>
                <div className='DETAIL__TITLE'>
                    {movie.title}
                    
                </div>
                <div className='DETAIL__HR' />
                <span className='DETAIL__RATING'>Rating: </span><Stars count={movie.rating} />
                <div className='DETAIL__PLOT'>
                    <span className='DETAIL__PLOT-TAG'>Plot: </span>
                    {movie.plot}
                </div>
                <div className='DETAIL__DIRECTOR'>Directed by: {movie.director}</div>
                <div className='DETAIL__RATED'>Rated: {movie.rated}</div>
                <div className='DETAIL__RELEASED'>Released Date: {movie.released_on}</div>
                <div className='DETAIL__GENRE'>Genre: {movie.genre}</div>
                </div>
                <div className='DETAIL__BUTTONS'>
                    <div 
                        onClick={() => this.props.navigate(PAGES.LIST_PAGE)} 
                        className='DETAIL__BACK' 
                    >
                        <BackArrow color='#CA3E47' />
                    </div>
                    <div 
                        onClick={() => this.props.navigate(PAGES.EDIT_PAGE, this.props.data)}
                        className='DETAIL__EDIT' 
                    >
                        <Edit color='#CA3E47' />
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieDetail;