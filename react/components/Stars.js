import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const STAR_SIZE = 13;


const Stars = (props) => {
    let starsArray = [];
    if (props.count > 5) throw "Too many stars in <Stars />";
    if (props.count < 0) throw "Too few stars in <Stars />";  
    for (let i = 0; i < 5; i++) {
        if (i < props.count) {
            starsArray.push(1);
        } else {
            starsArray.push(0)
        }
    }
     
    return (
        <span className={props.className}>
            {starsArray.map((e, i) => {
                if (e === 1) {
                    return <FaStar key={i} color='#CA3E47' size={STAR_SIZE} />
                } else {
                    return <FaRegStar key={i} size={STAR_SIZE}/>
                }
            })}
        </span>
    );
}

export default Stars;