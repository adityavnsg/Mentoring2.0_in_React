import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class ModalPopup extends React.Component{
    constructor(props){
        super(props);
    }
        
    render(){
        return(

            <div className="static-modal" id="modal">
                <Modal.Dialog>
                    <Modal.Header>
                    <Modal.Title></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Invalid SapId's<span className="glyphicon glyphicon-remove"></span></Modal.Body>

                    <Modal.Footer>
                    <Button onClick = {this.hideModal.bind(this)}>Close</Button>
                    </Modal.Footer> 
                </Modal.Dialog>
            </div>
        );
    }
}
export default ModalPopup;