var isX = true;
var counter = 0;
var arr = ['','','','','','','','',''];
var cellback = [];
var before;
var min = Number.POSITIVE_INFINITY;
var peak ='none'; 
var p = {};

function game(iden,stepback){
    if(stepback){
        back(IdInt);
    }
    else{
        var IdInt = parseInt(iden);
        var img_1 = document.createElement("img");
        img_1.src = isX ? "x.png" : "o.png";  
        img_1.alt = "undefined";
        img_1.id = `img${IdInt}`;
        arr[IdInt] = isX ? 'x' : 'o';
        before = IdInt;
        appendImg(IdInt,img_1);
        removeClick(IdInt);
        cellback.push(IdInt);
        counter++;
        document.getElementById("stepback").setAttribute("onclick","game(-1,false)");
        isX = !isX;
        if(isWin(arr,counter,arr[IdInt])){
            if(min>counter){
                min = counter;
            }
            printmin(min);
            newgame(arr);
            isX = true;
            counter = 0;
            arr = ['','','','','','','','',''];
        }  
        if(counter === 9){
            alert("draw")
        }    
    }
} 


function appendImg(num,img){
    var cell = document.getElementById(`${num}`);
    cell.append(img);
}

function removeClick(num){
    var tdElem = document.getElementById(`${num}`);
    tdElem.removeAttribute("onclick");
}

function removeClickStepBack(){
    var tdElem = document.getElementById("stepback");
    tdElem.removeAttribute("onclick");
}

function isWin(arr1,counter1,char){
    var player1win = counter1 % 2 === 1;
    if(arr1[0] === `${char}` && arr1[4] === `${char}` && arr1[8] === `${char}` ||
       arr1[2] === `${char}` && arr1[4] === `${char}` && arr1[6] === `${char}` ||
       arr1[0] === `${char}` && arr1[1] === `${char}` && arr1[2] === `${char}` ||
       arr1[3] === `${char}` && arr1[4] === `${char}` && arr1[5] === `${char}` ||
       arr1[6] === `${char}` && arr1[7] === `${char}` && arr1[8] === `${char}` ||
       arr1[0] === `${char}` && arr1[3] === `${char}` && arr1[6] === `${char}` ||
       arr1[1] === `${char}` && arr1[4] === `${char}` && arr1[7] === `${char}` ||
       arr1[2] === `${char}` && arr1[5] === `${char}` && arr1[8] === `${char}`   ){           
            player1win ? alert("player 1 win") : alert("player 2 win");
            return true;
   }
   else{
       return false;
   }
}

function newgame(){
    removeClickStepBack();
    cellback = []
    for(var i=0;i<9;i++){
        if(arr[i] === 'x' || arr[i] === 'o'){
            document.getElementById(`img${i}`).remove();
            document.getElementById(`${i}`).setAttribute("onclick","game(id,false)");
        }
    }
    isX = true;
    counter = 0;
    arr = ['','','','','','','','',''];
}



function back(IdInt){
    if(counter>0){
        document.getElementById(`img${before}`).remove();
        document.getElementById(`${before}`).setAttribute("onclick","game(id,false)");
        arr[before] = '';
    } 
    counter--;
    isX = !isX;
    cellback.pop(IdInt);
    before = cellback[cellback.length-1];
    if(counter === 0){
        removeClickStepBack();
    }
}

function printmin(num){
    if(num !== -1){
        peak = num;
    }
    else{
        alert(`Peak: ${peak}`)
    }
}

function SaveGame(bool){
    var arr3 = arr.slice(0);
    var cellback2 = cellback.slice(0);
    p = {
        arr8:arr3,
        cellback8: cellback2,
        counter2:counter,
        before2:before,
        min2:min,
        isX2 :isX,
    }
}

function LoadGame(){ 
    arr = p.arr8.slice(0);
    cellback = p.cellback8.slice(0);
    counter = p.counter2;
    before = p.before2;
    min = p.min2;
    isX = p.isX2;
    if(counter > 0){
        document.getElementById("stepback").setAttribute("onclick","game(-1,false)");
    }
    for(var i=0;i<arr.length;i++){
        var img_2;
        if(arr[i] === '' && document.getElementById(`img${i}`) !== null){
            document.getElementById(`img${i}`).remove();
            document.getElementById(`${i}`).setAttribute("onclick","game(id,false)");
        }
        else if((arr[i] === 'x' || arr[i] === 'o') && document.getElementById(`img${i}`) !== null){
            img_2 = document.getElementById(`img${i}`);
            img_2.src = `${arr[i]}.png`;
            removeClick(i);
        }
        else if((arr[i] === 'x' || arr[i] === 'o') && document.getElementById(`img${i}`) === null){
            img_2 = document.createElement("img");
            img_2.src = `${arr[i]}.png`;  
            img_2.alt = "undefined";
            img_2.id = `img${i}`
            appendImg(i,img_2);
            removeClick(i);
        }
    }
}
