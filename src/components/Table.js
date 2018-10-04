import React, { Component } from 'react';
import './Table.css';

class Table extends Component {
  constructor(props){
    super(props);
    this.state = this.props.table;

    this.changeTitle = this.changeTitle.bind(this);
    this.addAttribute = this.addAttribute.bind(this);
    this.removeAttribute = this.removeAttribute.bind(this);
    this.changeAttributeTitle = this.changeAttributeTitle.bind(this);
  }

  render() {
    return (
      <div className="Table card p-2" style={{top:this.state.y,left:this.state.x}}>
        <div className="table-title-bar d-flex align-items-center">
            <h2 className="table-title">{this.state.title}</h2>
            <i className="table-title-change fas fa-pen mx-2 text-secondary" onClick={this.changeTitle}></i>
        </div>
        <div className="table-attributes">
        {
          this.state.attributes.map((a,i)=>{
            return (
              <div key={i} className="table-attribute d-flex align-items-center my-2">
                <input className="table-attribute-title form-control mr-2" onChange={(e)=>{this.changeAttributeTitle(e,i)}} value={a.title}/>
                <select className="table-attribute-type custom-select mr-2">
                  {
                    ["VARCHAR","INT","BOOLEAN"].map((type,ti)=>{
                      return <option key={ti} selected={this.state.attributes[i].type === type} value={type}>{type}</option>
                    })
                  }
                </select>
                <i className="table-attribute-remove fas fa-minus mr-2 ml-auto text-secondary" onClick={()=>{this.removeAttribute(i)}}></i>
              </div>
            )
          })
        }
        </div>
        <div className="table-settings d-flex justify-content-end">
          <i className="table-attribute-add fas fa-plus mx-2 text-secondary" onClick={this.addAttribute}></i>
        </div>
      </div>
    );
  }

  addAttribute(){
    this.setState({attributes:[...this.state.attributes,{title:prompt("Attribute name"),type:"VARCHAR"}]})
  }

  removeAttribute(i){
    let {attributes} = this.state;
    attributes.splice(i,1);
    this.setState({attributes})
  }

  changeAttributeTitle(e,i){
    let {attributes} = this.state;
    attributes[i].title = e.target.value;
    this.setState({attributes});
  }

  changeAttributeType(e,i){

  }

  changeTitle(){
    let title = prompt("Change title...");
    if (title !== "" && title)
      this.setState({title});
  }


}

export default Table;
