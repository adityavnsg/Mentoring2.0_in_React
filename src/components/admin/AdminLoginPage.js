import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import * as utils from '../common/GetData';
import * as properties from '../common/properties';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

let super_admin = "cisco";
class AdminLoginPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        password: '',
        isLoading: false,
        error_style: "",
        showModal: false
      };

      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
     // this.onBlur = this.onBlur.bind(this);
    }
    onSubmit(e) {
      e.preventDefault();

      if (this.state.name != null && this.state.password != null) {
        let url = properties.properties.admin_login_url + this.state.name + "&password=" + this.state.password;
        let admin_login_details = {};
        admin_login_details['name'] = this.state.name;
        admin_login_details['password'] = this.state.password;
        sessionStorage.setItem("admin_login_details", JSON.stringify(admin_login_details));
        utils.getData(this.state.name+"_admin", this.state.password, url, this, function (res, self) {
          sessionStorage.setItem("loginresponse", JSON.stringify(res));
          if (res.data != null && res.data != undefined && res != undefined && res != null) {
            let path;
            if (self.state.name == "cisco" && self.state.password == "cisco") {
              path = `/SuperAdminOperations`;
            } else {
              path = '/adminOperationsPage';
            }
            self.props.history.push(path);
          } else {
            self.setState({
              showModal: true
            });
            sessionStorage.clear();
          }
        });
      }
    }
   /* onBlur(e){
      let url= properties.properties.user_finder_api+this.state.name;
      utils.getData(this.state.name+"_admin", this.state.password, url, this, function (res, self) {

      });
    }*/
    onChange(e) {
      let input_value = e.target.value;
      if (e.target.name == "name") {
        if (input_value.match(/^[a-zA-Z]*$/)) {
          this.setState({
            [e.target.name]: e.target.value
          });
        } else {
          let trim_input = input_value.slice(0, input_value.length - 1);
          this.setState({
            [e.target.name]: trim_input
          });
        }
      }
      if (e.target.name == "password") {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
    }
    hideModal() {
      this.setState({
        showModal: false,
        name: '',
        password: ''
      });
    }
    render() {
      const {
        name,
        password,
        isLoading
      } = this.state;
      return ( 
        <div className = "form-login" > {
          (this.state.showModal) ? <div className = "admin-modal">
          <Modal.Dialog >
          <Modal.Header >
          <Modal.Title > Error </Modal.Title> 
          </Modal.Header>

          <Modal.Body > Invalid UserId / Password < span className = "glyphicon glyphicon-remove" > </span></Modal.Body >

          <Modal.Footer >
          <Button onClick = {
            this.hideModal.bind(this)
          } > Close </Button> 
          </Modal.Footer> 
          </Modal.Dialog> 
          </div>: null} 
          <form onSubmit = {this.onSubmit} >
          <div className = "row" >
          <div className = "col-md-4 col-md-offset-4" >
          <TextFieldGroup
          field = "name"
          label = "Username / Email"
          value = {name}
          onChange = {this.onChange}
          //onBlur = {this.onBlur}
          autoComplete = "off"
          id = {this.state.error_style}
          /> 
          </div> 
          </div>

          <div className = "row" >
          <div className = "col-md-4 col-md-offset-4" >
          <TextFieldGroup
          field = "password"
          label = "Password"
          value = {password}
          onChange = {this.onChange}
          id = {this.state.error_style}
          type = "password" />
          </div> 
          </div> 
          <div className = "row" >
          <div className = "col-md-4 col-md-offset-4" >
          <div className = "form-group" > < button className = "btn btn-primary btn-lg"
          disabled = {isLoading} > Login </button></div >
          </div> 
          </div>
          </form> 
          </div>
        );
      }
    }

    export default AdminLoginPage;
