'use client';

import './dashboard.css';

const Headerandmain = () => {
    const storedBrandName = localStorage.getItem('brand_name');
    return (
        <div className='flex flex-row'>
            <div className='"bg-transparent flex fixed flex-row h-[8vh] w-[99.4%] justify-around"'>
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