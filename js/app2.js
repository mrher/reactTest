'use strict';
const app = document.getElementById('program');

class Check extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true
        };
        this.handleCheck = this.handleCheck.bind(this);
    }
    handleCheck(){
        this.setState({
            checked: !this.state.checked
        })
    }
    render() {
        var message;
        if(this.state.checked){
            message = 'checked';
        }else{
            message = 'does not checked';
        }
        return (
            <div>
                <input 
                onChange={this.handleCheck} 
                type="checkbox" 
                defaultChecked={this.state.checked} />
                <p>checkbox {message}</p>
            </div>
        )
    }
}

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
    }
    edit(){
        this.setState({
            edit: true
        })
    }
    save(){
        var value = this.refs.newText.value;
        this.props.update(this.refs.newText.value, this.props.index)
        this.setState({
            edit: false
        })
    }
    remove(){
        this.props.deleteBlock(this.props.index);
    }
    rendNorm(){
        return (
            <div className='box'>
                <div className='text'>{this.props.children}</div>
                <button onClick={this.edit} className='btn light'>edit</button>
                <button onClick={this.remove} className='btn red'>delete</button>
            </div>
        );
    }
    rendEdit(){
        return (
            <div className='box'>
                <textarea ref='newText' defaultValue={this.props.children}></textarea>
                <button onClick={this.save} className='btn success'>save</button>
            </div>
        );
    }
    render() {
        if(this.state.edit){
            return this.rendEdit();
        }else{
            return this.rendNorm();
        }
    }
}

class Field extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
        this.updateText = this.updateText.bind(this);
        this.deleteBlock = this.deleteBlock.bind(this);
        this.eachTask = this.eachTask.bind(this);
        this.add = this.add.bind(this);
    }
    add(text){
       var arr = this.state.tasks;
       arr.push(text);
       this.setState({tasks: arr});
    }
    eachTask(item, i){
        return (
            <Task key={i} index={i} update={this.updateText} deleteBlock={this.deleteBlock}>
                {item}
            </Task>
        )
    }
    deleteBlock(index){
        var arr = this.state.tasks;
        arr.splice(index, 1);
        this.setState({tasks: arr});
    }
    updateText(text, index){
        var arr = this.state.tasks;
        arr[index] = text;
        this.setState({tasks: arr});
    }
    render(){
        return(
            <div className='field'>
            <button onClick={this.add.bind(null,'Текст по таску')} className='btn new'>new task</button>
                {
                    this.state.tasks.map(this.eachTask)
                }
            </div>
        )
    }
}

ReactDOM.render(
  <div className='field'>
      <Field />
      <Check />
  </div>,
  app
);