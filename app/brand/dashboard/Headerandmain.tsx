'use client';

import './dashboard.css';

const Headerandmain = () => {
    const storedBrandName = localStorage.getItem('brand_name');
    return (
        <div className='headerandmain'>
            <div className='header'>
                <h2 className='headerheading'>search</h2>
            </div>
            <div className='maincontent'>
            <h2 className='sidebar-heading'> Hello, {storedBrandName}</h2>
                <p>Session authenticated. Welcome back!</p>
            </div>
        </div>
    );
};

export default Headerandmain;