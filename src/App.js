import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import tablesToSql from './SQLGenerator';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      tables:[{title:"test",attributes:[{title:"id",type:"INT"}],x:20,y:20}],
      contextMenu:{
        display:"none",
        x:0,
        y:0
      },
      tableDraggingIndex:-1
    }

    this.showContextMenu = this.showContextMenu.bind(this);
    this.createTable = this.createTable.bind(this);
    this.onStartDragTable = this.onStartDragTable.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.exportSql = this.exportSql.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div id="main" onMouseUp={this.mouseUp} onMouseMove={this.mouseMove} onContextMenu={(e)=>{this.showContextMenu(e,"block")}} onClick={(e)=>{this.showContextMenu(e,"none")}} >
        
          <div className="tables">
            {
              this.state.tables.map((t,i)=>{
                return <Table key={i} table={t} onStartDrag={()=>{this.onStartDragTable(i)}} syncTable={(table)=>{this.syncTable(i,table)}}/>
              })
            }
          </div>

          <div className="context-menu card p-2" style={{display:this.state.contextMenu.display,top:this.state.contextMenu.y,left:this.state.contextMenu.x}}>
            <div className="list-group">
              <a href="/" className="context-menu-item create-table list-group-item-action text-body" onClick={this.createTable}><b>Create new table</b></a>
              <a href="/" className="context-menu-item create-table list-group-item-action text-body" onClick={this.exportSql}><b>Export to SQL</b></a>
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

  onStartDragTable(i){
    this.setState({tableDraggingIndex:i});
  }

  mouseUp(){
    this.setState({tableDraggingIndex:-1});
  }

  mouseMove(e){
    if(this.state.tableDraggingIndex !== -1){
      let tables = this.state.tables;
      tables[this.state.tableDraggingIndex].x = e.clientX;
      tables[this.state.tableDraggingIndex].y = e.clientY;
      this.setState({tables});
    }
  }

  createTable(e){
    e.preventDefault();
    let table = {title:prompt("Table name"),attributes:[{title:"id",type:"INT"}],x:this.state.contextMenu.x,y:this.state.contextMenu.y}
    this.setState({tables:[...this.state.tables,table]});
  }

  syncTable(i,table){
    let tables = this.state.tables;
    tables[i] = table;
    this.setState({tables});
  }

  exportSql(){
    let sql = tablesToSql(this.state.tables);
    alert(sql);
  }

}

export default App;
