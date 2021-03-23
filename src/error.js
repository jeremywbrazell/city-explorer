import React from 'react';

class Error extends React.Component{
    render() {
        return(
            <>
            <h2>Server Error</h2>
            <p>{this.props.handleError}</p>
            </>
        )
    }
}
export default Error;