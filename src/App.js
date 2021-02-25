import { Component } from 'react';
import DynamicForm from './components/DynamicForm'
import './App.css';


class App extends Component{
  onSubmit(model){
    alert(JSON.stringify(model));
  }
  render(){
  var data = require('./Payload/dummy_payload.json');
  var dataforForms = {}
  data["field"].map((m)=>{
    if(!(m.fieldData.sectionName in dataforForms)){
      dataforForms[m.fieldData.sectionName]=[];
    }
    dataforForms[m.fieldData.sectionName]=[...dataforForms[m.fieldData.sectionName], m];
  });

  Object.keys(dataforForms).map(function(keyName,keyIndex){
      dataforForms[keyName].sort((a,b) =>(a.fieldData.order > b.fieldData.order) ? 1:-1);
  });
  return (
    <div style={{ textAlign: "left" }} className="App">
    <DynamicForm
      model = {dataforForms}
      onSubmit = {(model)=> {this.onSubmit(model)}}>
    </DynamicForm>
    </div> 
  );
  }
}

export default App;
