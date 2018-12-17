import React, {PropTypes} from 'react';
import HeaderClass from './user/Header';
import HeaderCommon from './common/Header';
import BackgroundSlideshow from 'react-background-slideshow';

class App extends React.Component {
    render(){
        return(
            <div className = "container-fluid">
            {this.props.children.type.displayName !== "UserExamPage" ? 
            <HeaderCommon/> : <HeaderClass/>}
            {this.props.children !== null && (this.props.children.type.displayName == "UserExamPage" || this.props.children.type.displayName == "UserSampleExam") ? 
            <div className="seperate-bg-img"></div> : <div className="bg-img">  <BackgroundSlideshow images={[ 
        "https://raw.githubusercontent.com/transitive-bullshit/react-background-slideshow/master/example/src/assets/001.jpg",
        "https://raw.githubusercontent.com/transitive-bullshit/react-background-slideshow/master/example/src/assets/002.jpg",
        "https://raw.githubusercontent.com/transitive-bullshit/react-background-slideshow/master/example/src/assets/004.jpg",
        "https://raw.githubusercontent.com/transitive-bullshit/react-background-slideshow/master/example/src/assets/005.jpg",
        "https://raw.githubusercontent.com/transitive-bullshit/react-background-slideshow/master/example/src/assets/006.jpg" ]} />
        </div>}
            {this.props.children}
            <footer>Copy rights- @www.hcl.com</footer>
            </div>
        );
    }
} 

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
