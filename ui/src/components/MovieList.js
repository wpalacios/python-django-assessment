import React, { Component } from 'react';
import { Table } from 'reactstrap';
import NewMovieModal from './NewMovieModal';

class MovieList extends Component {
    render() {
        const movies = this.props.movies;
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Released on</th>
                        <th>Votes</th>
                        <th>Stars</th>
                        <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { !movies || movies.length <= 0 ? (
                        <tr>
                            <td colSpan="7" align="center">
                                <strong>Oops, no movies have been added yet.</strong>
                            </td>
                        </tr>
                    ) : (
                        movies.map(movie => (
                            <tr key={movie.pk}>
                               <td>{movie.pk}</td> 
                               <td>{movie.title}</td>
                               <td>{movie.released_on}</td>
                               <td>{movie.num_votes}</td>
                               <td>{movie.avg_rating}</td>
                               <td>
                                    <NewMovieModal
                                        create={false}
                                        movie={movie}
                                        resetState={this.props.resetState} 
                                    />
                               </td>
                               <td></td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        );
    }
}

export default MovieList;