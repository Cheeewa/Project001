//--code to animate the transformation--
//  1) fade in blue box 
//  2) do operator
//  3) next

let inImg;
let operator;
let outImg;
let transform;

let op, img, imgOut;

let lockImg,lockOp = false;

function init(){
    write_img1('.ip');
    write_img1('.op');
}

//@TODO allow value of the pixel on @PARAM:type to be changed 
//deprecated bc low reusability lmao
function write_img(type){
    document.querySelectorAll(type)
    .forEach(e => e.addEventListener("click", function () {
        console.log("clicked");
        if ((!lockImg && type=='.ip') || (!lockOp && type=='.op')){
            if (this.style.backgroundColor=="black"){
                this.style.backgroundColor="white";
            }
            else {
                this.style.backgroundColor="black";
            }
        }
    }));
}

//@TODO allow value of the pixel on @PARAM:type to be changed::OPTIMIZED
function write_img1(type){
    document.querySelectorAll(type).forEach(e => e.addEventListener("click", paint));
}

function paint(event) {
    console.log('got it!');
    const type = event.target.className; 
    if ((!lockImg && type=='ip') || (!lockOp && type=='op')){
        if (this.style.backgroundColor=="black"){
            this.style.backgroundColor="white";
        }
        else {
            this.style.backgroundColor="black";
        }
    }
}

function createImg(dimension){
    let arr=new Array();
    for (var i = 0; i < dimension; i++) {
        arr[i] = new Array(dimension);
    }
    return arr;
}

//consider DOMonLoad??
window.onload = function(){

    init();
    console.log('init')
    var lockImgBtn = document.getElementById('crIm');
    var lockOpBtn = document.getElementById('crOp');
    var operateBtn = document.getElementById('oprt');
    var reOpBtn = document.getElementById('reOp');
    var reImBtn = document.getElementById('reIm');
    var eroBtn = document.getElementById('ero');
    var dilBtn = document.getElementById('dil');

    lockImgBtn.onclick = function(){
        //console.log('button works')
        // if (!lockImg){
        //     document.getElementById('crIm').innerText="unlock edit";
        //     lockImg = !lockImg;
        // }
        // else {
        //     document.getElementById('crIm').innerText="lock edit"
        //     lockImg = !lockImg
        // }
        console.log(outImg);
    }


    operateBtn.onclick = function (){
        lockImg=true;
        lockOp=true;
        let mode = document.getElementById('dropdownMenuButton').innerText;
        if (lockImg && lockOp){
            img = document.querySelectorAll('.ip');
            op = document.querySelectorAll('.op');
            imgOut = document.querySelectorAll('.output');

            let color;
            //inImg = createImg(5);
            operator = createImg(3);
            //outImg = createImg(7);
            //transform = [];
            // //save inImg in array for processing
            // for(let i = 0; i < img.length; i++){
            //     color = img[i].style.backgroundColor==""?"white":img[i].style.backgroundColor;
            //     [,x,y] = [...(img[i].id)];
            //     inImg[x][y] = color;            
            //     //console.log(color,x,y);
            // }
            // //prepare image edges
            // for (let i = 0; i < 5; i++){
            //     inImg[i].unshift("white");
            //     inImg[i].push("white");
            // }
            // let wRow = [["white","white","white","white","white","white","white"]];
            // inImg = [...wRow,...inImg,...wRow];
            
            //save operator for processing
            for(let i = 0; i < op.length; i++){
                color = op[i].style.backgroundColor==""?"white":op[i].style.backgroundColor;
                [,x,y] = [...(op[i].id)];
                operator[x][y] = color;             
                //console.log(color,x,y);
            }

            console.log(operator);
            //console.log(inImg);
            //console.log(mode);
            //operate
            //shiit 4 layeerr loop

            // for (let i = 1; i < 5+1; i++){
            //     for (let j = 1; j < 5+1; j++){
            //         Options[mode](i,j);
            //         //console.log(i,j)
            //     }
            // }
            // //trim the edges of output array for showing on HTML page
            // outImg.shift()
            // outImg.pop()
            // for (let i = 0; i < 5; i++){
            //     outImg[i].shift();
            //     outImg[i].pop();
            // }
            // console.log(outImg);
            // console.log(transform)

            for(let i = 0; i < img.length; i++){
                imgOut[i].style.borderColor="black";
                imgOut[i].style.borderWidth='2px';

                setTimeout(function timer() {
                    imgOut[i].style.borderColor="deepskyblue";
                    imgOut[i].style.borderWidth='4px';
                    //put back the value from array into the img HTML
                    //doesnt work well. need to loop through filter and put all pixel at once
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
                }, (i +1 )* 1000);
                
                console.log('after sleep');
            }
        }
    }

    lockOpBtn.onclick = function() {
        if (!lockOp){
            document.getElementById('crOp').innerText="unlock edit";
            lockOp = !lockOp;
        }
        else {
            document.getElementById('crOp').innerText="lock edit"
            lockOp = !lockOp
        }
    }

    reImBtn.onclick = function(){
        if (!lockImg){
            document.querySelectorAll('.ip').forEach(e => e.style.backgroundColor="white");
        }
        else {
            console.log("Image locked!");
        }
    }
    
    reOpBtn.onclick = function(){
        if (!lockOp){
            document.querySelectorAll('.op').forEach(e => e.style.backgroundColor="white");
        }
        else {
            console.log("Image locked!");
        }
    }

    eroBtn.onclick = () => {
        operator = "erosion";
        document.getElementById('dropdownMenuButton').innerText=operator;
}
    dilBtn.onclick = () => {
        operator = "dilation";
        document.getElementById('dropdownMenuButton').innerText=operator;
    }
        
}

const Options = {
    "dilation":(i)=>{
        // let hit = (operator[1][1] === inImg[i][j]);
        // if(hit){
        //     transform.push(true);
        //     for (let m = 0; m < 3; m++){
        //         for (let n=0; n < 3; n++){
        //             if(operator[m][n]==="black"){
        //                 outImg[i+m-1][j+n-1] = "black";
        //             }
        //         }
        //     }    
        // }
        // else{
        //     transform.push(false);
        //     if (outImg[i][j]!=="black"){
        //         outImg[i][j] = "white";
        //     }
        // } 
        let [x, y] = [...String(i.toString(5)).padStart(2,'0')].map(e => parseInt(e));
        console.log(x,y)
        for (let m = 0; m < 3; m++){
            for (let n=0; n < 3; n++){
                let index = i - 6 + parseInt(`${m}${n}`, 5)
                //console.log(index)
                if (x+m-1 >= 0 && y+n-1 >= 0 && x+m-1 < 5 && y+n-1 < 5) {
                    if (imgOut[index].style.backgroundColor !== "black"){
                        imgOut[index].style.backgroundColor = operator[m][n];
                    }
                }
            }
        } 
    },
    "erosion":(i, j)=>{
        let hit;
        loop1:
        for (let m = 0; m < 3; m++){
            for (let n=0; n < 3; n++){
                hit = (operator[m][n] === "black" && inImg[i+m-1][j+n-1]==="black")
                if(hit){
                    outImg[i+m-1][j+n-1] = "black";
                }
                else{
                    break loop1
                }
            }
        }
        if (outImg[i][j] !== "black"){
            outImg[i][j] = "white";  
        }
        console.log(outImg);
    },
    "Select operator":() => {
        alert("Please select operator!!");
    }
};