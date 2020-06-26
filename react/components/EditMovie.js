import React, { Component } from 'react';
import { AiOutlineArrowLeft as BackArrow } from 'react-icons/ai';
import { FaTrashAlt as Delete } from 'react-icons/fa';
import { PAGES } from '../constants';
import { getMovie } from '../network/getMovie';
import { deleteMovie } from '../network/deleteMovie';
import { updateMovie } from '../network/updateMovie';
import Stars from './Stars';
import DeleteMovieModal from './DeleteMovieModal';
import '../styles/MovieDetail.scss';
import '../styles/EditMovie.scss';
// I'm importing the wrong style sheet because I'm running kinda
// short on time and energy. I should really make mixens for the
// similar styles.

class EditMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            title: '',
            year: '',
            rated: '',
            released_on: '',
            director: '',
            genre: '',
            plot: '',
            rating: '',
            isShowingModal: false
        }
    }

    componentDidMount = () => {
        getMovie(this.props.data, (movie) => {
            this.setState({
                movie: movie.fields
            })
            console.log(movie)
        })
    }

    // This could be WAAAAAY better! 
    formHandler = (event) => {
        const {value, name} = event.target;

        this.setState({
            [name]: value
        });
    }

    handleDelete = (deleted) => {
        if (deleted === true) {
            deleteMovie(this.props.data, (json) => {
                console.log(json);
                this.props.navigate(PAGES.LIST_PAGE);
            });
            
        } else {
            this.setState({
                isShowingModal: false
            })
        }
    }
    showModal = () => {
        this.setState({
            isShowingModal: true
        }) 
    }

    handleUpdateMovie = () => {
        updateMovie({
            ...this.state,
            pk: this.props.data
        }, (response) => {
            console.log(response)
            this.props.navigate(PAGES.DETAIL_PAGE, this.props.data);
        })
    }

    render() {
        if (this.state.movie === null) {
            // maybe add some real loading screens
            return <div>Loading</div>
        }

        const oldMovie = this.state.movie;
        return (
            <div className='EDIT'>
                <div>
                    <div className='DETAIL__TITLE'>Edit Movie</div>
                    <div className='DETAIL__HR'/>
                    <div className='EDIT__TITLE'>{oldMovie.title}</div>
                    <input
                        className='EDIT__BOX'
                        type='input' 
                        name='title'
                        value={this.state.title}
                        placeholder='Change Title'
                        onChange={this.formHandler}
                        />
                    <div>{oldMovie.plot}</div>
                    <textarea
                        className='EDIT__BOX EDIT__BOX--PLOT'
                        type='input' 
                        name='plot'
                        value={this.state.plot}
                        placeholder='Twist the Plot'
                        onChange={this.formHandler}
                        />
                    <div className='EDIT__INFO'>
                    <div>
                        <div>{oldMovie.rated}</div>
                        <input
                            className='EDIT__BOX'
                            type='input'
                            name='rated'
                            value={this.state.rated}
                            placeholder='Change the Rating'
                            onChange={this.formHandler}
                            />
                    </div>
                    <div>
                        <div> {oldMovie.released_on}</div>
                        <input
                            className='EDIT__BOX'
                            type='input' 
                            name='released_on'
                            value={this.state.released_on}
                            placeholder='Reset the Release Date'
                            onChange={this.formHandler}
                            />
                    </div>
                    <div>
                        <div>{oldMovie.genre}</div>
                        <input
                            className='EDIT__BOX'
                            type='input' 
                            name='genre'
                            value={this.state.genre}
                            placeholder='Modify the Genre'
                            onChange={this.formHandler}
                            />
                        
                    </div>
                    </div>
                    <div>{oldMovie.director}</div>
                        <input
                            className='EDIT__BOX'
                            type='input' 
                            name='director'
                            value={this.state.director}
                            placeholder='Who is the Director'
                            onChange={this.formHandler}
                            />
                    It Got: <Stars count={oldMovie.rating}/>
                    <input
                        className='EDIT__BOX'
                        type='input' 
                        name='rating'
                        value={this.state.rating}
                        placeholder='What do you think?'
                        onChange={this.formHandler}
                        />
                    <div className='EDIT__SUBMIT' onClick={this.handleUpdateMovie}>
                        Submit
                    </div>
                </div>
                <div className='DETAIL__BUTTONS'>
                    <div 
                        onClick={() => this.props.navigate(PAGES.DETAIL_PAGE, this.props.data)} 
                        className='DETAIL__BACK' 
                    >
                        <BackArrow color='#CA3E47' />
                    </div>
                    <div 
                        onClick={() => this.showModal()}
                        className='DETAIL__EDIT' 
                    >
                        <Delete color='#CA3E47' />
                    </div>
                </div>
                {this.state.isShowingModal && 
                    <div className="BLACKOUT"></div>}
                {this.state.isShowingModal && 
                    <DeleteMovieModal pk={this.props.data} handleDelete={this.handleDelete}/>}
            </div>
        );
    }
}

export default EditMovie;