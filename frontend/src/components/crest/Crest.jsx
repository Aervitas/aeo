import React from 'react';
import './Crest.css';

const Crest = () => {
    return (
        <div className='crest'>
            <img src={ require('../assets/crest.png')} className='img' />
        </div>
    );
};

export default Crest;