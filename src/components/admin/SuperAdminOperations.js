import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import * as utils from '../common/GetData';
import Sidebar from "react-sidebar";
import * as properties from '../common/properties';
import CommonMessage from '../common/CommonMessage';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import TableComponent from './TableComponent';

const mql = window.matchMedia(`(min-width: 800px)`);
let admin_auth = "cisco";

class SuperAdminOperations extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          password: '',
          conformPassword : '',
          create_admin : false,
          adminList: false,
          sidebarDocked: mql.matches,
          sidebarOpen: false,
          btn_class_name : false,
          admin_list_class_name : false,
          show_create_admin_msg :false,
          data:'',
          tableData : {
            columns: [
                { name: "userName", title: "Name" },
                { name: "password", title: "Password"},
                { name: "delete",   title: "Delete"}
              ],
              rows: []
          },
          show_common_message : false,
          isLoading: false,
          showModal : false,
          modal_msg : '',
          error : false,
        };
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
      }
      componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
      }
     
      componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
      }
     
      onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
      }
     
      mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
      }

      onChange(e) {
        let input_value = e.target.value;
        if(e.target.name == "name"){
          if(input_value.match(/^[a-zA-Z]*$/)){
            this.setState({ [e.target.name]: e.target.value});
          }else{
            let trim_input = input_value.slice(0, input_value.length-1);
            this.setState({ [e.target.name]: trim_input});
          }  
        }else{
            this.setState({ [e.target.name]: e.target.value});
        }        
      }

    onSubmit(e) {
     e.preventDefault();
        if(this.state.name!= null && this.state.password != null && this.state.conformPassword != null){
            if(this.state.password !== this.state.conformPassword){
                this.setState({showModal : true, error:true, modal_msg : "Invalid Password/Confirm Password"});
               // alert("Invalid Password/Confirm Password");
            }
            else{
                let url = properties.properties.create_admin_api;
                let login_creditials = {"userName" : this.state.name, 
                                        "password": this.state.password};
                utils.postData(admin_auth+"_admin", admin_auth, url, login_creditials, this, function(res, self){
                    if(res.data !=null && res.data != undefined){
                        self.setState({name : "", password: "", conformPassword: "", show_create_admin_msg:true, showModal : true, modal_msg: "Admin created Successfully", error :false});
                        console.log("New Admin Creation Response:", res);
                    }                    
                });
            }
        }else{
            this.setState({showModal : true, error:true, modal_msg : "Please fill all the fields"});
        }

    }
    showCreateAdmin(){
        this.setState({create_admin : true, adminList : false,show_common_message:false, btn_class_name : true, admin_list_class_name : false, name: "", password: "", conformPassword: "",data : "" });
    }
    showAdminList(e){
        let url = properties.properties.show_admins_list;
        utils.getData(admin_auth+"_admin", admin_auth, url, this, function(res, self){
            if(res.data !=null && res.data != undefined){
                for(let add_delete_item in res.data){
                    if(res.data[add_delete_item].hasOwnProperty("delete") == false){
                        res.data[add_delete_item]["delete"] = "Delete";
                    }
                }
                let tableData = Object.assign({}, self.state.tableData);
                    tableData.rows = res.data;
                    tableData.columns = self.state.tableData.columns; 
                self.setState({adminList : true, create_admin : false, show_create_admin_msg:false, admin_list_class_name : true,show_common_message:false, btn_class_name : false, name: "", password: "", conformPassword: "", tableData : tableData });
                console.log("Admin List Response:",tableData);
            }
            else{
                self.setState({show_common_message :true, create_admin: false});
            }                
        });
    }
    hideModal(){
        this.setState({showModal : false, name: '', password : '', conformPassword : ''});
    }
    render(){
        const {name, password, conformPassword, isLoading} = this.state;
        let modal_classname = (this.state.error) ? "error_modal" : "static-modal";
        let glyphicon_classname = (this.state.error) ? "glyphicon glyphicon-remove" : "glyphicon glyphicon-ok";
        return(
            <div>
                <div>
                <Sidebar
                sidebar={
                <div className = "sidebar-items">
                <h3>Choose Operations</h3>
                <ul>
                        <li onClick = {this.showCreateAdmin.bind(this)}>Create Admin</li>
                        <li  onClick = {this.showAdminList.bind(this)}>View Admin List</li>
                    </ul>
                </div>} 
                
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}>
            </Sidebar>
            </div>
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
            {(this.state.create_admin)? 
                <div className = "form-login">
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <TextFieldGroup
                                field="name"
                                label="Admin Username"
                                value={name}
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
                            onChange={this.onChange}
                            type="password"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <TextFieldGroup
                            field="conformPassword"
                            label="Confirm Password"
                            value={conformPassword}
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
            </div> :(this.state.show_create_admin_msg)? 
                    <div><div className="jumbotron"> <h1>Admin created successfully</h1></div></div>:
            (this.state.adminList)? 
                <div className="jumbotron" id = "admin_list_table"> <TableComponent data = {this.state} /></div>
            :(this.state.show_common_message)? 
            <CommonMessage/> :
            null
        }
                
            </div>
        );
    }
}

export default SuperAdminOperations;