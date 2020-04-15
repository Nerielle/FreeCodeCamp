const projectName = "javascript-calculator";

class NumBtn extends React.Component {
    
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.click(this.props.value);
    }
    render(){
        return (
        <div className='button' onClick={this.handleClick}>{this.props.value}</div>
            );
    }
}
class OperationBtn extends React.Component {
    
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.click(this.props.value);
    }
    render(){
        return(
        <div className='button' onClick={this.handleClick}>{this.props.value}</div>
        );
    }
}
  function getRecentString(state){
        if(state.numbers.length === 0)
            return '';
        return 'not implemented';
    }
class Calculator extends React.Component {
    
    constructor(props){
        super(props);
        this.state ={
            operations:[],
            numbers:[],
            
        };
        this.update  = this.update.bind(this);
    }
     update(e){
        console.log('update ', this.state, e);
        //this.setState();
    }
    
    render(){
       let recent = getRecentString(this.state);
        console.log(recent);
        let current = recent === '' ? 0 : this.state.numbers[this.state.numbers.length -1];
        console.log(current);
        return (
            <React.Fragment>
    
        <div id='display'>
            <div>{recent}</div>
            <div>{current}</div>
        </div>
        <OperationBtn id='clear' value='AC' click={this.update}/>
        <NumBtn id='zero' value='0'  click={this.update}/>
        <NumBtn id='one'  value='1'  click={this.update}/>
        <NumBtn id='two'  value='2'  click={this.update}/>
        <NumBtn id='three'  value='3'  click={this.update}/>
        <NumBtn id='four'  value='4'  click={this.update}/>
        <NumBtn id='five'  value='5'  click={this.update}/>
        <NumBtn id='six'  value='6' click={this.update}/>
        <NumBtn id='seven'  value='7' click={this.update}/>
        <NumBtn id='eight'  value='8' click={this.update}/>
        <NumBtn id='nine'  value='9' click={this.update}/>
        <OperationBtn id='add'  value='+' click={this.update}/>
        <OperationBtn id='subtract'  value='-' click={this.update}/>
        <OperationBtn id='multiply'  value='*' click={this.update}/>
        <OperationBtn id='divide'  value='/' click={this.update}/>
        <OperationBtn id='equals'  value='=' click={this.update}/>
            </React.Fragment>
    
        );
    }
}

var container = document.getElementById('container');
ReactDOM.render(<Calculator />, container);