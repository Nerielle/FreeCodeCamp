const projectName = 'pomodoro-clock';
const intervals=['session', 'break'];
class PomodoroClockCmp extends React.Component{
    constructor(props){
       super(props); 
          this.state = {
              breakLength: 1,
              sessionLength: 1,
           timer: 1
              
       };
        
        this.onBreakLengthChange = this.onBreakLengthChange.bind(this);
        this.onSessionLengthChange = this.onSessionLengthChange.bind(this);
    }
    
    onBreakLengthChange(value){
//        let newState = this.state;
//        newState.breakLength = value;
//        this.setState(newState);
        console.log(this.state);
        this.setState({breakLength: value});
    }
    onSessionLengthChange(value){
        console.log(this.state);
//        let newState = this.state;
//        newState.sessionLength =value;
//        this.setState(newState);
          this.setState({sessionLength: value});
    }
    
    render(){
        return(
            <React.Fragment>
        <label id='break-label'>Break Length</label>
        <SettingCmp id='break' value={this.state.breakLength}  handleInput={this.onBreakLengthChange}/>
        <label id='session-label'>Session Length</label>
        <SettingCmp id='session' value={this.state.sessionLength} handleInput={this.onSessionLengthChange}/>
        <TimerCmp interval={this.state.interval} timer={this.state.timer}/>
        </React.Fragment>
        );

    }
}
class SettingCmp extends React.Component{
    constructor(props){
       super(props); 
        this.handle = this.handle.bind(this);
        this.decrement = this.decrement.bind(this);
        this.increment = this.increment.bind(this);
    }
    handle(e){
        console.log('handle');
        this.props.handleInput(e.target.value);
        
    }
    decrement(){
        this.props.handleInput(this.props.value - 1);
    }
    increment(){
        this.props.handleInput(this.props.value + 1);
    }
    render(){
        return (
            <React.Fragment>
        <button id={this.props.id + 'decrement'} onClick={this.decrement} disabled={this.props.value === 1}>Dec</button>
        <input type='text' id={this.props.id + '-length'} value={this.props.value} onChange={this.handle}/>
        <button id={this.props.id + 'increment'}  onClick={this.increment}>Inc</button>
           </React.Fragment>
        );
    }
}
class TimerCmp extends React.Component{
    constructor(props){
       super(props); 
     
    }
    render(){
        return (
                    <React.Fragment>
            <div id='timer-label'>{this.props.interval}</div>
            <div id='time-left'>{this.props.timer}</div>
   <button id='start_stop'>Start</button>
   <button id='reset'>Reset </button>
               </React.Fragment>
        );
    }
}
var container = document.getElementById('container');
ReactDOM.render(<PomodoroClockCmp />, container);
//class ButtonCmp extends React.Component{
//    constructor(props){
//       super(props); 
//    }
//    render(){
//        return (
//        <button >{this.props.command}</button>
//        );
//    }
//}
