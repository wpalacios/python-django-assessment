import React from 'react';
import { TiWarning } from 'react-icons/ti';
import '../styles/DeleteMovieModal.scss';

const DeleteMovieModal = (props) => {
    console.log("modal is showing")
    return (
        <div className='DELETE'>
            
            <div className='DELETE__WARNING'>
                <TiWarning color='#c9101c' /> 
                <span className='DELETE__TEXT'>
                    Are you Sure you want to delete this movie? This action cannot be undone!
                </span>
            </div>
            <div className='DELETE__BUTTONS'>
                <div
                    className='DELETE__CANCEL'
                    onClick={() => props.handleDelete(false)}
                >CANCEL</div>
                <div
                    className='DELETE__DELETE'
                    onClick={() => props.handleDelete(true)}
                >DELETE</div>
            </div>
        </div>

    );
}


export default DeleteMovieModal;