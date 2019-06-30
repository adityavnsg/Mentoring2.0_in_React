import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import * as utils from '../common/GetData';
import * as properties from '../common/properties';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class UserLoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      errors: {},
      isLoading: false
    }; 

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.name != undefined){
      let username= this.state.name +"_user";
      let url = properties.properties.examinee_login+this.state.name+'&password='+this.state.password;
      utils.postData(username,this.state.password,url,"",this,function(res,self) {
        sessionStorage.setItem("loginresponse", JSON.stringify(res));
        if(res.data != null && res.data != undefined && res != undefined && res != null){
          let path = properties.properties.user_sample_exam_page;
          self.props.history.push(path);
        }
      });
     } else{
       this.setState({showModal:true,error:true,modal_msg:"Invalid Entry"});
      // alert("invalid entry");
     }
  }
  onChange(e) {
    let input_value = e.target.value;
        if(e.target.name == "name"){
          if(input_value.match(/^[0-9]*$/) && input_value.length < 9){
            this.setState({ [e.target.name]: e.target.value});
          }else{
            let trim_input = input_value.slice(0, input_value.length-1);
            this.setState({ [e.target.name]: trim_input});
          }  
        }
        if(e.target.name == "password"){
          this.setState({ [e.target.name]: e.target.value});
        }
  }
  hideModal(){
    this.setState({showModal : false});
}
  render() {
    const { errors, name, password, isLoading} = this.state;
    let modal_classname = (this.state.error) ? "error_modal" : "static-modal";
    let glyphicon_classname = (this.state.error) ? "glyphicon glyphicon-remove" : "glyphicon glyphicon-ok";
    return (
      <div>
     {(this.state.showModal)? <div className={modal_classname}>
      <Modal.Dialog>

          <Modal.Body>{this.state.modal_msg}<span className={glyphicon_classname}></span></Modal.Body>

          <Modal.Footer>
          <Button onClick = {this.hideModal.bind(this)}>Close</Button>
          </Modal.Footer> 
      </Modal.Dialog>
  </div>: null}
        <div className = "form-login">
        <form onSubmit={this.onSubmit}>
  
            { errors.form && <div className="alert alert-danger">{errors.form}</div> }
            <div className="row">
                      <div className="col-md-4 col-md-offset-4">
                      <TextFieldGroup
                        field="name"
                        label="SapId"
                        value={name}
                        error={errors.name}
                        onChange={this.onChange}
                        autoComplete="off"
                      />
                      </div>
                  </div>
            
            <div className="row">
                 <div className="col-md-4 col-md-offset-4">
            <TextFieldGroup
              field="password"
              label="Password"
              value={password}
              error={errors.password}
              onChange={this.onChange}
              type="password"
            />
            </div>
            </div>
            <div className="row">
                 <div className="col-md-4 col-md-offset-4">
            <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
            </div>
            </div>
            </form>
            </div>
            </div>
    );
  }
}

export default UserLoginPage;
