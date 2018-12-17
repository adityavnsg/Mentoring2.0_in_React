import React from 'react';
import * as properties from '../common/properties';
import * as utils from '../common/GetData';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
let admin_auth = "cisco";
class TableComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            delete_row : "",
            showModal : false,
            showPrompt : false
        }
        this.onClick = this.onClick.bind(this);
        this.settingState = this.settingState.bind(this);
    }
    onClick(){
        this.setState({showModal : false, showPrompt:false});
        let url = properties.properties.remove_admin;
        let row_Index = this.state.delete_row.rowIndex;
        let get_row = this.refs.table_items.children[row_Index]
        let admin_creditials = { "userName": get_row.children[0].innerText,
                                 "password": get_row.children[1].innerText};
        utils.postData(admin_auth+"_admin", admin_auth,url,admin_creditials,this,function(res,self) {
            if(res!= undefined && res.data != undefined){
                self.refs.table_items.children.slice(self.state.delete_row.rowIndex,0);
                self.setState({showModal : true});
            }
        });
    }
    settingState(e){
        window.this.setState({showPrompt : true});
        let find_delete_row = e.target;
        findElement(find_delete_row);
        function findElement(find_delete_row){
            if(find_delete_row.tagName !== "TR"){
               let get_delete_row =  get_row_item(find_delete_row);
                findElement(get_delete_row);
            }
            else{
                 window.this.setState({delete_row : find_delete_row});
            }
        }
       
        function get_row_item(find_delete_row){
            find_delete_row = find_delete_row.parentElement;
            return find_delete_row;
        }
    }
    hideModal(){
        this.setState({showModal : false, showPrompt:false});
    }
    render(){
            var dataColumns = this.props.data.tableData.columns;
            var dataRows = this.props.data.tableData.rows;
            window.this = this;
            var tableHeaders = (<thead>
                  <tr>
                    {dataColumns.map(function(column) {
                      return <th>{column.title}</th>; })}
                  </tr>
              </thead>);
        
            var tableBody = dataRows.map(function(row) {
              return (
                <tr>
                  {dataColumns.map(function(column) {
                      if(column.title == "Delete"){
                          return <td><button className = "btn btn-primary" onClick = {window.this.settingState}>Delete</button></td>;
                      } else{
                        return <td>{row[column.name]}</td>;
                      } 
                     })}
                </tr>); });
        return(
            <div>

            {(this.state.showModal)? <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                    <Modal.Title></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Admin Removed Successfully <span className="glyphicon glyphicon-ok"></span></Modal.Body>

                    <Modal.Footer>
                    <Button onClick = {this.hideModal.bind(this)}>Close</Button>
                    </Modal.Footer> 
                </Modal.Dialog>
            </div>: (this.state.showPrompt) ? 
                <div className="static-modal">
                <Modal.Dialog>
                <Modal.Body>Do you really want to remove this admin?</Modal.Body>
                <Modal.Footer>
                <Button onClick = {this.hideModal.bind(this)}>No</Button>
                <Button onClick = {this.onClick.bind(this)}>Yes</Button>
                </Modal.Footer> 
            </Modal.Dialog>
            </div> :
            null}
            <table className="table" width="100%" ref="table_items">
                {tableHeaders}
                {tableBody}
            </table>
            </div>
        );
    }
}

export default TableComponent;