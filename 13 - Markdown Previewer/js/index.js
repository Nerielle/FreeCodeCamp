
const projectName = "markdown-previewer";
localStorage.setItem('example_project', 'Markdown Previewer');




const defaultText = `# Welcome to Markdown Previewer!

## This is h2 element
  
Inline code put inside backticks \`<div></div>\`.

\`\`\`
// multi-line code:

function letsRock() {
  console.log(\'We'll rock you!\');
}
\`\`\`
  

There's also [links](https://github.github.com/gfm/), and
> Block Quotes!


1. You can have lists
1. Feel free to **highlight** text  

* And embed your images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`
;

var containerElement = document.getElementById('container');

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: defaultText
        };
        this.updateState = this.updateState.bind(this);
    }
    updateState(e) {
        this.setState({
            text: e.target.value
        });
    }
    render( ){
        return (
            <section>
            < EditorComponent handler = {this.updateState}/>
        <PreviewComponent text={this.state.text}/>
            </section>
        );
    }
    }

class EditorComponent extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return ( < textarea id = 'editor' defaultValue={defaultText} onChange={this.props.handler} /> );
            
        }
}
                    function createMarkup(text) {
  return {__html: marked(text,{gfm: true,breaks:true})};
}
                    
class PreviewComponent extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (<div id = 'preview' dangerouslySetInnerHTML={ createMarkup(this.props.text)}/>);
                
            
        }
                    }
 ReactDOM.render(<AppComponent />, containerElement
                   );