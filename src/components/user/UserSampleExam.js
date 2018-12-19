import React from 'react';
import * as properties from '../common/properties';
import * as SampleExam from './SampleExam';

class UserSampleExam extends React.Component{
    constructor(props){ 
        super(props);
        this.state = {
            count: 0,
            data :SampleExam.SampleExam,
                showelem: false,
            }
            this.routeChange = this.routeChange.bind(this);
        }
        getOptions() {

              let optionItems = [], opt_prefix=["A", "B", "C", "D"];
              let radio_name = "option"+this.state.count;
              let opt_count = 0, item_options = this.state.data[this.state.count].options;
              for (let opkey in item_options) {
                  (Object.keys(this.state.data[this.state.count].answers).length >1) ?
                   (optionItems.push(<div key={opkey} id = {opt_count}><input type="checkbox" value={opt_prefix[opt_count]} ref ={opt_prefix[opt_count]} />{opt_prefix[opt_count]}) {this.state.data[this.state.count].options[opkey]}</div>),opt_count++)
                   :(optionItems.push(<div key={opkey} id = {opt_count}><input type="radio" name = {radio_name} value={opt_prefix[opt_count]} ref ={opt_prefix[opt_count]} />{opt_prefix[opt_count]}) {this.state.data[this.state.count].options[opkey]}</div>),opt_count++);
              }
              for(let checkItems in this.refs){
                 if(this.refs[checkItems].checked){
                     this.refs[checkItems].checked = false;
                 }
              }
            return optionItems;
          }
          show(e){
            this.setState({showelem: true});
          }
          count_increment(a){
            this.setState({count: this.state.count+1});
          }
          routeChange(){
            let path = properties.properties.user_exam_page;
                this.props.history.push(path);
            }
    render(){
        return(
            <div className="jumbotron">
            {(this.state.showelem)?
            
            <div className="sample_qstns">
            <div>
                <div id="questions_container"><pre>{this.state.data[this.state.count].question}</pre></div>
                <div className="options_container">
                    {
                       this.getOptions()
                    }
                    </div>
                    {this.state.count!= this.state.data.length-1 ? <div id="nxt_btn"><button onClick={this.count_increment.bind(this)} className="btn btn-primary btn-lg">Next</button></div>
            : <div><button className="btn btn-primary btn-lg" onClick = {this.routeChange.bind(this)}>Start Exam</button></div>}
            </div>
            </div>
            : 

            <div className="instructions">
            <h1> Instructions</h1>
            <ul> 
                <li>Please read all the given INSTRUCTIONS carefully, before going to attempt the test</li>
                <li>Few of questions will have multiple answers. Please look it carefully before answer.</li>
                <li>Total Questions and Answred questions are shown in top of questions</li>
                <li style = {{color : "red"}}>Please don't try to open any <b>Other applications,Next Tab, Next Window, Other Browser, 
                    Browser refresh, Browser backward, URL refresh, Minimize, Maximize</b>. Which will cause your exam submits automatically.</li>
                <li style = {{color : "red"}}>Strictly prohibited the malpractices</li>
                <li>Based on the complexity, questions will be displayed.</li>
               <li>There is no PREVIOUS option while exam is in process. So, please try to check your answer twice before click on NEXT</li>
                <li>Please contact admin for scores or for any other issues which your facing in this test.</li>
                <li>All The Best and go ahead</li>
               </ul>
                <button className="btn btn-primary btn-lg" onClick={this.show.bind(this)}>Continue</button>
            </div>}
            </div>
        );
    }
}

export default UserSampleExam;

