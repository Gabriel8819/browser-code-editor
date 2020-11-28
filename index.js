const textarea = document.querySelector("textarea");
const cursor = document.querySelector("#cursor")
const container = document.querySelector(".container")
const display = document.querySelector("#display")
const input = document.querySelector("#input");


let pre = document.querySelectorAll("pre")
pre = [].slice.call(pre)

const editorHeight = textarea.offsetHeight;
const containerOffsetLeft = container.offsetLeft;



let length = 0;
let lineNumber = 0;
let columnNumber = 0;
let selectedPreLength = pre[0].innerText.length || 0;

String.prototype.insert = function(insert, index){
    return this.slice(0, index) + insert + this.slice(index, this.length);
    
};

String.prototype.delete = function(index){
    return this.slice(0, index) + this.slice(index+1, this.length);
}

// textarea.onblur = function(e){

//     let value = e.target.value.split("\n");
//     value.forEach((item)=>{
//         console.log(item)
//     })


// }



console.log(cursor)


setInterval(()=>{

    if(cursor.style.visibility === "hidden"){
        cursor.style.visibility = "visible"
       
    }else{

        cursor.style.visibility = "hidden"
    }
}, 550)




document.onkeydown = function(e){
    // console.log(e)


    switch(e.key){
        case "ArrowRight":
            cursor.offsetLeft >= container.offsetWidth ? cursor.style.left = `${container.offsetWidth}px` :cursor.style.left = `${cursor.offsetLeft + 8}px`;
            break;
        case "ArrowLeft":
            cursor.offsetLeft <= 0? cursor.style.left = `${0}px` : cursor.style.left = `${cursor.offsetLeft - 8}px`;
            break;

        case "ArrowDown":
            // cursor.offsetLeft >= container.offsetWidth ? cursor.style.left = `${container.offsetWidth}px` :cursor.style.left = `${cursor.offsetLeft + 8}px`;
            break;
        case "ArrowUp":
            // cursor.offsetLeft <= 0? cursor.style.left = `${0}px` : cursor.style.left = `${cursor.offsetLeft - 8}px`;
            break;

    }

   
}

 //21




// console.log(pre.length)



display.onclick = function(e){

    let y = e.clientY;
    let x = e.clientX;
    
    lineNumber = Math.floor((y - editorHeight)/21);
    columnNumber = Math.floor((x - container.offsetLeft)/8);

    if(lineNumber > -1 && lineNumber < pre.length){
        selectedPreLength = pre[lineNumber].innerText.length;
    }
    
    console.log(lineNumber,  pre.length)
 
    if(lineNumber < 0){
        cursor.style.top = `${0}px`;
        input.style.top = `${0}px`;
    }else if(lineNumber > pre.length - 1){
        cursor.style.top = `${(pre.length - 1)  * 21}px`;
        input.style.top = `${(pre.length - 1)  * 21}px`;
    }else{
        cursor.style.top = `${lineNumber * 21}px`;
        input.style.top = `${lineNumber * 21}px`;
    }


    if(columnNumber < 0){
        cursor.style.left = `${0}px`;
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
    

}

document.addEventListener("keydown", (e)=>{

    let key = e.key;

    //Backspace
    switch(key){
        case "Backspace":
            let element = pre[lineNumber]
            if(columnNumber > 0){
                element.textContent = pre[lineNumber].textContent.delete(columnNumber - 1);
                columnNumber--;
                cursor.style.left = `${(columnNumber * 8)}px`;
                input.style.left = `${(columnNumber * 8)}px`;
            }

            if(element.textContent.length === 0){
                pre.splice([columnNumber],1)
                element.parentElement.removeChild(element)
            }
            
            
            break;
        case "ArrowDown":
            if(lineNumber > -1 && lineNumber < pre.length -1){
                lineNumber++;
            }

            if(pre[lineNumber].textContent.length < columnNumber){
                columnNumber = pre[lineNumber].textContent.length;
                cursor.style.left = `${columnNumber * 8}px`;
            }
                
            cursor.style.left = `${columnNumber * 8}px`;
            cursor.style.top = `${lineNumber * 21}px`;
           

            break;
        case "ArrowUp":
            
            if(lineNumber > 0 && lineNumber < pre.length){
                lineNumber--;
            }

            if(pre[lineNumber].textContent.length < columnNumber){
                columnNumber = pre[lineNumber].textContent.length;
                cursor.style.left = `${columnNumber * 8}px`;
            }
            cursor.style.left = `${columnNumber * 8}px`;
            cursor.style.top = `${lineNumber * 21}px`;
           

            break;
        case "ArrowLeft":
            if(columnNumber > 0 && columnNumber < pre[lineNumber].textContent.length){
                columnNumber--;
            }
            cursor.style.left = `${columnNumber * 8}px`;
            

            break;
        case "ArrowRight":
            if(columnNumber > -1 && columnNumber < pre[lineNumber].textContent.length){
                columnNumber++;
            }
            cursor.style.left = `${columnNumber * 8}px`;
        
            break;
        default:
            let text = e.target.value;
            if(selectedPreLength > columnNumber){
                cursor.style.left = `${(columnNumber * 8)}px`;
                input.style.left = `${(columnNumber * 8)}px`;
            }else{
                cursor.style.left = `${(selectedPreLength * 8)}px`;
                input.style.left = `${(selectedPreLength * 8)}px`;
            }

            pre[lineNumber].textContent = pre[lineNumber].textContent.insert(text, columnNumber-1)
            e.target.value = "";
            columnNumber++;
            cursor.style.left = `${(columnNumber * 8)}px`;
            input.style.left = `${(columnNumber * 8)}px`;
            break;

    }



    // if(key === "Backspace"){
    //     pre[lineNumber].textContent = pre[lineNumber].textContent.delete(columnNumber - 1);
        
    //     columnNumber--;
    //     cursor.style.left = `${(columnNumber * 8)}px`;
    //     input.style.left = `${(columnNumber * 8)}px`;
    
        
    // }else{
    //     let text = e.target.value;
    //     if(selectedPreLength > columnNumber){
    //         cursor.style.left = `${(columnNumber * 8)}px`;
    //         input.style.left = `${(columnNumber * 8)}px`;
    //     }else{
    //         cursor.style.left = `${(selectedPreLength * 8)}px`;
    //         input.style.left = `${(selectedPreLength * 8)}px`;
    //     }

    //     console.log(e.target.value)
    //     pre[lineNumber].textContent = pre[lineNumber].textContent.insert(text, columnNumber - 1)
    //     console.log(pre[lineNumber].textContent)
    //     e.target.value = "";
    //     columnNumber = pre[lineNumber].innerText.length;
    //     cursor.style.left = `${(columnNumber * 8)}px`;
    //     input.style.left = `${(columnNumber * 8)}px`;
    // }

    

})


input.addEventListener("keyup", (e)=>{
    
    let key = e.key;

    if(key !== "Backspace"){


    }

    if(key !== "Backspace"){

        let text = e.target.value;
        if(selectedPreLength > columnNumber){
            cursor.style.left = `${(columnNumber * 8)}px`;
            input.style.left = `${(columnNumber * 8)}px`;
        }else{
            cursor.style.left = `${(selectedPreLength * 8)}px`;
            input.style.left = `${(selectedPreLength * 8)}px`;
        }

   
        pre[lineNumber].textContent = pre[lineNumber].textContent.insert(text, columnNumber-1)
    
        // columnNumber++;
        cursor.style.left = `${(columnNumber * 8)}px`;
        input.style.left = `${(columnNumber * 8)}px`;

        e.target.value = "";
    
    }
    
    
    
})




// let str = "abcdefghijklmnopqrst"


// // let newStr = str.delete(0);

// console.log(str.slice(1,2))
