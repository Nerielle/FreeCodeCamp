const projectName = "javascript-calculator";
const decimalSign = '.';
const equalSign = '=';
const clear = 'AC';
const subtract = '-';
if (!Array.prototype.last) {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };
};
class NumBtn extends React.Component {
        constructor(props) {
            super(props);
        
            this.handleClick = this.handleClick.bind(this);
        }
        handleClick() {
            this.props.click(this.props.value, this.props.state);
        }
        render() {
            return ( < div className = 'button' id={this.props.id}
                onClick = {
                    this.handleClick
                } > {
                    this.props.value
                } < /div>);
        }
    }
    
function parseToExpession(xS, yS, op){
                let x= parseFloat(xS);
                let y =parseFloat(yS);
                switch(op){
                    case '*': return x * y;
                    case '/': return x / y;
                    case '-': return x - y;
                    case '+': return x + y;
                }
                
            }                    
                    
function getRecentString(state) {
    if (state.numbers.length === 0) return '';
    return state.recent.join("");
}

function updateNumbers(numbers, value) {
    let current = numbers.pop();
    var newValue = current === undefined ? value :current + value;
    numbers.push(newValue);
}
const none = 'none';
var number = 'number';
var negativeSign = 'negativeSign';
var operation = 'operation';
var decimal = 'decimal';
var zero = '0';
var equals = 'equal';
            
            
function checkStateTransition(oldState, newState){
    switch(newState){
        case none: return true;
        case number: 
            return oldState !== equals;
        
        case negativeSign: 
            return oldState === none || oldState === operation;
        case operation:
            return oldState === number || oldState === decimal || oldState === operation;
        case decimal: 
            return oldState === none || oldState === number;
//        case zero: 
//            return oldState === none || oldState === decimal || oldState === number;//zero??? 40004
        case equals: 
            return oldState === number || oldState === decimal; //zero 9000; 
    }
}
            function getOperationPriority(op){
                switch(op){
                    case '*' : return 1;
                    case '/': return 1;
                    case '-': return 0;
                    case '+': return 0;
                    default: throw new Error(`Operation ${op} is not supported`);
                }
            }
      
            function getClearState(){
                return {
            operations: []
            , numbers: []
            , state: none
            , recent: []
        };
            }
            
//const states = [none, number, negativeSign, operation];
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = getClearState();
        this.update = this.update.bind(this);
        this.evaluate = this.evaluate.bind(this);
    }
     evaluate(){
         var operations = [ '/', '*','+','-'];
      let j =0;
       var postfixnotation = [];
         var stack = [];
         for(let i = 0; i< this.state.numbers.length;i+=2){
             postfixnotation.push(this.state.numbers[i]);
             if(this.state.numbers.length > i+1){
                postfixnotation.push(this.state.numbers[i+1]);
            }
             //if(this.state.operations.length = j) continue;
             
             var currentOp = this.state.operations[j];
             if(stack.length !== 0){
                 var lastOpPriority = getOperationPriority(stack.last());
                 var currentOpPriority = getOperationPriority(currentOp);
                 if(lastOpPriority > currentOpPriority){
                     postfixnotation.push(stack.pop());
                     console.log('pfix priority ', postfixnotation);
                     console.log(stack);
                 }else{
                     postfixnotation.push(currentOp);
                 }
             }
             else {
                 stack.push(currentOp);
             }    
             j++;
         }
            
        postfixnotation = postfixnotation.concat(stack);
     console.log('postfix ', postfixnotation);
         var result = postfixnotation.reduce(function(acc, currentVal){
            
             if(operations.every(op=> op !== currentVal)){
                 acc.push(currentVal);
             }
             else{
              // var exprString = acc.pop() + currentVal + acc.pop();
               var secondOperand = acc.pop();
                 var firstOperand = acc.pop();
                 var extracted1 = parseToExpession(firstOperand, secondOperand, currentVal);
                 acc.push(extracted1);
             }
             return acc;
         },[]);
       
            
            
            return result[result.length -1];
    }
    update(value, state) {
        console.log('update ', value );
        
        var oldState = this.state.state;
        
        if(checkStateTransition(oldState, state) === false)
            return;
        if(state === decimal && this.state.numbers.length!==0 && this.state.numbers.last().indexOf(decimalSign) !== -1){
            return;
        }
        if(value === zero && oldState===number && this.state.numbers.last()===zero){
            return;
        }
        if(state===number && oldState === number && this.state.numbers.last()===zero ){
            return;
        }
      
        if (state === none) {
            this.setState(getClearState());
            return;
        }
        
        var newState = {
            operations: this.state.operations
            , numbers: this.state.numbers
            , state: oldState
            , recent: this.state.recent
        };
        
        
        if(state === equals){
            //implement evaluation
          var result = this.evaluate();
         console.log('eval', this.state);
         console.log('REsult ', result);
         newState.state = state;
         newState.numbers = [result];
         newState.operations = [];

        }
        
       if(state === decimal){
           if(oldState === none){
               newState.numbers.push('0.');
           }else{
                 updateNumbers(newState.numbers, value);
           }
               
        newState.state = state;
       }
        
        if(state === operation){
            if(oldState === number || oldState === decimal){
                newState.operations.push(value);
                    
        newState.state = state;
            }
            
            if(oldState === operation && value === subtract){
               
                newState.state = negativeSign;
            }
        }
        
        if(state === number)      { 
            
            if (oldState === decimal || oldState == number) {
                updateNumbers(newState.numbers, value);
            }else if(oldState === negativeSign){
                newState.numbers.push(subtract + value);
            }
            else {
                newState.numbers.push(value);
            }
            newState.state = state;
        }
        this.setState(newState);
       if(oldState === operation && state == operation && value!=subtract){
           return;
       }
        newState.recent.push(value);      
    }
    render() {
        let current = this.state.recent.length === 0 ? 0 : this.state.numbers.last();
        console.log('curr', current);
        return ( < React.Fragment >
                < div id = 'display' > < div > {  this.state.recent.join("") } < /div>
            < div > {                current            } < /div>
            < /div> 
            < NumBtn id = 'clear'   value = { clear }  click = { this.update } state = {none} /> 
                < NumBtn id = 'zero'   value = {zero} click = {   this.update }     state ={number}        /> 
                < NumBtn id = 'one'    value = '1'  click = {   this.update }  state ={number}      /> 
                < NumBtn id = 'two'  value = '2'   click = {  this.update   }       state ={number}    /> 
                < NumBtn id = 'three' value = '3'  click = {  this.update }   state ={number}  /> 
                < NumBtn id = 'four'  value = '4' click = {   this.update   }    state ={number}   /> 
                < NumBtn id = 'five' value = '5'    click = {    this.update }  state ={number}   />
                < NumBtn id = 'six' value = '6'    click = {        this.update   } state ={number}   /> 
                < NumBtn id = 'seven'  value = '7'     click = {   this.update  }     state ={number} /> 
                < NumBtn id = 'eight'  value = '8' click = {  this.update   }    state ={number}/> 
                < NumBtn id = 'nine'  value = '9'  click = { this.update }       state ={number}     /> 
                < NumBtn id = 'add'   value = '+' click = {   this.update  } state = {operation }   />
                < NumBtn id = 'subtract'   value = {  subtract   }  click = {   this.update   }   state = {operation  } /> 
                < NumBtn id = 'multiply'  value = '*' click = { this.update  }    state = {operation  }            />
                < NumBtn id = 'divide'   value = '/'   click = {  this.update   }   state = {operation  }            /> 
                < NumBtn id = 'equals' value = {    equalSign    }    click = {  this.update }   state = { equals  }  />
                < NumBtn id = 'decimal'  value = {    decimalSign   }   click = { this.update }  state = {decimal }            /> 
                    < /React.Fragment>);
    }
}
var container = document.getElementById('container');
ReactDOM.render( < Calculator / > , container);