import  React, { PropTypes } from 'react';
import Countdown from 'react-countdown-now';
import '../styles/styles.css';
import * as utils from '../common/GetData';
import * as properties from '../common/properties';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

let counter = 0;
const renderer = ({ minutes, seconds }) => {
    counter++;
    if(seconds == "00" && minutes == "00" && counter > 2){
        console.log("true");
        let logIn_candidate = JSON.parse(sessionStorage.getItem("loginresponse")).data.name;
        let logIn_sapId = JSON.parse(sessionStorage.getItem("loginresponse")).data.sapId;
        let logIn_password = JSON.parse(sessionStorage.getItem("loginresponse")).data.password;
        let username =logIn_sapId+"_user";
        window.this_obj = this;
                let url = properties.properties.exam_submit;
                let final_report = JSON.parse(sessionStorage.getItem(logIn_candidate));
                utils.postData(username,logIn_password,url,final_report,window.this_obj,function(res,self) {
                    console.log(res);
                    if(res.data != null && res.data != undefined && res != undefined && res != null){
                        self.setState({showModal:true, error:false, modal_msg:"Submitted Successfully"});
                        let path = window.location.host +`/ExamCompleted`;
                        window.location.href = path;
                        
                    }
                    else{
                        alert("Error occured");
                    }
                    sessionStorage.clear();

                });     
        
    }
    return <span className = "timer">{minutes}:{seconds}</span>;      
  }

class HeaderClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error:false,
            showModal : false,
            modal_msg : false
        }}
        
        hideModal(){
            this.setState({showModal : false, name: '', password : '', conformPassword : ''});
        }
   render(){
    let modal_classname = (this.state.error) ? "error_modal" : "static-modal";
    let glyphicon_classname = (this.state.error) ? "glyphicon glyphicon-remove" : "glyphicon glyphicon-ok";
    window.this_obj = this;
        return(
            <div>
                 {(this.state.showModal)? <div className={modal_classname}>
                <Modal.Dialog>
                    <Modal.Header>
                    <Modal.Title></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>{this.state.modal_msg}<span className={glyphicon_classname}></span></Modal.Body>

                    <Modal.Footer>
                    <Button onClick = {this.hideModal.bind(this)}>Close</Button>
                    </Modal.Footer> 
                </Modal.Dialog>
            </div>: null}

                <nav className = "nav-bar-containter">
                <span><img alt="logo" height="80" width="100" src = "https://smedia2.intoday.in/aajtak/images/stories/112014/hcl-logo_650_112514054850.jpg" crossorigin="anonymous"/></span>
                <span className="heading">MENTORING <span style={{fontSize: "large"}}>3.0</span></span>
                <Countdown
                    date={Date.now() + 3.6e+6}
                    renderer={renderer}
                />            
                </nav>
            </div>
        )
    }
}

export default HeaderClass;