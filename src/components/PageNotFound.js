import React from 'react';

const PageNotFound = () => {
    return (
        <div className='emptyContainer'>
            <span className='font-no-votes'>Page not found!!!  :(</span>
            <img className='noVotes-image' src='img/404-error.png' alt="Page Not Found!!!"/>
        </div>
     );
}
 
export default PageNotFound;