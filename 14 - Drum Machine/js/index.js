
const projectName='drum-machine'
localStorage.setItem('example_project','Drum Machine');
 const pads = [
       {
         id: 'q_pad',
         key: 'Q',
           code:81,
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/95[kb]wersi-bdhh1.aif.mp3'
     },
     {
        id: 'w_pad',
         key: 'W',
         code:87,
        clip: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/33[kb]wersi-bd1.aif.mp3'
     },
   
     {
         id: 'e_pad',
         key: 'E',
         code: 69,
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/48[kb]wersi-hh2.aif.mp3'
     },
     {
         id: 'a_pad',
         key: 'A',
         code: 65,
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/63[kb]wersi-hh3.aif.mp3'
     },
     
     {
         id: 's_pad',
         key: 'S',
         code: 83,
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/34[kb]wersi-sd2.aif.mp3'
     },
     {
         id: 'd_pad',
         key: 'D',
         code:68,
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/60[kb]wersira2.aif.mp3'
     },
     {
         id: 'z_pad',
         key: 'Z',
         code:90,
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/26[kb]wersishak1.aif.mp3'
     },
     {
         id: 'x_pad',
         key: 'X',
         code: 88,
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/11[kb]wersitom07.aif.mp3'
     },
     {
         id: 'c_pad',
         key: 'C',
         code:67,
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/30[kb]wersi-bd4.aif.mp3'
     },
 ];

function playSound(id){
     var element = document.getElementById(id);
        element.currentTime = 0;
    element.play();
}

class DrumPad extends React.Component{
    constructor(props){
        super(props);
    }
    play(){
        playSound(this.props.idPad);       
    }
    
  
    render(){
        return (
            <div  className='drum-pad'  onClick={this.play.bind(this)}>
        <audio id={this.props.idPad} className='clip'>
            <source src={this.props.clip} />
            </audio>
            {this.props.idPad} 
            </div>
        );
    }
}
class AppComponent extends React.Component{
    constructor(props){
        super(props);
    }
    
handleKeyPress(event){
   var padsFiltered = pads.filter(p=> p.code === event.keyCode);
    if(padsFiltered.length ===0) return;
    playSound(padsFiltered[0].key);
    
}
    
componentDidMount() {
    document
        .addEventListener("keydown", this.handleKeyPress);
  }
componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
    

    render(){
        var items = pads.map(p => <DrumPad clip={p.clip} key={p.id} idPad={p.key} />);
        return (
                             <ul id='drum-machine'>{items}</ul>);
    }
}
var container = document.getElementById('container');
ReactDOM.render(<AppComponent />, container);