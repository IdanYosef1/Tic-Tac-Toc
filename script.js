let isX = true;
let counter = 0;
let prevCell = [];
let prev;
let min = Number.POSITIVE_INFINITY;
let peak = 'None';
let obj = {};
let IdInt;
let boolIsWin;
let player1win;
let XorO_Img;
let booleanSave = false;
let s = 0;
let n = 3;
let arr = Array(n*n).fill('');
createTable();

// Creates the game board and to each cell in the table add the onClick attribute that will activate the game function.
function createTable(){
    for(let i=0; i<n; i++){
        const row = document.createElement("tr");
        row.id = `tr${i}`
        document.getElementById("Table").append(row);
        for(let j=0;j<n;j++){
            const column = document.createElement("td");
            column.setAttribute("onclick","game(id)");
            column.id = `${s}`;
            s += 1;
            row.append(column);
        }
    }
}

/* Clicking on one of the cells in the board will activate the function.
   The function will add an image of an X or O to the corresponding cell and remove the onclick attribute from the cell.
   and add the onclick attribute to the step back button. 
   If the value returned from the isWin function is true, the min and peak variables are updated and the game is restarted.
   If the game ends in a draw, a message is displayed to the users. */

function game(iden){
        IdInt = parseInt(iden);
        arr[IdInt] = isX ? 'x' : 'o';
        prev = IdInt;
        appendImg(IdInt,arr[IdInt]);
        removeClick(IdInt);
        prevCell.push(IdInt);
        counter++;
        document.getElementById("stepback").setAttribute("onclick","back()");
        isX = !isX;
        if(isWin()){
            if(min>counter){
                min = counter;
                peak = min;
            }
            setTimeout(() => {
                newGame(arr);
            },2)
        }  
        else if(counter === n*n){
            setTimeout(() => {
                alert("Draw");
            },2)
            
        }    
}

// Creates an Img element and adds it to the corresponding cell in the table.
function appendImg(num,XorO){
    XorO_Img = document.createElement("img");
    XorO_Img.src = `${XorO}.png`;  
    XorO_Img.alt = "undefined";
    XorO_Img.id = `img${num}`;
    const cell = document.getElementById(`${num}`);
    cell.append(XorO_Img);
}

// Removes the onclick attribute from the appropriate cell.
function removeClick(num){
    const tdElem = document.getElementById(`${num}`);
    tdElem.removeAttribute("onclick");
}

// Removes the onclick attribute from the step back button.
function removeClickStepBack(){
    const buttonElem = document.getElementById("stepback");
    buttonElem.removeAttribute("onclick");
}

// Checks the possibilities for victory and if there is a victory he returns true and otherwise false.
function isWin(){
    for(let i=0; i<n*n; i+=n){
        boolIsWin = true;
        for(let j=0; j<n; j++){
            if(arr[i+j] !== `${arr[IdInt]}`){
                boolIsWin = false;
            }
        }
        if(printPlayerWin()){
            return true;
        }
    }
    for(let i=0; i<n; i++){
        boolIsWin = true;
        for(let j=0; j<n*n; j+=n){
            if(arr[i+j] !== `${arr[IdInt]}`){
                boolIsWin = false;
            }
        }
        if(printPlayerWin()){
            return true;
        }
    }
    boolIsWin = true;
    for(let i=0; i<n*n; i += n+1){
        if(arr[i] !== `${arr[IdInt]}`){
            boolIsWin = false;
        } 
    }
    if(printPlayerWin()){
        return true;
    }
    boolIsWin = true;
    for(let i=n-1; i<n*n - 1; i += n-1){
        if(arr[i] !== `${arr[IdInt]}`){
            boolIsWin = false;
        } 
    }
    if(printPlayerWin()){
        return true;
    }
    return false;
}

// If there is a win, displays a message that says who the player who won the game is and returns true.
function printPlayerWin(){
    if(boolIsWin){
        player1win = counter % 2 === 1;
        setTimeout(() => {
            player1win ? alert("player 1 win") : alert("player 2 win");
        },1)
        return true;
    }
}

/* Removes the onclick attribute from the step back button, removes all images from the table
   and add the onclick attribute to each cell. 
   In addition, initialized variables. */
function newGame(){
    removeClickStepBack();
    for(let i=0; i<n*n; i++){
        if(arr[i] === 'x' || arr[i] === 'o'){
            document.getElementById(`img${i}`).remove();
            document.getElementById(`${i}`).setAttribute("onclick","game(id)");
        }
    }
    prevCell = [];
    isX = true;
    counter = 0;
    arr = Array(n*n).fill('');;
}

/* If the game board is not empty, it removes the image of the last move from the corresponding cell,
   add the onclick attribute to ecorresponding cell and updates variables.
   If after the update the game board is empty removes the onclick attribute from the step back button */
function back(){
    if(counter > 0){
        document.getElementById(`img${prev}`).remove();
        document.getElementById(`${prev}`).setAttribute("onclick","game(id,false)");
        arr[prev] = '';
    } 
    counter--;
    isX = !isX;
    prevCell.pop(IdInt);
    prev = prevCell[prevCell.length-1];
    if(counter === 0){
        removeClickStepBack();
    }
}

// Pressing the Peak button displays a message to the players.
function printMin(){
    alert(`Peak: ${peak}.
Explain: The game ended with a minimum of marked squares.`);
}

// Creates an object that holds the game data.
function saveGame(){
    booleanSave = true;
    obj = {
        newArr: arr.slice(0),
        newPrevCell: prevCell.slice(0),
        newCounter:counter,
        newPrev:prev,
        newMin:min,
        newIsX :isX,
    }
}

/* Updates the variables by object, updates the onclick attribute of the step back button by counter and
   updates the images and onclick attribute in the game board cells by arr */
function loadGame(){ 
    if(booleanSave){
        arr = obj.newArr.slice(0);
        prevCell = obj.newPrevCell.slice(0);
        counter = obj.newCounter;
        prev = obj.newPrev;
        min = obj.newMin;
        isX = obj.newIsX;
        if(counter > 0){
            document.getElementById("stepback").setAttribute("onclick","back()");
        }
        else{
            removeClickStepBack();
        }
        for(let i=0;i<arr.length;i++){
            if(arr[i] === '' && document.getElementById(`img${i}`) !== null){
                document.getElementById(`img${i}`).remove();
                document.getElementById(`${i}`).setAttribute("onclick","game(id)");
            }
            else if((arr[i] === 'x' || arr[i] === 'o') && document.getElementById(`img${i}`) !== null){
                XorO_Img = document.getElementById(`img${i}`);
                XorO_Img.src = `${arr[i]}.png`;
                removeClick(i);
            }
            else if((arr[i] === 'x' || arr[i] === 'o') && document.getElementById(`img${i}`) === null){
                appendImg(i,arr[i]);
                removeClick(i);
            }
        }
    }
}

/* Asks the user to enter a number between 3 and 5 as long as he has not entered such a number or he has not clicked Cancel.
   If the user did not click Cancel or did not enter the size of the existing table then all images are removed from
   the board and the game is initialized. 
   In addition, the table size varies depending on the number entered by the user. */
function changeSize(){
    let num;
    do{
        num = parseInt(prompt("Enter a number between 3 and 5"));
    }while(num !== 3 && num !== 4 && num !== 5 && !isNaN(num))

    if(!isNaN(num) && num !== n){
        for(let i=0; i<n; i++){
            document.getElementById(`tr${i}`).remove();
        }
        n = num;
        initializeGame();
        createTable();
    }

    if(n === 3){
        document.getElementById("Container").style.height ="500px"
        document.getElementById("Container").style.width ="1000px"
    }
    else if(n === 4){
        document.getElementById("Container").style.height ="550px"
        document.getElementById("Container").style.width ="1100px"
    }
    else if(n === 5){
        document.getElementById("Container").style.height = "580px"
        document.getElementById("Container").style.width = "1100px"
    }
}

// Initializes the game data. 
function initializeGame(){
    min = Number.POSITIVE_INFINITY;
    booleanSave = false;
    obj = {};
    prevCell = [];
    peak = 'None';
    isX = true;
    counter = 0;
    s = 0;
    arr = Array(n*n).fill('');
}
