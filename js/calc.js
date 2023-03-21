function showOpt(e) {
    e.classList.toggle('other')
    let check = e.classList.contains('other')
    let current = e.previousElementSibling;
    var tp = 55;
    while (current) {
        if (!check) {
            current.style.top = "0"
            current.style.opacity = 0;
        }
        else {
            current.style.top = tp + "px";
            current.style.opacity = 1;
            tp += 55;
        }
        current = current.previousElementSibling;
    }

}


// Getting which key is clicked by grouping of button using event listener
var keys = document.getElementsByClassName('__keys')[0];
// Target display screen to input the value
var input = document.querySelector('[name="input"]');
var operation = ""
input.addEventListener('input', function (e) {
    operation = e.target.value
    console.log(operation);
})

// Target output display to show the output
var output = document.getElementById('output_display');
// Target extra field 
var extra = document.getElementById('extra_field');
// Target function dropdown to get value when user click
var func = document.getElementById('function');
// Target trigonometry functions dropdown to get value when user click
var trigo = document.getElementById('trigonometry');

var square = false
var factorial = false
var equal = false
var cube = false
var cbrt = false
var tri_fun = false
Array.from(func.children).forEach((ele) => {
    ele.onclick = function (e) {
        let fun = "Math.".concat(e.target.value);
        input.value += e.target.value;
        operation += fun
    }
})
Array.from(trigo.children).forEach((ele) => {
    ele.onclick = function (e) {

        

        if(tri_fun){
            let fun = "Math.".concat(e.target.value).concat("Math.PI/180*(").concat(operation).concat('))')
            input.value = e.target.value + input.value + ')'
            operation = fun
        }
        else{

            if(e.target.value=='sec('){
                let fun = "1" + "/" + "Math.".concat("cos(").concat("Math.PI/180*");
                input.value = e.target.value;
                operation = fun
                tri_fun=true      
            }
            else if(e.target.value=='cot('){
                let fun = "1" + "/" + "Math.".concat("tan(").concat("Math.PI/180*");
                input.value = e.target.value;
                operation = fun
                tri_fun=true      
                
            }
            else if(e.target.value=='cosec('){
                let fun = "1" + "/" + "Math.".concat("sin(").concat("Math.PI/180*");
                input.value = e.target.value;
                operation = fun
                tri_fun=true      

            }
            else{
                let fun = "Math.".concat(e.target.value).concat("Math.PI/180*");
                input.value = e.target.value;
                operation = fun
                tri_fun=true

            }

        }
    }
})

// extra function 
Array.from(extra.children).slice(0, -1).forEach((ele) => {
    ele.onclick = function (e) {
        input.value += e.target.value;
        operation += input.value

        // done
        if (e.target.value == "2^") {
            operation = operation.replace("^", "**");
        }

        // done
        if (e.target.value == 'cube') {

            if (cube) {
                input.value = ''
                operation = ''
                input.value = 'cube(' + output.innerHTML + ')'
                operation = input.value.replace('cube', "").concat('**3')

                output.innerHTML = eval(operation)
                output.style.opacity = 1;
                output.style.top = 0;
            }
            else {
                input.value = 'cube(' + input.value.replace("cube", "") + ')';
                operation = input.value.replace("cube", "").concat("**3")
                cube = true
            }

        }

        // done
        if (e.target.value == 'cbrt') {

            if (cbrt) {
                input.value = ''
                operation = ''
                input.value = 'cbrt(' + output.innerHTML + ')'
                operation = 'Math.'.concat(input.value)
                // operation = input.value.replace('cube', "").concat('**3')

                output.innerHTML = eval(operation)
                output.style.opacity = 1;
                output.style.top = 0;

            }
            else {
                input.value = 'cbrt(' + input.value.replace("cbrt", "") + ')';
                operation = 'Math.'.concat(input.value)
                cbrt = true
            }

        }

        if (e.target.value == 'logxy') {

            input.value = input.value.replace('logxy', "") + " " + "log base ";
            //5555logxy2
            console.log(operation);
            var temp = input.value.split(' log base ');
            operation = "Math.log(" + temp[0] + ")" + '/' + "Math.log("
        }

        // done
        if (e.target.value == 'e^') {
            input.value = Math.E + input.value.replace('e', "")
            operation = input.value.replace('^', "**")
        }

    }
})

Array.from(keys.children).slice(1).forEach((ele) => {
    ele.children[0].onclick = function (e) {

        if (input.value[0] == 0 && operation == '0') {
            input.value = input.value.slice(1, input.value.length)
            operation = operation.slice(1, operation.length)
        }
        input.value += e.target.value
        operation += e.target.value

        if (input.value[0] == '*' || input.value[0] == '/' || input.value[0] == '+' || input.value[0] == '=') {
            output.innerHTML = `<p style="color:red;">Invalid!</p>`
            output.style.opacity = 1;
            output.style.top = 0;
            input.value = ""
        }

        if (e.target.value == 'mod') {

            operation = operation.replace("mod", "%");
        }

        if (e.target.value == 'C') {
            input.value = ""
            operation = ""
            output.innerHTML = ""
        }

        if (e.target.value == "DE") {
            input.value = input.value.replace("DE", "").slice(0, -1);
            operation = operation.replace("DE","").slice(0,-1)
            // console.log(operation);
            // operation = input.value;
        }

        if (e.target.value == '+-') {
            input.value = "-".concat(input.value.replace("+-", ""))
            operation = input.value
        }

        if (e.target.value == 'ln(') {
            let fun = "Math.log(";
            operation = operation.replace("ln(", "") + fun
        }
        if (e.target.value == 'abs') {
            input.value = 'abs(' + input.value.replace("abs", "") + ')';
            operation = 'Math.'.concat(input.value)

        }

        // done
        if (e.target.value == 'sqroot(') {
            let fun = "Math.sqrt("
            // input.value = 'sqrt(' + input.value.replace("sqrt","") + ')';
            operation = operation.replace("sqroot(", "") + fun
        }


        if (e.target.value == 'log10(') {
            let fun = "Math.log10(";
            operation = operation.replace("log10(", "") + fun
        }

        if (e.target.value == '10^') {
            operation = operation.replace("^", "**");
        }

        // Done
        if (e.target.value == 'sqr(') {
            if (square) {
                input.value = input.value.slice(0, -4)
                input.value = 'sqr(' + input.value + ')'
            }
            else {

                input.value = e.target.value + input.value.replace('sqr(', '') + ')'
            }
            square = true;
            var sqr = operation
            operation = '(' + sqr.replaceAll('sqr(', "") + '**2)'
        }

        if (e.target.value == '1/') {
            input.value = e.target.value.concat("(" + input.value.replace("1/", "") + ")");
            operation = input.value
        }

        if (e.target.value == '^') {
            input.value = "(" + input.value.replace("^", "") + ")" + "^";
            operation = input.value.replace("^", "**")
        }

        //done
        if (e.target.value == 'exp') {
            input.value = parseInt(input.value).toExponential()
        }

        // done
        if (e.target.value == 'fact(') {

            if (factorial) {
                let fact = 1;
                input.value = ""
                var num = parseInt(output.innerHTML);
                input.value = 'fact(' + output.innerHTML + ')'
                for (var i = 1; i <= num; i++) {
                    fact *= i;
                }
                output.innerHTML = fact;
                output.style.opacity = 1;
                output.style.top = 0;
            }
            else {
                let fact = 1;
                let num = parseInt(input.value.replace("fact(", ""));
                for (var i = 1; i <= num; i++) {
                    fact *= i;

                }
                input.value = 'fact(' + input.value.replace('fact(', "") + ')'
                output.innerHTML = fact;
                output.style.opacity = 1;
                output.style.top = 0;
                factorial = true

            }
        }

        // done
        if (e.target.value == '=') {

            if (equal) {
                input.value = ''
                operation = ''
                input.value = output.innerHTML
                operation = output.innerHTML
                equal = false
            } else {
                try {
                    output.innerHTML = eval(operation.slice(0, -1)).toFixed()
                    output.style.opacity = 1;
                    output.style.top = 0;
                } catch (err) {
                    output.innerHTML = `<p style="color:red;">Syntax error!</p>`
                    output.style.opacity = 1;
                    output.style.top = 0;
                    input.value = ""
                }
                equal = true

            }
        }
        console.log(operation);
    }

})

// to store the input into memory
var bs = document.getElementById('bottom-sheet');
function memoryStore() {

    var ms;
    if (localStorage.getItem('MS') == null) {
        ms = []
    }
    else {
        ms = JSON.parse(localStorage.getItem('MS'))
    }

    ms.push(input.value)

    localStorage.setItem('MS', JSON.stringify(ms))
    bs.innerHTML=''
    showMemory()
}


function showMemory() {

    var ms;
    if (localStorage.getItem('MS') == null) {
        ms = []
        bs.innerHTML = "There's no history!"
    }
    else {
        ms = JSON.parse(localStorage.getItem('MS'))
        ms.reverse().forEach(ele => {
            bs.innerHTML += `<li style="padding:4px 8px;display: block;background-color: #d1e6f3;border-radius: 6px;margin-bottom:2px">${ele}</li>`
        })
    }

}

showMemory()

function clearMemory() {
    localStorage.removeItem('MS')
    showMemory()
}

function addMemory(){
    var ms;
    if (localStorage.getItem('MS') == null) {
        ms = []
    }
    else {
        ms = JSON.parse(localStorage.getItem('MS'))
    }

    console.log();
    ms[ms.length-1] = ms[ms.length-1] + Number(input.value)
    localStorage.setItem('MS', JSON.stringify(ms))
    bs.innerHTML=''
    showMemory()
    
}

function subMemory(){
    var ms;
    if (localStorage.getItem('MS') == null) {
        ms = []
    }
    else {
        ms = JSON.parse(localStorage.getItem('MS'))
    }
    
    console.log();
    ms[ms.length-1] = ms[ms.length-1] - Number(input.value)
    localStorage.setItem('MS', JSON.stringify(ms))
    bs.innerHTML=''
    showMemory()
    
}

function readMemory() {
    if (bs?.firstElementChild?.innerHTML) {

        input.value = bs.firstElementChild.innerHTML;
        operation = bs.firstElementChild.innerHTML;
    }
}

// Array.from(bs.children).forEach((ele, index) => {
//     ele.onclick = function (e) {
//         console.log(data);
//         data.splice(index, 1)
//         localStorage.setItem("MS", [data])
//         ele.remove()
//         // console.log(data);
//     }
// })

// console.log(Math.log10)