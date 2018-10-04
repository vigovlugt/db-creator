import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tables:[{title:"test",x:20,y:20}],
      contextMenu:{
        display:"none",
        x:0,
        y:0
      }
    }

    this.showContextMenu = this.showContextMenu.bind(this);
    this.createTable = this.createTable.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div id="main" onContextMenu={(e)=>{this.showContextMenu(e,"block")}} onClick={(e)=>{this.showContextMenu(e,"none")}} >
        
          <div className="tables">
            {
              this.state.tables.map((t,i)=>{
                return <Table key={i} table={t}/>
              })
            }
          </div>

          <div className="context-menu card p-2" style={{display:this.state.contextMenu.display,top:this.state.contextMenu.y,left:this.state.contextMenu.x}}>
            <div className="list-group">
              <a href="/" className="context-menu-item create-table list-group-item-action text-body" onClick={this.createTable}><b>Create new table</b></a>
            </div>
            
          </div>
        </div>
      </div>
    );
  }

  showContextMenu(e,display){
    e.preventDefault();
    this.setState({contextMenu:{display}});
    if(display==="block")
      this.setState({contextMenu:{x:e.clientX,y:e.clientY}})
  }

  createTable(e){
    e.preventDefault();
    this.setState({tables:[...this.state.tables,{title:prompt("Table name"),x:this.state.contextMenu.x,y:this.state.contextMenu.y}]})
  }
}

export default App;
