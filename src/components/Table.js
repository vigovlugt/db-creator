import React, { Component } from 'react';
import './Table.css';

class Table extends Component {
  constructor(props){
    super(props);
    this.state = this.props.table;

    this.changeTitle = this.changeTitle.bind(this);
  }

  render() {
    return (
      <div className="Table card p-2" style={{top:this.state.y,left:this.state.x}}>
        <div className="table-title-bar d-flex align-items-center">
            <h2 className="table-title">{this.state.title}</h2>
            <i className="table-title-change fas fa-pen mx-2 text-secondary" onClick={this.changeTitle}></i>
        </div>
        <div className="table-attributes">
        
        </div>
        <div className="table-settings d-flex justify-content-end">
          <i className="table-attribute-add fas fa-plus mx-2 text-secondary" onClick={()=>{}}></i>
        </div>
      </div>
    );
  }

  changeTitle(){
    let title = prompt("Change title...");
    this.setState({title});
  }


}

export default Table;
