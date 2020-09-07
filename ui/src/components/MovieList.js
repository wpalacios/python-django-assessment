import React, { Component } from 'react';
import { Table } from 'reactstrap';
import NewMovieModal from './NewMovieModal';
import RemoveMovieModal from './RemoveMovieModal';
import MovieDetailModal from './MovieDetailModal';

class MovieList extends Component {
    render() {
        const movies = this.props.movies;
        return (
            <Table className="table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Released on</th>
                        <th>Votes</th>
                        <th>Stars</th>
                        <th colSpan="3" className="text-center">Action</th>
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
                               <td>{movie.title}</td>
                               <td>{movie.released_on}</td>
                               <td>{movie.num_votes}</td>
                               <td>{movie.avg_rating}</td>
                               <td className="text-center">
                                    <MovieDetailModal
                                        pk={movie.pk}
                                        resetState={this.props.resetState} 
                                    />
                               </td>
                               <td className="text-center">
                                    <NewMovieModal
                                        create={false}
                                        movie={movie}
                                        resetState={this.props.resetState} 
                                    />
                               </td>
                               <td className="text-center">
                                    <RemoveMovieModal
                                        pk={movie.pk}
                                        title={movie.title}
                                        resetState={this.props.resetState}
                                    />
                               </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        );
    }
}

export default MovieList;