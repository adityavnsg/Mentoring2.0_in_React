import React from 'react';

class CommonMessage extends React.Component{
    render(){
        return(
            <div className = "common_msg">
                <h1>Cannot proceed due to network error</h1>
            </div>
        );
    }
}

export default CommonMessage;