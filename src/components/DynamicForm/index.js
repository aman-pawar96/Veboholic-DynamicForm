import React,{ useState } from 'react';
import ReactDom from 'react-dom';
import './form.css'

export default class DynamicForm extends React.Component {
    constructor(props){
        super(props);
        this.state={

        };
        this.renderForm =this.renderForm.bind(this);
        this.renderOptions =this.renderOptions.bind(this);
        this.renderSection =this.renderSection.bind(this);
        this.onSubmit =this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    
    onSubmit(e){
        if(this.props.onSubmit) this.props.onSubmit(this.state);
    }

    onChange(e, key){
        console.log(key);
        console.log(e.target.value);
        console.log(this[key].value);
        this.setState({
            [key]:e.target.value
        }, ()=> {
            
            console.log("The State is:");
            console.log(this.state);
        });
        
    }

    renderOptions(OptionList) {
        OptionList.sort((a,b)=>(a.order>b.order) ? 1:-1)
        let Options =OptionList.map((m)=>{
            return(
                <option name={m.optionLabel}>{m.optionLabel}</option>
            )
        });

        return Options;
    }

    
    renderForm(keyName){
        let FormUi = this.props.model[keyName].map((m)=>{
            let dataSet = m.fieldData;
            let key = dataSet.resource+dataSet.fieldName;
            let type = dataSet.type || "singleLine";
            if(type ==="singleLine"){
                return(
                    <div key={key}>
                         <label
                            key ={"l" +dataSet.resource+dataSet.fieldName}
                            htmlFor ={dataSet.resource+dataSet.fieldName}>
                                {dataSet.fieldLabel}
                         </label>
                         <input
                            required={dataSet.resource+dataSet.fieldName}
                            type="text" 
                            key= {"i" +dataSet.resource+dataSet.fieldName}
                            ref= {(key)=>{this[dataSet.resource+dataSet.fieldName]=key}}
                            onChange= {(e)=> this.onChange(e,key)} 
                         />

                    </div>
                );
            }
            else if(type ==="dropDown" || type ==="multiSelect"){
                var OptionList=dataSet.option;
                var DefaultOption = OptionList[0].optionLabel;
                if(!this.state[key]){
                    this.setState({
                        [key]:DefaultOption
                    })
                }
                return(
                    <div key={key}>
                         <label
                            key ={"l" +key}
                            htmlFor ={key}>
                                {dataSet.fieldLabel}
                         </label>
                         <select
                            required={dataSet.required}
                            key= {"i" +dataSet.resource+dataSet.fieldName}
                            ref= {(key)=>{this[dataSet.resource+dataSet.fieldName]=key}}
                            onChange= {(e)=> this.onChange(e,key)}>
                            {this.renderOptions(OptionList)}
                        </select>

                    </div>
                );

            }
            else if( type ==="multiLine")
            {
                return(
                    <div key={key}>
                         <label
                            key ={"l" +key}
                            htmlFor ={key}>
                                {dataSet.fieldLabel}
                         </label>
                         <textarea required={dataSet.required} key= {"i" +dataSet.resource+dataSet.fieldName}
                            ref= {(key)=>{this[dataSet.resource+dataSet.fieldName]=key}}
                            onChange= {(e)=> this.onChange(e,key)}></textarea>

                    </div>
                );
            }

            
        });
        return FormUi;
    }
    
    renderSection (){
        let SectionUI = Object.keys(this.props.model).map(keyName => {
            return(
                <div>
                <h3>{keyName}</h3>
                    {this.renderForm(keyName)}
                </div>
            );

        });
        return SectionUI;
    }

    render() {
        return(
            <div>
                <form onSubmit={(e) => this.onSubmit(e,this.state)}>
                {this.renderSection()}
                <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}