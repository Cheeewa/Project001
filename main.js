//--code to animate the transformation--
//  1) fade in blue box 
//  2) do operator
//  3) next

let op, img, imgOut;

let lockEdit = false;

function init(){
    write_img('.ip');
    write_img('.op');
}

//@TODO allow value of the pixel on @PARAM:type to be changed::OPTIMIZED
function write_img(type){
    document.querySelectorAll(type).forEach(e => e.addEventListener("click", paint));
}

function paint(event) {
    if (!lockEdit){
        if (this.style.backgroundColor=="black"){
            this.style.backgroundColor="white";
        }
        else {
            this.style.backgroundColor="black";
        }
    }
}

//consider DOMonLoad??
window.onload = function(){

    init();
    var operateBtn = document.getElementById('oprt');
    var reOpBtn = document.getElementById('reOp');
    var reImBtn = document.getElementById('reIm');
    var eroBtn = document.getElementById('ero');
    var dilBtn = document.getElementById('dil');
    var rstBtn = document.getElementById('rst');

    //operateBtn.onclick = 
    function operating (){
        //**save to JSON on localstorage**
        let mode = document.getElementById('dropdownMenuButton').innerText;
        img = document.querySelectorAll('.ip');
        op = document.querySelectorAll('.op');
        imgOut = document.querySelectorAll('.output');

        for(let i = 0; i < img.length; i++){
            imgOut[i].style.borderColor="black";
            imgOut[i].style.borderWidth='2px';

            setTimeout(function timer() {
                imgOut[i].style.borderColor="deepskyblue";
                imgOut[i].style.borderWidth='4px';
                //put back the value from array into the img HTML
                if (img[i].style.backgroundColor==="black"){
                    Options[mode](i);
                }
                img[i].style.borderColor="deepskyblue";
                img[i].style.borderWidth='4px';
            }, i * 1000);
            //maybe do the nested setTimeout instead
            setTimeout(function timer() {
                imgOut[i].style.borderColor="black";
                imgOut[i].style.borderWidth='2px';
                img[i].style.borderColor="black";
                img[i].style.borderWidth='2px';
                if (i === img.length-1){
                    lockEdit = false;
                    operateBtn.disabled = false;
                }
            }, (i +1 )* 1000); 
        }
    }

    operateBtn.onclick = function() {
        if (!lockEdit){
            lockEdit = true;
            operating();
            operateBtn.disabled=true;
        }
        // else {
        //     lockEdit = !lockEdit;
        //     operateBtn.innerText = "Operate"
        //     //do caching here
        //     //location.reload();
        //     //load chached value into this window
        // }
    }

    reImBtn.onclick = function(){
        if (!lockEdit){
            document.querySelectorAll('.ip').forEach(e => e.style.backgroundColor="white");
        }
        else {
            console.log("Image locked!");
        }
    }
    
    reOpBtn.onclick = function(){
        if (!lockEdit){
            document.querySelectorAll('.op').forEach(e => e.style.backgroundColor="white");
        }
        else {
            console.log("Image locked!");
        }
    }

    eroBtn.onclick = () => {
        document.getElementById('dropdownMenuButton').innerText="erosion";
    }
    dilBtn.onclick = () => {
        document.getElementById('dropdownMenuButton').innerText="dilation";
    }
    rstBtn.onclick = () => {
        
        document.querySelectorAll('.output').forEach(e => e.style.backgroundColor="white");
    }
        
}

const Options = {
    "dilation":(i)=>{
        let [x, y] = [...String(i.toString(5)).padStart(2,'0')].map(e => parseInt(e));
        //console.log(x,y)
        let imgIndex, opIndex, opColor;  
        for (let m = 0; m < 3; m++){
            for (let n=0; n < 3; n++){
                imgIndex = i - 6 + parseInt(`${m}${n}`, 5)
                opIndex = parseInt(`${m}${n}`, 3)
                if (x+m-1 >= 0 && y+n-1 >= 0 && x+m-1 < 5 && y+n-1 < 5) {
                    if (imgOut[imgIndex].style.backgroundColor !== "black"){
                        opColor = op[opIndex].style.backgroundColor===""?"white":op[opIndex].style.backgroundColor
                        imgOut[imgIndex].style.backgroundColor = opColor;
                    }
                }
            }
        } 
    },
    "erosion":(i)=>{
        let [x, y] = [...String(i.toString(5)).padStart(2,'0')].map(e => parseInt(e));
        let imgIndex, opIndex, opColor;  
        let match = true;
        for (let m = 0; m < 3; m++){
            for (let n=0; n < 3; n++){
                imgIndex = i - 6 + parseInt(`${m}${n}`, 5)
                opIndex = parseInt(`${m}${n}`, 3)
                opColor = op[opIndex].style.backgroundColor===""?"white":op[opIndex].style.backgroundColor
                if (x+m-1 >= 0 && y+n-1 >= 0 && x+m-1 < 5 && y+n-1 < 5) {
                    if (img[imgIndex].style.backgroundColor != opColor && opColor==="black"){
                        match = false;
                    }
                }
                else {
                    imgColor = "white"
                    console.log(`opColor=${opColor}`)
                    if (imgColor!=opColor){
                        match = false;
                    }
                }
            }
        }
        console.log(match)
        if (match){
            for (let m = 0; m < 3; m++){
                for (let n=0; n < 3; n++){
                    imgIndex = i - 6 + parseInt(`${m}${n}`, 5)
                    opIndex = parseInt(`${m}${n}`, 3)
                    console.log(opIndex, op[opIndex].style.backgroundColor)
                    if (x+m-1 >= 0 && y+n-1 >= 0 && x+m-1 < 5 && y+n-1 < 5) {
                        if (imgOut[imgIndex].style.backgroundColor !== "black"){
                            opColor = op[opIndex].style.backgroundColor===""?"white":op[opIndex].style.backgroundColor
                            imgOut[imgIndex].style.backgroundColor = opColor;
                        }
                    }
                }
            }
        }
    },
    "Select operator":() => {
        alert("Please select operator!!");
    }
};