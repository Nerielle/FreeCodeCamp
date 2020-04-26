const projectName = 'pomodoro-clock';
const breakInterval = 'Break';
const sessionInterval = 'Session';
const sessionLength = 25;
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
        this.beep = this.beep.bind(this);
        
    }
    getInitialState(){
       
       return {
              breakLength: 5,
              sessionLength: sessionLength,
              timer: sessionLength * 60,
              interval: sessionInterval,
              intervalId: 0
              
       };
    }
            
    onResetTimer(){
        if(this.state.intervalId !== 0){
            
            this.onTimerStop();
        }
        this.setState(this.getInitialState());
        this.audio.currentTime = 0;
        this.audio.pause();
    }
    onTimerStart() {
        if (this.state.intervalId !== 0) {
            this.onTimerStop();
            return;
        }
        var intervalId = setInterval(this.timer, 1000);
        this.setState({
            intervalId: intervalId
        });
    }
    onTimerStop() {
        clearInterval(this.state.intervalId);
        this.setState({
            intervalId: 0
        })
    }
    beep() {
        this.audio.currentTime = 0;
        this.audio.play();
    }
    timer (){
         if(this.state.timer === 0)
          {
              this.beep();
          }
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

        this.setState({breakLength: value});
    }
    onSessionLengthChange(value){

        this.setState({sessionLength: value, timer: value * 60});
    }
    
    render(){
        return(
        <React.Fragment>
        <SettingCmp id='break' value={this.state.breakLength}  handleInput={this.onBreakLengthChange}/>
        <SettingCmp id='session' value={this.state.sessionLength} handleInput={this.onSessionLengthChange}/>
        <TimerCmp interval={this.state.interval} timer={this.state.timer} onStart = {this.onTimerStart}
            onReset = {this.onResetTimer}
            isRunning={this.state.intervalId !== 0}/>
                        <audio id='beep' preload='auto' src='https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Bleeps%20Blips%20Blonks%20Blarts%20and%20Zaps/903[kb]alien-system-beep.wav.mp3'   ref={(audio) => { this.audio = audio; }} ></audio>

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
         <div className = { this.props.id }>
            <label id={this.props.id + '-label'}>{this.props.id + ' length'} </label>
            <div className='setting'>
                <button id={this.props.id + '-decrement'} onClick={this.decrement} disabled={this.props.value === 1}><i className="fas fa-angle-down"></i></button>
                <input type='text' id={this.props.id + '-length'} value={this.props.value} onChange={this.handle}/>
                <button id={this.props.id + '-increment'}  onClick={this.increment} disabled={this.props.value === 60}><i className="fas fa-angle-up"></i></button>
            </div>
        </div>
        );
    }
}
class TimerCmp extends React.Component{
    constructor(props){
       super(props); 
     
    }

    render(){
        return (
                     <div className='timer'>
            <div id='timer-label'>{this.props.interval}</div>
            <div id='time-left'>{secondsToHms(this.props.timer)}</div>
                <div className='buttons'>
                   <button id='start_stop' onClick = {this.props.onStart}>{this.props.isRunning ? 'Stop':'Start'}</button>
                   <button id='reset' onClick={this.props.onReset}>Reset </button>
                </div>
            </div>
        );
    }
}

 function secondsToHms(seconds) {
        var m = Math.floor(seconds / 60);
        var s = Math.floor(seconds % 60);
        var r = (m < 10 ? '0' : '') + m +
            ':' + (s < 10 ? '0' : '') + s;

        return r;
    }
var container = document.getElementById('container');
ReactDOM.render(<PomodoroClockCmp />, container);

