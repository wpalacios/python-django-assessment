import React, { Component } from 'react';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import CreateMovie from './CreateMovie';
import EditMovie from './EditMovie';
import { PAGES } from '../constants';
import '../styles/Navigator.scss';

class Navigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: PAGES.LIST_PAGE,
            data: null // Not the best. I should be using redux for this
        }
    }
    
    navigate = (page, data) => {
        if (typeof data === 'undefined') {
            data = null;
        }
        this.setState({ page, data });
    }

    render() {
        return (
            <div className='NAVIGATOR'>
                {this.state.page === PAGES.DETAIL_PAGE && 
                    <MovieDetail 
                        navigate={this.navigate} 
                        data={this.state.data} />}
                {this.state.page === PAGES.EDIT_PAGE && 
                    <EditMovie 
                        navigate={this.navigate} 
                        data={this.state.data} />}
                {this.state.page === PAGES.CREATE_PAGE && 
                    <CreateMovie 
                        navigate={this.navigate} 
                        data={this.state.data} />}
                {this.state.page === PAGES.LIST_PAGE && 
                    <MovieList 
                        navigate={this.navigate} 
                        data={this.state.data} />}
            </div>
        );
    }
}

export default Navigator;