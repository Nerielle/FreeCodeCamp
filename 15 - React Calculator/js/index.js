const projectName = "javascript-calculator";
const decimalSign = '.';
const equalSign = '=';
const zero = '0';
const subtract = '-';
const divide = '/';
const multiply = '*';
const add = '+';
const clear = 'AC';
const none = 'none';
const number = 'number';
const operation = 'operation';
const decimal = 'decimal';
const equals = 'equal';

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
                    case multiply: return x * y;
                    case divide: return x / y;
                    case subtract: return x - y;
                    case add: return x + y;
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

            
            
function checkStateTransition(oldState, newState) {
    switch (newState) {
    case none:
        return true;
    case number:
        return true;
    case operation:
        return oldState === number || oldState === decimal || oldState === operation || oldState === equals;
    case decimal:
        return oldState === none || oldState === number;
    case equals:
        return oldState === number || oldState === decimal; //zero 9000; 
    }
}
function getOperationPriority(op) {
    switch (op) {
    case multiply:
        return 1;
    case divide:
        return 1;
    case subtract:
        return 0;
    case add:
        return 0;
    default:
        throw new Error(`Operation ${op} is not supported`);
    }
}

function getClearState() {
    return {
        operations: []
        , numbers: []
        , state: none
        , recent: []
    };
}
            
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = getClearState();
        this.update = this.update.bind(this);
        this.evaluate = this.evaluate.bind(this);
    }
     evaluate(){
         var operations = [ divide, multiply,add,subtract];
      
         let input = [];
         let number = '';
         this.state.recent.reduce((operators, currentToken, index) => {
             if(operations.some(op => op === currentToken)){
                operators.push(currentToken);
                 if(number !== '')
                 {
                     input.push([number, false]);
                     number = '';
                 }
             }
             else{
                 if(operators.length!==0){
                     if(operators.last() === subtract && operators.length > 1){
                         input.push([operators[operators.length -2], true]);
                         number+=subtract;
                     }else
                     {
                         input.push([operators.last(), true]);
                     
                     }
                     operators = [];
                 }
                 number+=currentToken;
                 if(index === this.state.recent.length - 1 && number!== ''){
                     input.push([number, false]);
                 }
             }
             return operators;
         },[]);
         

         console.log(input);
         var postfixnotation = [];
         var stack = [];
         input.forEach(current => {
             if (current[1] === false) {
                 postfixnotation.push(current[0]);
             }
             else {
                 if (stack.length !== 0) {
                     var lastOpPriority = getOperationPriority(stack.last());
                     var currentOpPriority = getOperationPriority(current[0]);
                     if (lastOpPriority >= currentOpPriority) {
                         postfixnotation.push(stack.pop());                        
                     }                 
                 }
                 stack.push(current[0]);
              
                 console.log(stack);
             }
 });
         
     postfixnotation = postfixnotation.concat(stack.reverse());
      
         var result = postfixnotation.reduce(function(acc, currentVal){
            
             if(operations.every(op=> op !== currentVal)){
                 acc.push(currentVal);
             }
             else{
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
         var result = this.evaluate();
         
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

            if(oldState === equals){
                newState.recent = [newState.numbers.last().toString()];
            }
            
            newState.operations.push(value);                    
            newState.state = state;
            
        }
        
        if(state === number)      { 
            if(oldState === equals){
                newState = getClearState();
            }
            if (oldState === decimal || oldState == number) {
                updateNumbers(newState.numbers, value);
            }
            else {
                newState.numbers.push(value);
            }
            newState.state = state;
        }
        newState.recent.push(value);      
        this.setState(newState);       
    }
    render() {
        let current = this.state.recent.length === 0 ? 0 : this.state.numbers.last();
        return ( < div id='calc'>
            < div id='screen'>
                < div id='recent'> {  this.state.recent.join("") } < /div>
                < div  id = 'display'> {                current            } < /div>
            < /div> 
            < NumBtn id = 'clear'   value = { clear }  click = { this.update } state = {none} /> 
                 < NumBtn id = 'add'   value = {add} click = {   this.update  } state = {operation }   />
                < NumBtn id = 'subtract'   value = {  subtract   }  click = {   this.update   }   state = {operation  } />
                < NumBtn id = 'one'    value = '1'  click = {   this.update }  state ={number}      /> 
                < NumBtn id = 'two'  value = '2'   click = {  this.update   }       state ={number}    /> 
                < NumBtn id = 'three' value = '3'  click = {  this.update }   state ={number}  /> 
                 < NumBtn id = 'multiply'  value = {multiply} click = { this.update  }    state = {operation  }            />
                < NumBtn id = 'four'  value = '4' click = {   this.update   }    state ={number}   /> 
                < NumBtn id = 'five' value = '5'    click = {    this.update }  state ={number}   />
                < NumBtn id = 'six' value = '6'    click = {        this.update   } state ={number}   /> 
                < NumBtn id = 'divide'   value = {divide}   click = {  this.update   }   state = {operation  }            /> 

                < NumBtn id = 'seven'  value = '7'     click = {   this.update  }     state ={number} /> 
                < NumBtn id = 'eight'  value = '8' click = {  this.update   }    state ={number}/> 
                < NumBtn id = 'nine'  value = '9'  click = { this.update }       state ={number}     /> 
                < NumBtn id = 'decimal'  value = {    decimalSign   }   click = { this.update }  state = {decimal }            /> 
                < NumBtn id = 'zero'   value = {zero} click = {   this.update }     state ={number}        />               
                < NumBtn id = 'equals' value = {    equalSign    }    click = {  this.update }   state = { equals  }  />
               
                    < /div>);
    }
}
var container = document.getElementById('container');
ReactDOM.render( < Calculator / > , container);