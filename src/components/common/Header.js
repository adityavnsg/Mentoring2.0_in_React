import  React, { PropTypes } from 'react';
import '../styles/styles.css';
import * as properties from '../common/properties';

class HeaderCommon extends React.Component{
    constructor(props){
        super(props);
    }
    goto_Home(){
        sessionStorage.clear();
        window.location.href = properties.properties.logout_redirect_page;
    }
    render(){
        return(
            <nav className = "nav-bar-containter">
            <span>
                <img alt="logo" height="80" width="100" src = "https://smedia2.intoday.in/aajtak/images/stories/112014/hcl-logo_650_112514054850.jpg" crossOrigin="anonymous"/></span>
               <span className="heading">MENTORING <span style={{fontSize: "large"}}>3.0</span></span>
            {(window.location.pathname == "/adminOperationsPage" || window.location.pathname == "/SuperAdminOperations") ?
            <span className = "logout" onClick = {this.goto_Home.bind(this)}><input type="button" value="Logout"/></span>
            : null
            }
            </nav>
        );
    }
}

export default HeaderCommon;
