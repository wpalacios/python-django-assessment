import React, { Component } from 'react';
import '../styles/CreateMovie.scss';

class CreateMovie extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='DETAIL'>
                <div>
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

export default CreateMovie;