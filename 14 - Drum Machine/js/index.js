
const projectName='drum-machine'
localStorage.setItem('example_project','Drum Machine');
 const pads = [
       {
         id: 'q_pad',
         key: 'Q',
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/95[kb]wersi-bdhh1.aif.mp3'
     },
     {
        id: 'w_pad',
         key: 'W',
        clip: 'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/33[kb]wersi-bd1.aif.mp3'
     },
   
     {
         id: 'e_pad',
         key: 'E',
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/48[kb]wersi-hh2.aif.mp3'
     },
     {
         id: 'a_pad',
         key: 'A',
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/63[kb]wersi-hh3.aif.mp3'
     },
     
     {
         id: 's_pad',
         key: 'S',
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/34[kb]wersi-sd2.aif.mp3'
     },
     {
         id: 'd_pad',
         key: 'D',
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/60[kb]wersira2.aif.mp3'
     },
     {
         id: 'z_pad',
         key: 'Z',
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/26[kb]wersishak1.aif.mp3'
     },
     {
         id: 'x_pad',
         key: 'X',
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/11[kb]wersitom07.aif.mp3'
     },
     {
         id: 'c_pad',
         key: 'C',
         clip:'https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/Wersimat%2024/30[kb]wersi-bd4.aif.mp3'
     },
 ];

class DrumPad extends React.Component{
    constructor(props){
        super(props);
    }
    playAudio(){
        
        var element = document.getElementById(this.props.idPad);
        element.currentTime = 0;
    element.play();
    }
    
  
    render(){
        return (
            <div  className='drum-pad'  onClick={this.playAudio.bind(this)}>
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
  playAudio(p){
        console.log('hey',p);

    }
    render(){
        var items = pads.map(p => <DrumPad clip={p.clip} key={p.id} idPad={p.key} play={this.playAudio(p)}/>);
        return (
                             <ul id='drum-machine'>{items}</ul>);
    }
}
var container = document.getElementById('container');
ReactDOM.render(<AppComponent />, container);