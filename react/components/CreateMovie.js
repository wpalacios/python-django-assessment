import React, { Component } from 'react';
import { AiOutlineArrowLeft as BackArrow } from 'react-icons/ai';
import { PAGES } from '../constants';
import { createMovie } from '../network/createMovie';
import '../styles/MovieDetail.scss';
import '../styles/EditMovie.scss';

// I'm importing the wrong style sheet because I'm running kinda
// short on time and energy. I should really make mixens for the
// similar styles.
class CreateMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            year: '',
            rated: '',
            released_on: '',
            director: '',
            genre: '',
        }
    }

    // This could be WAAAAAY better!
    formHandler = (event) => {
        const {value, name} = event.target;
        // needs a ton more validation in here!!!
        this.setState({
            [name]: value
        });
    }

    handleCreateMovie = () => {
        createMovie(this.state, (response) => {
            console.log(response)
            this.props.navigate(PAGES.LIST_PAGE);
        })
    }

    render() {
        return (
            <div className='EDIT'>
                <div>
                    <div className='DETAIL__TITLE'>Create New Movie</div>
                    <div className='DETAIL__HR'/>
                    <div className='EDIT__TITLE'>Title: </div>
                    <input
                        className='EDIT__BOX'
                        type='input' 
                        name='title'
                        value={this.state.title}
                        placeholder="What's the Title"
                        onChange={this.formHandler}
                        />
                    <div className='EDIT__INFO'>
                    <div>
                        <div>Rating: </div>
                        <input
                            className='EDIT__BOX'
                            type='input'
                            name='rated'
                            value={this.state.rated}
                            placeholder="What's it rated?"
                            onChange={this.formHandler}
                            />
                    </div>
                    <div>
                        <div>Release Date: </div>
                        <input
                            className='EDIT__BOX'
                            type='input' 
                            name='released_on'
                            value={this.state.released_on}
                            placeholder='When was it released?'
                            onChange={this.formHandler}
                            />
                    </div>
                    <div>
                        <div>Genre: </div>
                        <input
                            className='EDIT__BOX'
                            type='input' 
                            name='genre'
                            value={this.state.genre}
                            placeholder='What genre is it in?'
                            onChange={this.formHandler}
                            />
                        
                    </div>
                    </div>
                    <div>Director: </div>
                    <input
                        className='EDIT__BOX'
                        type='input' 
                        name='director'
                        value={this.state.director}
                        placeholder='Who is the Director?'
                        onChange={this.formHandler}
                        />
                    <div className='EDIT__SUBMIT' onClick={this.handleCreateMovie}>
                        Submit
                    </div>
                </div>
                <div className='DETAIL__BUTTONS'>
                    <div 
                        onClick={() => this.props.navigate(PAGES.LIST_PAGE, null)} 
                        className='DETAIL__BACK' 
                    >
                        <BackArrow color='#CA3E47' />
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateMovie;