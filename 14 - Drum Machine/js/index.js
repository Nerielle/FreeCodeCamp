
const projectName='drum-machine'
localStorage.setItem('example_project','Drum Machine');
 const pads = [
     {
         id: 'q_pad'
         , key: 'Q'
         , code: 81
         , name: 'wersi-bdhh1'
         , clip: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/95[kb]wersi-bdhh1.aif.mp3'
     }
     , {
         id: 'w_pad'
         , key: 'W'
         , code: 87
         , name: 'wersi-bd1'
         , clip: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/33[kb]wersi-bd1.aif.mp3'
     },

     {
         id: 'e_pad'
         , key: 'E'
         , code: 69
         , name: 'wersi-hh2'
         , clip: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/48[kb]wersi-hh2.aif.mp3'
     }
     , {
         id: 'a_pad'
         , key: 'A'
         , code: 65
         , name: 'wersi-hh3'
         , clip: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/63[kb]wersi-hh3.aif.mp3'
     },

     {
         id: 's_pad'
         , key: 'S'
         , code: 83
         , name: 'wersi-sd2'
         , clip: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/34[kb]wersi-sd2.aif.mp3'
     }
     , {
         id: 'd_pad'
         , key: 'D'
         , code: 68
         , name: ''
         , clip: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/60[kb]wersira2.aif.mp3'
     }
     , {
         id: 'z_pad'
         , key: 'Z'
         , code: 90
         , name: 'wersira2'
         , clip: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/26[kb]wersishak1.aif.mp3'
     }
     , {
         id: 'x_pad'
         , key: 'X'
         , code: 88
         , name: 'wersitom07'
         , clip: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/11[kb]wersitom07.aif.mp3'
     }
     , {
         id: 'c_pad'
         , key: 'C'
         , code: 67
         , name: 'wersi-bd4'
         , clip: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/30[kb]wersi-bd4.aif.mp3'
     }
 , ];

function playSound(id, name) {
    var padElement = document.getElementById(id);
    var displayElement = document.getElementById('display');
    displayElement.innerHTML=name;
    padElement.currentTime = 0;
    padElement.play();
}

class DrumPad extends React.Component{
    constructor(props){
        super(props);
    }
    play(){
        playSound(this.props.idPad, this.props.name);       
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
    playSound(padsFiltered[0].key, padsFiltered[0].name);
    
}
    
componentDidMount() {
    document
        .addEventListener("keydown", this.handleKeyPress);
  }
componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
    

    render(){
        var items = pads.map(p => <DrumPad clip={p.clip} key={p.id} idPad={p.key} name={p.name}/>);
        return (
                             <ul id='drum-machine'>
                             {items}
                             <div id='display'></div>
                             </ul>
                            );
    }
}
var container = document.getElementById('container');
ReactDOM.render(<AppComponent />, container);