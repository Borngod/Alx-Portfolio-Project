const display_output = document.getElementById('out-1');
const display_input = document.getElementById('inp-1');

const keys = document.querySelectorAll('.key')
let input = '';
let history = [];

keys.forEach(key => {
  const value = key.getAttribute('data-key');
console.log(value)
  key.addEventListener('click', () => {

    if (value == "clear") {

      input = " ";
      display_input.innerHTML = 0;
      display_output.innerHTML = " ";

    } else if (value == 'backspace') {

      input = input.slice(0, -1);
      display_input.innerHTML = CleanInput(input);

    } else if (value == '=') {

      let result = eval(prepareInput(input));
      history.push(`${prepareInput(input)} = ${CleanOutput(result)}`);
      updateHistory();
      display_output.innerHTML = CleanOutput(result);

    } else if (value == 'brackets') {
      if (input.indexOf('(') == -1 ||

        input.indexOf('(') != -1 &&
        input.indexOf(')') != -1 &&
        input.lastIndexOf(')') > input.lastIndexOf('(')
      ) {
        input += '(';
      } else if (
        input.indexOf(')') == -1 &&
        input.indexOf('(') != -1 ||
        input.indexOf('(') != -1 &&
        input.indexOf(')') != -1 &&
        input.lastIndexOf('(') > input.lastIndexOf(')')
      ) {
        input += ')';
      }

      display_input.innerHTML =CleanInput(input);

    } else {
      if(validateInput(value)){

        input += value ;
        display_input.innerHTML = CleanInput(input);
      }
      
                                

    }

  })
});


function CleanInput(input){
    
    let input_string = input.split("")
    
    let input_string_length = input_string.length

    for (let i = 0; i < input_string_length ; i++){
        console.log(input_string[i],'outside')
        if (input_string[i] == '+'){
            input_string[i] = `<span class='operator1'>+</span>`;
            console.log(input_string[i],'inside')
        }
        else if (input_string[i] == '*'){
            input_string[i] = `<span class='operator1'>x</span>`;
        }
        else if (input_string[i] == '-'){
            input_string[i] = `<span class='operator1'>-</span>`;
        }
        else if (input_string[i] == '/'){
            const divideCharacter = String.fromCharCode(247);
            input_string[i] = `<span class='operator1'>${divideCharacter}</span>`;
        }
    
        else if (input_string[i] == '('){
            input_string[i] = `<span class='operator2'>(</span>`;
        }
        else if (input_string[i] == ')'){
            input_string[i] = `<span class='operator2'>)</span>`;
        }
        else if (input_string[i] == '%'){
            input_string[i] = `<span class='operator'>%</span>`;
        }
    }

    return input_string.join("");

}

function CleanOutput(output){
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];
    let output_string_array = output_string.split("")
    const alphabets = [...Array(26)].map((_,i)=>{
      return String.fromCharCode(97 + i)

    })

    if (output_string_array.length > 3){
        for (let i = output_string_array.length - 3; i > 0 ; i -= 3 ){
         if(output_string_array[0] == '-' && i == 1 ){
            continue; 
         }
         else if(alphabets.includes(output_string_array[i])){
          continue;

         }else{
            output_string_array.splice(i,0,",");
         }
            
         
         
        }
    }

    else if (decimal){
        output_string_array.push(".");
        output_string_array.push(decimal);

    }

    return output_string_array.join("");


}


function validateInput(value){
    let last_input = input.slice(-1);
    let operators = ["*","/","+","%","-"];

    if (value == "." && last_input == "."){
        return false;
    }

    else if(operators.includes(value)){
        return !(operators.includes(last_input));
    }

    return true;
}

function prepareInput(input){
    let input_array = input.split("");
    
    for(let i =0; i< input_array.length; i++){
        if (input_array[i] == '%'){
            input_array[i] = '/100';
        }
    }

    return input_array.join("");

}

function updateHistory() {
    const historyList = document.getElementById('history-list');
   

    historyList.innerHTML = '';
    history.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.classList.add("history-li");
         
        let entry_array = entry.split("");
        console.log(entry_array)
        for (let i = 0; i < entry_array.length;i++ ){

            if (entry_array[i] == '/' && entry_array[i+ 1] == '1' && entry_array[i+ 2] == '0' && entry_array[i+ 3] == '0'){
            entry_array[i] = `%`;
            entry_array[i+1] = '';
            entry_array[i+2] = '';
            entry_array[i+3] = '';
            }
            else if (entry_array[i] == '/'){
            const divideCharacter = String.fromCharCode(247);
            entry_array[i] = `${divideCharacter}`   
            }
            else if (entry_array[i] == '*'){
            entry_array[i] = `x`   
            }
            
            
        }
        

    
       
        
        listItem.textContent = entry_array.join("").toString();
        historyList.appendChild(listItem);
        listItem.addEventListener('click', () =>{
            listArray = listItem.textContent.split("=");
            let listArray_split = listArray[0].split("")
            console.log(listArray_split,'this list')
            const divideCharacter = String.fromCharCode(247);
            for (let i = 0; i < listArray_split.length; i++){
              
              if (listArray_split[i] == '+'){
                listArray_split[i] = `<span class='operator1'>+</span>`;
                
            }
            else if (listArray_split[i] == 'x'){
              listArray_split[i] = `<span class='operator1'> x </span>`;
            }
            else if (listArray_split[i] == '-'){
              listArray_split[i] = `<span class='operator1'>-</span>`;
            }
            else if (listArray_split[i] ==`${divideCharacter}`){
                
              listArray_split[i] = `<span class='operator1'>${divideCharacter}</span>`;
            }
        
            else if (listArray_split[i] == '('){
              listArray_split[i] = `<span class='operator2'>(</span>`;
            }
            else if (listArray_split[i] == ')'){
              listArray_split[i] = `<span class='operator2'>)</span>`;
            }
            else if (listArray_split[i] == '%'){
              listArray_split[i] = `<span class='operator'>%</span>`;
            }
            }
            listArray_split.join("").toString()
            display_input.innerHTML = listArray_split.join("").toString();
            display_output.innerHTML = listArray[1];
        } )
    })
}

const historyList = document.getElementById('history-list');
    const bin1 = document.getElementById('bin');
    bin1.addEventListener('click',()=>{
      history = []
      historyList.innerHTML = '';
    })

const recent = document.getElementById('bin1');
const historylist = document.querySelector('.history');
recent.addEventListener('click',() => {
  historylist.classList.toggle('isOn')
})


document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    const key = event.key;

    // Check if the pressed key is a digit, operator, or other relevant key
    if (/[0-9+\-*/.=]|Enter/.test(key)) {
        if (key === 'Enter') {
            keyPressAction('=');
        } else {
            keyPressAction(key);
        }
    } else if (key === 'Escape') {
        keyPressAction('clear');
    }
}

function keyPressAction(value) {
    // Your existing logic for handling key presses
    // You can reuse the logic from your click event listener
    if (value == "clear") {
        input = " ";
        display_input.innerHTML = 0;
        display_output.innerHTML = " ";
    } else if (value == 'backspace') {
        input = input.slice(0, -1);
        display_input.innerHTML = CleanInput(input);
    } else if (value == '=') {
        let result = eval(prepareInput(input));
        history.push(`${prepareInput(input)} = ${CleanOutput(result)}`);
        updateHistory();
        display_output.innerHTML = CleanOutput(result);
    } else if (value == 'brackets') {
        // ... your existing bracket logic ...
        if (input.indexOf('(') == -1 ||

        input.indexOf('(') != -1 &&
        input.indexOf(')') != -1 &&
        input.lastIndexOf(')') > input.lastIndexOf('(')
      ) {
        input += '(';
      } else if (
        input.indexOf(')') == -1 &&
        input.indexOf('(') != -1 ||
        input.indexOf('(') != -1 &&
        input.indexOf(')') != -1 &&
        input.lastIndexOf('(') > input.lastIndexOf(')')
      ) {
        input += ')';
      }

      display_input.innerHTML =CleanInput(input);
        
    } else {
        if (validateInput(value)) {
            input += value;
            display_input.innerHTML = CleanInput(input);
        }
    }
}


