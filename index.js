/*
    @Todo  
        gutter with number line


*/









// const textarea = document.querySelector("textarea");
const cursor = document.querySelector("#cursor")
const container = document.querySelector(".container")
const display = document.querySelector("#display")
const input = document.querySelector("#input");

const newPre = document.createElement("pre")
display.appendChild(newPre)

let pre = document.querySelectorAll("pre")
pre = [].slice.call(pre)

// const editorHeight = textarea.offsetHeight;
const containerOffsetLeft = container.offsetLeft;



let length = 0;
let lineNumber = 0;
let columnNumber = 0;
let selectedPreLength = 0;

if(pre.length > 0){
    lineNumber = pre.length - 1;
    columnNumber = pre[pre.length-1].textContent.length;
    selectedPreLength = pre[0].innerText.length;

    cursor.style.left = `${pre[lineNumber].textContent.length * 8}px`
    cursor.style.top = `${columnNumber * 21}px`
    input.style.left = `${pre[lineNumber].textContent.length * 8}px`
    input.style.top = `${columnNumber * 21}px`

  
}


input.focus()


String.prototype.insert = function(insert, index){
    return this.slice(0, index) + insert + this.slice(index, this.length);
};

String.prototype.delete = function(index){
    return this.slice(0, index) + this.slice(index+1, this.length);
}



setInterval(()=>{

    if(cursor.style.visibility === "hidden"){
        cursor.style.visibility = "visible"
       
    }else{

        cursor.style.visibility = "hidden"
    }
}, 550)






display.onclick = function(e){

    let x = e.clientX;
    let y = e.clientY;

    if(pre.length === 0 ){
        lineNumber = 0;
        columnNumber = 0;
    }else{
        lineNumber = Math.floor(y/21);
        columnNumber = Math.floor((x - container.offsetLeft)/8);
    }
  
    console.log("line number", lineNumber, "Column NUmber", columnNumber) 
    

    if(lineNumber > -1 && lineNumber < pre.length){
        selectedPreLength = pre[lineNumber].innerText.length;
    }
    
 
    if(lineNumber < 0){
        cursor.style.top = `${lineNumber = 0}px`;
        input.style.top = `${0}px`;
    }else if(lineNumber > pre.length - 1){
        cursor.style.top = `${(lineNumber = pre.length - 1)  * 21}px`;
        input.style.top = `${(lineNumber)  * 21}px`;
        
        
    }else{
        cursor.style.top = `${lineNumber * 21}px`;
        input.style.top = `${lineNumber * 21}px`;
    }


    if(columnNumber < 0){
        cursor.style.left = `${columnNUmber = 0}px`;
        input.style.left = `${0}px`;
    }else if(columnNumber > selectedPreLength + 1){





        columnNumber = selectedPreLength;
        cursor.style.left = `${(selectedPreLength) * 8}px`;
        input.style.left = `${(selectedPreLength) * 8}px`;
    }else{
        cursor.style.left = `${columnNumber * 8}px`;
        input.style.left = `${columnNumber * 8}px`;
    }

    input.focus()
    console.log("line number", lineNumber, "Column NUmber", columnNumber)

}

display.addEventListener("keydown", (e)=>{

    let key = e.key;


    // console.log(columnNumber, lineNumber)

    //Backspace
    switch(key){
      
        case "Backspace":

            console.log(columnNumber, lineNumber)
            if(pre.length === 0){return}
            let element = pre[lineNumber]
            if(columnNumber > 0) element.textContent = pre[lineNumber].textContent.delete(columnNumber - 1);
            if(columnNumber > -1)  columnNumber--;
            if(columnNumber < 0 && lineNumber === 0) columnNumber = 0;
               
            
            if( columnNumber < 0 && pre[lineNumber].textContent.length === 0  || 
                (columnNumber === 0 && lineNumber === 0 && pre[lineNumber].textContent.length === 0)){
                    pre.splice(lineNumber,1)
                    element.parentElement.removeChild(element)
                    
            }
           
            if(columnNumber < 0 && lineNumber !== 0){
                columnNumber = pre[lineNumber - 1].textContent.length;
                lineNumber--;
            }

            
            // console.log(columnNumber, pre[lineNumber - 1].textContent)

            cursor.style.top = `${lineNumber * 21}px`;
            cursor.style.left = `${(columnNumber * 8)}px`;
            input.style.top = `${(lineNumber * 21)}px`;
            input.style.left = `${(columnNumber * 8)}px`;
            
            break;
        case "ArrowDown":
            if(pre.length === 0 ) return;
            if(lineNumber > -1 && lineNumber < pre.length - 1){
                lineNumber++;
            }
            
            if(pre[lineNumber].textContent.length < columnNumber){
                columnNumber = pre[lineNumber].textContent.length;
            }

            selectedPreLength = pre[lineNumber].textContent.length;

            input.style.left = `${columnNumber * 8}px`;
            input.style.top = `${lineNumber * 21}px`;
                
            cursor.style.left = `${columnNumber * 8}px`;
            cursor.style.top = `${lineNumber * 21}px`;
           
            break;
        case "ArrowUp":
            
            if(lineNumber > 0 && lineNumber < pre.length){
                lineNumber--;
            }

            if(pre[lineNumber].textContent.length < columnNumber){
                columnNumber = pre[lineNumber].textContent.length;
            }

            selectedPreLength = pre[lineNumber].textContent.length;

            input.style.left = `${columnNumber * 8}px`;
            input.style.top = `${lineNumber * 21}px`;

            cursor.style.left = `${columnNumber * 8}px`;
            cursor.style.top = `${lineNumber * 21}px`;
           

            break;
        case "ArrowLeft":
            if(columnNumber > 0 && columnNumber < pre[lineNumber].textContent.length  + 1){
                columnNumber--;
            }

            selectedPreLength = pre[lineNumber].textContent.length;

            input.style.left = `${columnNumber * 8}px`;
            cursor.style.left = `${columnNumber * 8}px`;
            

            break;
        case "ArrowRight":
            if(columnNumber > -1 && columnNumber < pre[lineNumber].textContent.length){
                columnNumber++;
            }
            selectedPreLength = pre[lineNumber].textContent.length;

            input.style.left = `${columnNumber * 8}px`;
            cursor.style.left = `${columnNumber * 8}px`;
        
            break;

        case "Enter":
            e.preventDefault()
            let currentElement = pre[lineNumber];

            const newPre = document.createElement("pre")

            if(currentElement === undefined){
                display.appendChild(newPre)
               
              
            }else{
            
                if(columnNumber === currentElement.textContent.length){
                
                    if(lineNumber + 1 > pre.length - 1){
                        display.appendChild(newPre)
                    }else{
                        display.insertBefore(newPre, pre[lineNumber + 1])
                    }

                }else{
                
                    if(lineNumber + 1 > pre.length - 1){
                        display.appendChild(newPre)
                    }else{
                        
                        display.insertBefore(newPre, pre[lineNumber + 1])

                        const firtPartSlice = pre[lineNumber].textContent.slice(0, columnNumber);
                        const lastPartSlice = pre[lineNumber].textContent.slice(columnNumber, pre[lineNumber].textContent.length);

                        pre[lineNumber].textContent = firtPartSlice;
                        newPre.textContent = lastPartSlice; 
                    }

                
                }
            }
            pre = [].slice.call(document.querySelectorAll("pre"));
            cursor.style.left = `${columnNumber = 0}px`;
            cursor.style.top = `${++lineNumber * 21}px`;
            input.style.left = `${columnNumber}px`;
            input.style.top = `${lineNumber * 21}px`;
            


            break;
        case "Escape":
            // e.preventDefault();
            break;
            
        default:
            
            let text = input.value;
            console.log(text)

            if(pre.length === 0){
                display.appendChild(document.createElement("pre"))
                pre = [].slice.call(document.querySelectorAll("pre"))
            }
            
            if(selectedPreLength > columnNumber){
                cursor.style.left = `${(columnNumber * 8)}px`;
                input.style.left = `${(columnNumber * 8)}px`;
            }else{
                cursor.style.left = `${(selectedPreLength * 8)}px`;
                input.style.left = `${(selectedPreLength * 8)}px`;
            }

            pre[lineNumber].textContent = pre[lineNumber].textContent.insert(text, columnNumber)
           
            e.target.value = "";
            columnNumber++;
            cursor.style.left = `${(columnNumber * 8)}px`;
            input.style.left = `${(columnNumber * 8)}px`;
            break;

    }

})







input.addEventListener("keyup", (e)=>{
    
    let key = e.key;
   
    if(key !== "Backspace"){


    }

    if(key !== "Backspace" && key !== "Enter"){

        let text = e.target.value;
        if(selectedPreLength > columnNumber){
            cursor.style.left = `${(columnNumber * 8)}px`;
            input.style.left = `${(columnNumber * 8)}px`;
        }else{
            cursor.style.left = `${(selectedPreLength * 8)}px`;
            input.style.left = `${(selectedPreLength * 8)}px`;
        }
        if(pre.length === 0 ) return;
        pre[lineNumber].textContent = pre[lineNumber].textContent.insert(text, columnNumber - 1)

        cursor.style.left = `${(columnNumber * 8)}px`;
        input.style.left = `${(columnNumber * 8)}px`;

        e.target.value = "";
    
    }
    
    
    
})







