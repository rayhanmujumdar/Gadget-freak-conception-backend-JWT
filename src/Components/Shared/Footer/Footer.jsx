import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <div className='bg-black text-white'>
            <p className='text-center'><small>all copyright to me {year}</small></p>
        </div>
    );
};

export default Footer;