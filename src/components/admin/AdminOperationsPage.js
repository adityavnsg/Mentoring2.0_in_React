import React from 'react';
import Sidebar from "react-sidebar";
import TextFieldGroup from '../common/TextFieldGroup';
import * as utils from '../common/GetData';
import readXlsxFile from 'read-excel-file';
import TableComponent from './TableComponent';
import * as properties from '../common/properties';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
//import TimePicker from 'react-times';
//import 'react-times/css/material/default.css'; 

const mql = window.matchMedia(`(min-width: 800px)`);
let adminid, adminpass;
class AdminOperationsPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          sidebarDocked: mql.matches,
          sidebarOpen: false,
          genratePassword: false,
          generatedPasswordDetails : false,
          generateReport : false,
          sapId : '',
          name: '',
          stream : '',
          rm : '',
          rmsapId : '',
          examType : '',
          generated_Password : '',
          showreportResponse: false,
          reportResponse: '',
          show_error : false,
          password_excel : false,
          singleUserForm : false,
          isLoading : false,
          error : false,
          tableData: {
            columns: [
                { name: "name", title: "Name" },
                { name: "sapId", title: "Sap-Id" },
                { name: "stream", title: "Stream" },
                { name: "password", title: "Password" },
                {name: "deleteItem", title: "Delete Item"}
              ], 
              rows: []
          },
          showModal : false,
          modal_msg : '',
          showTable : false,
          show_set_time : false,
          loading : true
        };
     
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
      componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
         adminid = JSON.parse(sessionStorage.getItem("admin_login_details")).name;
         adminpass = JSON.parse(sessionStorage.getItem("admin_login_details")).password;
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
        if(e.target.name == "name" || e.target.name == "rm"){
          if(input_value.match(/^[a-zA-Z ]*$/)){
            this.setState({ [e.target.name]: e.target.value});
          }else{
            let trim_input = input_value.slice(0, input_value.length-1);
            this.setState({ [e.target.name]: trim_input});
          }  
        }
        if(e.target.name == "sapId" || e.target.name == "rmsapId"){
            if(input_value.match(/^[0-9]*$/) && input_value.length < 9){
                this.setState({ [e.target.name]: e.target.value});
            }else{
                let trim_input = input_value.slice(0, input_value.length-1);
                this.setState({ [e.target.name]: trim_input});
            }
        }
        if(e.target.name == "stream" || e.target.name == "examType"){
            if(input_value == this.refs.select[0].innerText){
                this.setState({showModal : true, error : true, modal_msg : "Please select a valid input from the list" });
                //alert("");
            }else{
                this.setState({[e.target.name]: e.target.value});
            }           
        }
      }
      onSubmit(e){
            e.preventDefault();
            this.setState({loading: true});
            if(this.state.stream == "--select--"){
                this.setState({showModal : true, error : true, modal_msg : "Please select a valid stream from the list" });
               // alert("Please select a valid stream from the list");
            } else{
                sessionStorage.setItem("stream",this.state.stream);
                let generatePassword = [];
                let generatedPassword_obj = {};
                    generatedPassword_obj["sapId"] =this.state.sapId;
                    generatedPassword_obj["name"] = this.state.name;
                    generatedPassword_obj["stream"] = this.state.stream;
                    generatedPassword_obj["password"] = "";
                    generatedPassword_obj["manager"]= this.state.rm;
                    generatedPassword_obj["managerSapId"] = this.state.rmsapId;
                    generatedPassword_obj["examType"] = this.state.examType;
                    generatePassword.push(generatedPassword_obj);

           let url = properties.properties.password_generate_api;
           utils.postData(adminid+"_admin",adminpass,url,generatePassword,this,function(res,self) {
               console.log("res:", res);
            if(res.data != null && res.data != undefined && res != undefined && res != null){
             self.setState({genratePassword: false, generated_Password: res.data, loading: false, sapId : '', name: '', stream: '', rm: '', rmsapId: '', showModal : true, modal_msg : 'Password'});
             this.refs.select.value = this.refs.select[0].innerText;
            }
          });
            }   
         } 
      
      showGeneratePasswordForm(){
          this.setState({genratePassword : true, show_error:false, show_sidebar_menu : false, generateReport: false,generatedPasswordDetails: false, btn_class_name : true, admin_list_class_name : false, name: "", sapId: "", stream: "--select--"});
      }
      showGenerateReportForm(){
          this.setState({generateReport: true, show_sidebar_menu : false, show_error:false, genratePassword : false, generatedPasswordDetails: false, admin_list_class_name : true, btn_class_name : false,name: "", sapId: "", stream: "--select--" });
        }
        showExcel(e){
            console.log(e);
            let chooseExcel_show;
            if(e.target.parentElement.parentElement.parentElement.innerText.indexOf("Generate Password")!= -1){
                chooseExcel_show = true;
            }else if(e.target.parentElement.parentElement.parentElement.innerText.indexOf("Generate Report")!= -1){
                chooseExcel_show = false;
            }
            this.setState({generateReport:true, genratePassword:false, password_excel : chooseExcel_show, show_error:false,singleUserForm: false})
        }
        getExcel(){
            console.log(this.state.password_excel);
            const input = document.getElementById('input')
            if(this.state.password_excel){
                readXlsxFile(input.files[0]).then((rows) => {
                    let name_index, sapId_index, stream_index, manager_index, managerSapid_index;
                    for(let findIndex in rows[0]){
                       let column_header = rows[0][findIndex].toLowerCase();
                        if(column_header.indexOf("name")!= -1){
                            name_index = findIndex;
                        }
                        if(column_header.indexOf("sapid")!=-1){
                            sapId_index = findIndex;
                        }
                        if(column_header.indexOf("stream")!=-1){
                            stream_index = findIndex;
                        }
                        if(column_header.indexOf("manager")!=-1){
                            manager_index = findIndex;
                        }
                        if(column_header.indexOf("manager")!=-1 && column_header.indexOf("sapId")!=-1 ){
                            managerSapid_index = findIndex;
                        }
                        if(column_header.indexOf("exam")!=-1 && column_header.indexOf("type")!=-1){
                            exam_type_index = findIndex;
                        }
                    }

                    let generatePassword = [];
                for(let rowItems=1; rowItems<rows.length;rowItems++){
                    let generatedPassword_obj = {};
                    generatedPassword_obj["sapId"] = rows[rowItems][sapId_index];
                    generatedPassword_obj["name"] = rows[rowItems][name_index];
                    generatedPassword_obj["stream"] = rows[rowItems][stream_index];
                    generatedPassword_obj["password"] = "";
                    generatedPassword_obj["manager"]= rows[rowItems][manager_index];
                    generatedPassword_obj["managerSapId"] = rows[rowItems][managerSapid_index];
                    generatedPassword_obj["examType"] = rows[rowItems][exam_type_index];
                    generatePassword.push(generatedPassword_obj);
                    }
                    let url = properties.properties.password_generate_api;
                    utils.postData(adminid+"_admin",adminpass,url,generatePassword,this,function(res,self) { 
                        if(res!= undefined && res.data != undefined && res != null && res.data != null){
                            let tableData = Object.assign({}, self.state.tableData); 
                    tableData.rows = res.data;
                    self.setState({rows : tableData, showTable: true,generateReport:false, showModal : true, modal_msg : 'Passwords'});
                        }
                    });
                });
                this.setState({isLoading: true});
                
            }else{
                let report_payload = {};
            report_payload["sapId"] = [];
            readXlsxFile(input.files[0]).then((rows) => {
                let sapId_index;
                    for(let findIndex in rows[0]){
                        if(rows[0][findIndex] == "SapId"){
                            sapId_index = findIndex;
                        }
                    }
                for(let rowItems=1; rowItems<rows.length; rowItems++){
                    report_payload.sapId.push(rows[rowItems][sapId_index]);
                }
                let url = properties.properties.generate_report_api;
                utils.postData(adminid+"_admin",adminid,url,report_payload,this,function(res,self) {
                    console.log(res);
                    if(res.data != null && res.data != undefined && res != undefined && res != null){
                        self.setState({showreportResponse: true, reportResponse: res.data, generatedPasswordDetails : false, genratePassword: false});
                        if(res.data.indexOf("success")== -1){
                            self.setState({show_error: true});
                        }else{
                            self.setState({showModal: true, modal_msg : "Report for given users"});
                        }
                    }

                });
          });
            }
            
        }
        singleUserForm_submit(e){
            e.preventDefault();
                let url =  properties.properties.generate_report_api;
                let report_payload = {};
                report_payload["sapId"] = [];
                report_payload.sapId.push(this.state.sapId);
                utils.postData(adminid+"_admin",adminpass,url,report_payload,this,function(res,self) {
                    console.log(res);
                    if(res.data != null && res.data != undefined && res != undefined && res != null){
                        self.setState({showreportResponse: false, reportResponse: res.data,sapId : "", genratePassword: false});
                        if(res.data.indexOf(",")== -1){
                            self.setState({ singleUserForm:true, show_error: true, sapId : "",showModal: true,error:false, modal_msg : res.data});
                        }
                        else{
                            self.setState({ singleUserForm:true, show_error: true, sapId : "",showModal: true,error:true, modal_msg : res.data});
                        }
                    }else{
                        self.setState({showModal : true, error : true, modal_msg : "Network Error",sapId : "", singleUserForm:true });
                    }

                });
        }
        show_single_user_form(){
            this.setState({singleUserForm:true, generateReport:false, genratePassword:false});
        }
        hideModal(){
            this.setState({showModal : false, sapId : '', name: '', stream: '', rm: '', rmsapId: ''});
            this.refs.select.value = this.refs.select[0].innerText;
        }
        onTimeChange(options) {
            // do something
          }
         
          onFocusChange(focusStatue) {
            // do something
          }
          show_time(){
              this.setState({show_set_time : true});
          }
    render(){
        const {sapId, name, stream, rmsapId,rm, isLoading} = this.state;
        let error_style = {
                            "color" : "white",
                            "background": "red",
                            "position": "relative",
                            "top": "8px",
                            "fontSize": "large",
                            "borderRadius": "3px"
                        };
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
                        <li>Generate Password
                        <div className="side_dropdown">
                            <ul>
                                <li onClick = {this.showGeneratePasswordForm.bind(this)}>Single-user
                                </li>
                                <li onClick = {this.showExcel.bind(this)}>Multi-user</li>
                            </ul>
                        </div>
                        </li>
                        <li>Generate Report
                        <div className="side_dropdown">
                            <ul>
                                <li onClick = {this.show_single_user_form.bind(this)}>Single-user
                                </li>
                                <li onClick = {this.showExcel.bind(this)}>Multi-user</li>
                            </ul>
                        </div>
                        </li>
                        <li onClick = {this.show_time.bind(this)}>Configurations</li>
                    </ul>
                </div>
            }
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
            <div>
                {(this.state.genratePassword) ? 
                <div>
            <div className = "form-login">
            <form onSubmit={this.onSubmit}>
            <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                        <TextFieldGroup
                            field="name"
                            label="Name"
                            value={name}
                            onChange={this.onChange}
                            autoComplete="off"
                        />
                        </div>
                    </div>
                <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                        <TextFieldGroup
                            field="sapId" 
                            label="SapId"
                            value={sapId}
                            onChange={this.onChange}
                            autoComplete="off"
                        />
                        </div>
                    </div>
                
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                    <div className="form-group">
                    <label className="control-label">Stream</label>
                    <select className="form-control" name="stream" ref="select" onChange ={this.onChange} required> 
                    <option defaultValue = "--select--">--select--</option>
                    <option value="corejava">CoreJava</option>
                    <option value="c">C</option>
                    <option value="frontend">FrontEnd</option>
                    <option value="python">Python</option>
                </select>
                    </div>
                    
                </div>
                </div>

                <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                        <TextFieldGroup
                            field="rm"
                            label="Reporting Manager"
                            value={rm}
                            onChange={this.onChange}
                            autoComplete="off"
                        />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                        <TextFieldGroup
                            field="rmsapId"
                            label="R.M SapId"
                            value={rmsapId}
                            onChange={this.onChange}
                            autoComplete="off"
                        />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                    <label className="control-label">Exam Type</label>
                    <select className="form-control" name="examType" ref="examType" onChange = {this.onChange} required>
                    <option>--select--</option>
                    <option value="PRE">Pre-IKM</option>
                    <option value="POST">Post-IKM</option>
                    </select>
                    </div>
                        </div>
                    </div>

                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Submit</button></div>
                </div>
                </div>
                </form>
            </div>
            </div>
            :(this.state.generateReport)? <div id="chooseExcel">
            <div>
            <label className="file">Choose your file<input type="file" id="input"  onChange={this.getExcel.bind(this)}/></label>
            </div>
            {(this.state.show_error)?<span style = {error_style}>Invalid SapId's</span>:null}
            </div> :
            (this.state.showreportResponse)?
            <div className= "jumbotron"> <h3>{this.state.reportResponse}</h3> </div>
            :(isLoading)? 
            <div>
                <i className="fa fa-spinner fa-spin"/>Loading...
            </div>: (this.state.singleUserForm)?
                <div className = "form-login">
                <form onSubmit={this.singleUserForm_submit.bind(this)}>
                <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                            <TextFieldGroup
                                field="sapId"
                                label="SapId"
                                value={sapId}
                                onChange={this.onChange}
                                autoComplete="off"
                            />
                            </div>
                        </div>

                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                    <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Submit</button></div>
                    </div>
                    </div>
                    </form>
                </div> : (this.state.showTable)?
               <div><TableComponent data = {tableData} /></div> :
               (this.show_set_time) ? 
               /*<TimePicker
               onFocusChange={this.onFocusChange.bind(this)}
               onTimeChange={this.onTimeChange.bind(this)}
             /> */ null : null}
            </div>
            </div>
            
        );
    }
}

export default AdminOperationsPage;