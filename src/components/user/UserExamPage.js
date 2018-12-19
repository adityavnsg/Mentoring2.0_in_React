import React from 'react';
import createFragment from 'react-addons-create-fragment';
import * as utils from '../common/GetData';
import * as properties from '../common/properties';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

var consoledated_report={},logIn_candidate="",logIn_sapId="",logIn_password="",login_stream="",logIn_candidate_manager="",logIn_candidate_manager_Id="",logIn_candidate_exam_type="",answeredQstns_Count = 1;


let blur_click_count = 0;
class UserExamPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            data :[],
            easy : [],
            medium : [],
            hard : [],
            displayItem_type : "medium",
            displayOptions: [],
            topic_count: 0,
            topics_report: {},
            showsubmiMsg: false,
            showModal : false,
            modal_msg : ''
        };
        this.onClick = this.onClick.bind(this);
       // this.escFunction = this.escFunction.bind(this);
       // this.contextMenu = this.contextMenu.bind(this);
        }
      /* escFunction(event){
            if((event.keyCode == 123) || (event.ctrlKey && event.keyCode == 82) || (event.keyCode == 116) || (event.keyCode == 13) || (event.ctrlKey && event.shiftKey && event.keyCode == 73) || (event.ctrlKey && event.keyCode == 67) || (event.keyCode == 116) || (event.keyCode == 44) ) {
              event.preventDefault();
              return false;
            } 
          }
          contextMenu(event){
            event.preventDefault();
          }*/
    componentDidMount(){
       // document.addEventListener("keydown", this.escFunction, false);
        //document.addEventListener("contextmenu",this.contextMenu,false);
         logIn_candidate = JSON.parse(sessionStorage.getItem("loginresponse")).data.name;
         logIn_sapId = JSON.parse(sessionStorage.getItem("loginresponse")).data.sapId;
         logIn_password = JSON.parse(sessionStorage.getItem("loginresponse")).data.password;
         login_stream = JSON.parse(sessionStorage.getItem("loginresponse")).data.stream;
         logIn_candidate_manager = JSON.parse(sessionStorage.getItem("loginresponse")).data.manager;
         logIn_candidate_manager_Id = JSON.parse(sessionStorage.getItem("loginresponse")).data.managerSapId;
         logIn_candidate_exam_type = JSON.parse(sessionStorage.getItem("loginresponse")).data.examType;

         sessionStorage.setItem(logIn_candidate,"{}");
        consoledated_report["name"] =  logIn_candidate;
        consoledated_report["sapId"] = logIn_sapId;
        consoledated_report["manager"] = logIn_candidate_manager;
        consoledated_report["managerSapId"] = logIn_candidate_manager_Id;
        consoledated_report["examType"] = logIn_candidate_exam_type;
        let data = this.state.data;
        let easy = this.state.easy;
        let medium = this.state.medium;
        let hard = this.state.hard;
        let username =logIn_sapId+"_user";
        let url = properties.properties.get_topics_api+login_stream+"&topic="+this.state.topic_count;
        window.this_obj = this;
        var self = this;
       /* window.addEventListener("blur", function(event){
            blur_click_count++;
            if(blur_click_count >1){
                let url = properties.properties.exam_submit;
                    if(consoledated_report.hasOwnProperty("topics") == false){
                        consoledated_report["topics"] = [];
                    }                                                       
                    if(window.this_obj.state.topics_report.hasOwnProperty("easy")== false){
                        window.this_obj.state.topics_report["easy"] = 0;
                    }
                    if(window.this_obj.state.topics_report.hasOwnProperty("medium")== false){
                        window.this_obj.state.topics_report["medium"] = 0;
                    }
                    if(window.this_obj.state.topics_report.hasOwnProperty("hard")== false){
                        window.this_obj.state.topics_report["hard"] = 0;
                    }
                    if(window.this_obj.state.topics_report.hasOwnProperty("examineeScore")== false){
                        window.this_obj.state.topics_report["examineeScore"] = 0;
                    }
                    if(window.this_obj.state.topics_report.hasOwnProperty("maximumScore")== false){
                        window.this_obj.state.topics_report["maximumScore"] = 0;
                    }
                    if(window.this_obj.state.topics_report.hasOwnProperty("topicName")== false){
                        window.this_obj.state.topics_report["topicName"] = window.this_obj.state[window.this_obj.state.displayItem_type][0].topic;
                    }
                    consoledated_report.topics.push(window.this_obj.state.topics_report);
                    sessionStorage.setItem(logIn_candidate, JSON.stringify(consoledated_report));

            if(sessionStorage.getItem(logIn_candidate) !== null){
                let final_report = JSON.parse(sessionStorage.getItem(logIn_candidate));
                if(final_report.topics != undefined && final_report != undefined){
                    for(let final_report_topic_iterate in final_report.topics){
                        for(let final_report_topic_keys in final_report.topics[final_report_topic_iterate]){
                            if(typeof final_report.topics[final_report_topic_iterate][final_report_topic_keys] !== "string"){
                                let val_tostring = final_report.topics[final_report_topic_iterate][final_report_topic_keys].toString();
                                final_report.topics[final_report_topic_iterate][final_report_topic_keys] = val_tostring;
                            }
                        }
                    }
            utils.postData(username,logIn_password,url,final_report,window.this_obj,function(res,self) {
                        console.log(res);
                        var path = window.location.host +`/ExamCompleted`;
                        location.replace("http://"+path);
                        alert("Submitted Successfully");
                        sessionStorage.clear();
                    });
            }else{
                sel.setState({error : true,showModal:true, modal_msg: "No topics answered yet.. submitted successfully"});
                //alert("No topics answered yet.. submitted successfully");
            }
                }else{
                    self.setState({error : true,showModal:true, modal_msg: "No questions answered Yet. Nothing is there to submit"});
                    //alert("No questions answered Yet. Nothing is there to submit");
                }
            }
            else{
                (event.target.innerText !== undefined && event.target.innerText == "Submit") ? null :
                self.setState({error:true, showModal:true, modal_msg : "Please don't click on any other Tab, window, browser or any other actions except this exam.\n It will make your exam submit and terminates."});
                //alert("Please don't click on any other Tab, window, browser or any other actions except this exam.\n It will make your exam submit and terminates.");
            }
        });*/

        utils.getData(username,logIn_password,url,this,function(res,self) {
            if(typeof res != "string" && res != ""){
                for(let items in res.data){
                let newObj = new Object();
                for(let inItems in res.data[items]){
                    (typeof res.data[items][inItems] == "object") ? newObj[inItems] =  Object.assign({},createFragment(res.data[items][inItems])) : newObj[inItems] = res.data[items][inItems];
                }
                if(newObj.type == "easy"){
                    easy.push(newObj);

                }else if(newObj.type == "medium"){
                    medium.push(newObj);
                }else{
                    hard.push(newObj);
                }
                data.push(newObj);
            }
            self.setState({data: data,easy : easy, medium: medium,hard: hard});
            }
        }); 
    }
/*componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
    document.removeEventListener("contextmenu", this.contextMenu, false);
  }*/
  
    onClick(e) {
        (answeredQstns_Count <this.state.data[0].totalTopics*3)?answeredQstns_Count++ : null;
        let d=this.state.count+1;
        this.setState({count: d});
        let calc_score = 0;
        let maxscore =Object.keys(this.state[this.state.displayItem_type][0].answers).length;
        let find_superElem = e.currentTarget.parentElement.parentElement.children;
        for(let superElem_Items in find_superElem){
            if(find_superElem[superElem_Items].className == "options_container"){
                var super_elem = find_superElem[superElem_Items].children;
                break;
            }
        }
        if(this.state.count <= 2){
        let ans_elem = this.state[this.state.displayItem_type][0].answers, ans_count =0;
        for(let item_iterat=0; item_iterat<super_elem.length; item_iterat++){
            let target_item = super_elem[item_iterat].children[0];
            if(target_item.checked){
                for(let ans_iterat in ans_elem){
                    if(target_item.value == this.state[this.state.displayItem_type][0].answers[ans_iterat]){
                        ans_count++;
                    }
                }
                if(Object.keys(ans_elem).length == 1){
                    break;
                }
            }


        }
        if(ans_count == Object.keys(this.state[this.state.displayItem_type][0].answers).length){
            let current_elem = this.state[this.state.displayItem_type][0].type;
            if(current_elem == "medium"){
                calc_score += ans_count*2;
                maxscore*=2;
                if(this.state.topics_report[current_elem] == undefined){
                    this.state.topics_report[current_elem] = calc_score;
                }else{
                    this.state.topics_report[current_elem]+=calc_score;
                }
                this.setState({displayItem_type : "hard"});
            }else if(current_elem == "easy"){
                calc_score +=ans_count* 1;
                maxscore*=1;
                if(this.state.topics_report[current_elem] == undefined){
                    this.state.topics_report[current_elem]=calc_score;
                }else{
                    this.state.topics_report[current_elem]+=calc_score;
                }
                this.setState({displayItem_type : "medium"});
            }else{
                calc_score +=ans_count* 3;
                maxscore*=3;
                if(this.state.topics_report[current_elem] == undefined){
                    this.state.topics_report[current_elem]=calc_score;
                }else{
                    this.state.topics_report[current_elem]+=calc_score;
                }
                this.setState({displayItem_type : "hard"});
            }
        }else if(ans_count!=0 && ans_count<Object.keys(this.state[this.state.displayItem_type][0].answers).length){
            let test = this.state.displayItem_type;
            let current_elem1 = this.state[test][0].type;
            if(current_elem1 == "medium"){
                calc_score +=ans_count* 2;
                maxscore*=2;
                if(this.state.topics_report[current_elem1] == undefined){
                    this.state.topics_report[current_elem1] = calc_score;
                }else{
                    this.state.topics_report[current_elem1]+=calc_score;
                }
                this.setState({displayItem_type : "easy"});
            }else if(current_elem1 == "hard"){
                calc_score +=ans_count* 3;
                maxscore*=3;
                if(this.state.topics_report[current_elem1] == undefined){
                    this.state.topics_report[current_elem1]=calc_score;
                }else{
                    this.state.topics_report[current_elem1]+=calc_score;
                }
                this.setState({displayItem_type : "medium"});
            }else{
                calc_score +=ans_count* 1;
                maxscore*=1;
                if(this.state.topics_report[current_elem1] == undefined){
                    this.state.topics_report[current_elem1]=calc_score;
                }else{
                    this.state.topics_report[current_elem1]+=calc_score;
                }
                this.setState({displayItem_type : "easy"});
            }
        }else{
            let test = this.state.displayItem_type;
            let current_elem1 = this.state[test][0].type;
            if(current_elem1 == "medium"){
                maxscore*=2;
                if(this.state.topics_report[current_elem1] == undefined){
                    this.state.topics_report[current_elem1] = 0;
                }else{
                    this.state.topics_report[current_elem1]+=0;
                }
                this.setState({displayItem_type : "easy"});
            }else if(current_elem1 == "hard"){
                maxscore*=3;
                if(this.state.topics_report[current_elem1] == undefined){
                    this.state.topics_report[current_elem1]=0;
                }else{
                    this.state.topics_report[current_elem1]+=0;
                }
                this.setState({displayItem_type : "medium"});
            }else{
                maxscore*=1;
                if(this.state.topics_report[current_elem1] == undefined){
                    this.state.topics_report[current_elem1]=0;
                }else{
                    this.state.topics_report[current_elem1]+=0;
                }
                this.setState({displayItem_type : "easy"});
            }
        }
        if(this.state.topics_report["maximumScore"]==undefined && this.state.topics_report["examineeScore"] == undefined && this.state.topics_report["topicName"]==undefined){
            this.state.topics_report["maximumScore"] = maxscore;
            this.state.topics_report["examineeScore"] = calc_score;
            this.state.topics_report["topicName"] = this.state[this.state.displayItem_type][0].topic;
        }else{
            this.state.topics_report["maximumScore"] += maxscore;
            this.state.topics_report["examineeScore"] += calc_score;
        }
        console.log("beforeShift:", this.state[this.state.displayItem_type]);
        this.state[this.state.displayItem_type].shift();
        console.log("After Shift:", this.state[this.state.displayItem_type]);
        console.log("state count:", this.state.count);
        if(this.state.count == 2){
            if(consoledated_report.hasOwnProperty("topics") == false){
                consoledated_report["topics"] =[];
            }
            
            if(this.state.topics_report.hasOwnProperty("easy")== false){
                this.state.topics_report["easy"] = 0;
            }if(this.state.topics_report.hasOwnProperty("medium")== false){
                this.state.topics_report["medium"] = 0;
            }if(this.state.topics_report.hasOwnProperty("hard")== false){
                this.state.topics_report["hard"] = 0;
            }
                consoledated_report.topics.push(this.state.topics_report);
                sessionStorage.setItem(logIn_candidate, JSON.stringify(consoledated_report));
                if(this.state.topic_count == this.state.data[0].totalTopics-1){
                    let username =logIn_sapId+"_user";
                    let url =properties.properties.exam_submit;
                    let final_report = JSON.parse(sessionStorage.getItem(logIn_candidate));
                    for(let final_report_topic_iterate in final_report.topics){
                        for(let final_report_topic_keys in final_report.topics[final_report_topic_iterate]){
                            if(typeof final_report.topics[final_report_topic_iterate][final_report_topic_keys] !== "string"){
                                let val_tostring = final_report.topics[final_report_topic_iterate][final_report_topic_keys].toString();
                                final_report.topics[final_report_topic_iterate][final_report_topic_keys] = val_tostring;
                            }
                        }
                    }
                    utils.postData(username,logIn_password,url,final_report,this,function(res,self) {
                        console.log(res);
                        self.setState({showModal:true, modal_msg : "Submitted Successfully"});
                        sessionStorage.clear();
                        let path = `/ExamCompleted`;
                        self.props.history.push(path);

                    });
                }
            else{
                let topic_count_increment=this.state.topic_count+1;
                this.setState({topic_count: topic_count_increment});
                console.log("this.state.topic_count:",this.state.topic_count);
            this.setState({ data:{},count:0,easy:[],medium: [],hard:[], topics_report: {}});
        let username =logIn_sapId+"_user";
        let url = properties.properties.get_topics_api+login_stream+'&topic='+topic_count_increment;
        utils.getData(username,logIn_password,url,this,function(res,self) {
            if(typeof res != "string" && res != ""){
                let easy = [], hard = [], medium = [],data = [];
                for(let items in res.data){
                    let newObj = new Object();
                    for(let inItems in res.data[items]){
                        (typeof res.data[items][inItems] == "object") ? newObj[inItems] =  Object.assign({},createFragment(res.data[items][inItems])) : newObj[inItems] = res.data[items][inItems];
                    }
                   if(newObj.type == "easy"){
                    easy.push(newObj);
    
                }else if(newObj.type == "medium"){
                    medium.push(newObj);
                }else{
                    hard.push(newObj);
                }
                data.push(newObj);
                }
                self.setState({data: data,easy : easy, medium: medium,hard: hard});
            }

      
    });
            }
            
        }
    }
    }
getOptions() {
      let optionItems = [], opt_prefix=["A", "B", "C", "D"];
      let radio_name = "option"+this.state.count;
      let opt_count = 0, item_options = this.state[this.state.displayItem_type][0].options;
      for (let opkey in item_options) {
          (Object.keys(this.state[this.state.displayItem_type][0].answers).length >1) ?
           (optionItems.push(<div key={opkey} id = {opt_count}><input type="checkbox" value={opt_prefix[opt_count]} ref ={opt_prefix[opt_count]} />{opt_prefix[opt_count]}) {this.state[this.state.displayItem_type][0].options[opkey]}</div>),opt_count++)
           :(optionItems.push(<div key={opkey} id = {opt_count}><input type="radio" name = {radio_name} value={opt_prefix[opt_count]} ref ={opt_prefix[opt_count]} />{opt_prefix[opt_count]}) {this.state[this.state.displayItem_type][0].options[opkey]}</div>),opt_count++);
      }
      for(let checkItems in this.refs){
        if(this.refs[checkItems].checked){
            this.refs[checkItems].checked = false;
        }
     }
    return optionItems;
  }
  hideModal(){
    this.setState({showModal : false});
}
    render(){
        let modal_classname = (this.state.error) ? "error_modal" : "static-modal";
        let glyphicon_classname = (this.state.error) ? "glyphicon glyphicon-remove" : "glyphicon glyphicon-ok";
        return(
            <div>
            {(this.state.showModal)? <div className={modal_classname}>
                <Modal.Dialog>

                    <Modal.Body>{this.state.modal_msg}<span className={glyphicon_classname}></span></Modal.Body>

                    <Modal.Footer>
                    <Button onClick = {this.hideModal.bind(this)}>Close</Button>
                    </Modal.Footer> 
                </Modal.Dialog>
            </div>: null}
            <div className="jumbotron">
                
                {this.state.data.length>0 && this.state.easy.length>0 && this.state.medium.length>0 && this.state.hard.length>0 ?
                   <div>
                       <h4>Questions:{answeredQstns_Count}/{this.state.data[0].totalTopics*3}</h4>
                    <div id="questions_container"><pre>{this.state[this.state.displayItem_type][0].question}</pre></div>
                    <div className="options_container">
                    {
                       this.getOptions()
                    }
                    </div>
                    {(this.state.topic_count!= this.state.data[0].totalTopics-1) || (this.state.topic_count == this.state.data[0].totalTopics-1 && this.state.count<2) ? <div id="nxt_btn"><button onClick={this.onClick} className="btn btn-primary btn-lg">Next</button></div>
            : <div><button className="btn btn-primary btn-lg" onClick={this.onClick}>Submit</button></div>}
                    </div>
                :(this.state.showsubmiMsg)? 
                <div className="jumbotron">
                    <h2>Thanks for your attempt.Please contact admin for your scores.</h2>
                </div> :
                null}
            </div>
            </div>
            ); 
        
}
}

export default UserExamPage;
