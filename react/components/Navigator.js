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
        let displayPage = null;

        if (displayPage === PAGES.DETAIL_PAGE) {
            displayPage = <MovieDetail 
                                navigate={this.navigate} 
                                data={this.state.data} />
        } else if (displayPage === PAGES.EDIT_PAGE) {
            displayPage = <EditMovie 
                                navigate={this.navigate}
                                data={this.state.data} />
        } else if (displayPage === PAGES.CREATE_PAGE) {
            displayPage = <CreateMovie 
                                navigate={this.navigate} 
                                data={this.state.data} />
        } else {
            displayPage = <MovieList 
                                navigate={this.navigate} 
                                data={this.state.data} />
        }

        return (
            <div className='NAVIGATOR'>
                {displayPage}
            </div>
        );
    }
}

export default Navigator;