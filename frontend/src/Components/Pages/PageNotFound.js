import React, { Component } from 'react';
import notFound from '../../assets/not-found-icon.png'

class PageNotFound extends Component {
    render() {
        return (
            <section id="page-not-found">
                <div className="inner-container">
                    <img src={notFound}/>
                    <h1>404</h1>
                    <h2>Page not found</h2>
                    <p>
                    The page you are looking for doesn’t exist or an 
                    other error occurred. Go back, or head over to 
                    quickdrivintest.co.uk to choose a new direction. 
                    </p>
                </div>
            </section>
        );
    }
}

export default PageNotFound;
