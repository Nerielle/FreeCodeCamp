const projectName = 'pomodoro-clock';
const intervals=['session', 'break'];
const breakInterval = 'Break';
const sessionInterval = 'Session';

class PomodoroClockCmp extends React.Component{
    constructor(props){
       super(props); 
          this.state = this.getInitialState();
        
        this.onBreakLengthChange = this.onBreakLengthChange.bind(this);
        this.onSessionLengthChange = this.onSessionLengthChange.bind(this);
        this.onTimerStart = this.onTimerStart.bind(this);
        this.onTimerStop = this.onTimerStop.bind(this);
        this.onResetTimer = this.onResetTimer.bind(this);
        this.timer = this.timer.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        
    }
    getInitialState(){
        let session = 25;
       return {
              breakLength: 5,
              sessionLength: session,
              timer: session * 60,
              interval: sessionInterval,
              intervalId: 0
              
       };
    }
            
    onResetTimer(){
        if(this.state.intervalId !== 0){
            this.onTimerStop();
        }
        this.setState(this.getInitialState());
    }
    onTimerStart(){   
        if (this.state.intervalId !== 0) {
            this.onTimerStop();
            return;
       }        
        var intervalId = setInterval(this.timer,1000);
        this.setState({intervalId: intervalId});
    }
    
    onTimerStop(){
 
            clearInterval(this.state.intervalId);
            this.setState({intervalId: 0})
        
    }
    
    timer (){
         if(this.state.timer === 0 && this.state.interval === sessionInterval){
            this.setState({timer: this.state.breakLength * 60, interval: breakInterval});
            
         }  
         else if(this.state.timer === 0 && this.state.interval === breakInterval){
            this.setState({timer: this.state.sessionLength * 60, interval: sessionInterval});
             
         }   
         else{
             this.setState({timer: this.state.timer - 1});
         }
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
          this.setState({sessionLength: value, timer: value * 60});
    }
    
    render(){
        return(
            <React.Fragment>
        <label id='break-label'>Break Length</label>
        <SettingCmp id='break' value={this.state.breakLength}  handleInput={this.onBreakLengthChange}/>
        <label id='session-label'>Session Length</label>
        <SettingCmp id='session' value={this.state.sessionLength} handleInput={this.onSessionLengthChange}/>
        <TimerCmp interval={this.state.interval} timer={this.state.timer} onStart = {this.onTimerStart}
            onReset = {this.onResetTimer}
            isRunning={this.state.intervalId !== 0}/>
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
        <button id={this.props.id + '-decrement'} onClick={this.decrement} disabled={this.props.value === 1}>Dec</button>
        <input type='text' id={this.props.id + '-length'} value={this.props.value} onChange={this.handle}/>
        <button id={this.props.id + '-increment'}  onClick={this.increment} disabled={this.props.value === 59}>Inc</button>
           </React.Fragment>
        );
    }
}
class TimerCmp extends React.Component{
    constructor(props){
       super(props); 
        this.state = {
            timer: secondsToHms(this.props.timer * 60)
        };
      //this.getInterval = this.getInterval.bind(this);
    }

    render(){
        return (
                    <React.Fragment>
            <div id='timer-label'>{this.props.interval}</div>
            <div id='time-left'>{secondsToHms(this.props.timer)}</div>
   <button id='start_stop' onClick = {this.props.onStart}>{this.props.isRunning ? 'Stop':'Start'}</button>
   <button id='reset' onClick={this.props.onReset}>Reset </button>
               </React.Fragment>
        );
    }
}

 function secondsToHms(seconds) {

        var h = Math.floor(seconds / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 3600 % 60);
        var r = h > 0 ? h + ':' : '' +
            (m < 10 ? '0' : '') + m +
            ':' + (s < 10 ? '0' : '') + s;

        return r;
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
