function showOpt(e) {
    e.classList.toggle('other')
    let check = e.classList.contains('other')
    let current = e.previousElementSibling;
    var lf = 76;
    while (current) {
        if (!check) {
            current.style.left = "0"
            current.style.opacity = 0;
        }
        else {
            current.style.left = lf + "px";
            current.style.opacity = 1;
            lf += 76;
        }
        current = current.previousElementSibling;
    }

}


// Getting which key is clicked by grouping of button using event listener
var keys = document.getElementsByClassName('__keys')[0];
// Target display screen to input the value
var input = document.querySelector('[name="input"]');
var operation=""
input.addEventListener('input',function(e){
    operation=e.target.value
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

Array.from(func.children).forEach((ele) => {
    ele.onclick = function (e) {
        let fun = "Math.".concat(e.target.value);
        input.value += e.target.value;
        operation+=fun 
    }
})
Array.from(trigo.children).forEach((ele) => {
    ele.onclick = function (e) {
        let fun = "Math.".concat(e.target.value).concat("Math.PI/180*");
        input.value += e.target.value;
        operation+=fun 
    }
})

Array.from(extra.children).slice(0, -1).forEach((ele) => {
    ele.onclick = function (e) {
        input.value+=e.target.value;
        operation+=input.value
        if(e.target.value=='cube')
        {
            input.value = 'cube(' + input.value.replace("cube","") + ')';
            operation = input.value.replace("cube","").concat("**3")
        }

        if(e.target.value == '2^'){
            operation= operation.replace("^","**");
        }

        if(e.target.value=='cbrt'){
            input.value = 'cbrt(' + input.value.replace("cbrt","") + ')';
            operation = 'Math.'.concat(input.value)
        }

    }
})

Array.from(keys.children).slice(1).forEach((ele) => {
    ele.children[0].onclick = function (e) {
        input.value += e.target.value
        operation+=e.target.value

        if (input.value[0] == '*' || input.value[0] == '/' || input.value[0] == '+' || input.value[0] == '=') {
            output.innerHTML = `<p style="color:red;">Invalid!</p>`
            output.style.opacity = 1;
            output.style.top = 0;
            input.value = ""
        }
        
        if(e.target.value=='mod')
        {
            
            operation=operation.replace("mod","%");
        }
        
        if(e.target.value=='C')
        {
            input.value=""
            operation=""
            output.innerHTML=""
        }
        
        if(e.target.value=="DE")
        {
            input.value=input.value.replace("DE","").slice(0,-1);
            operation= input.value;
        }
        
        if(e.target.value=='+-'){
            input.value= "-".concat(input.value.replace("+-",""))
            operation = input.value
        }
        
        if(e.target.value=='ln(')
        {
            let fun = "Math.log(";
            operation=operation.replace("ln(","")+fun 
        }
        if(e.target.value=='abs'){
            input.value = 'abs(' + input.value.replace("abs","") + ')';
            operation = 'Math.'.concat(input.value)

        }
        if(e.target.value=='sqrt')
        {
            input.value = 'sqrt(' + input.value.replace("sqrt","") + ')';
            operation = 'Math.'.concat(input.value)
        }


        if(e.target.value=='log10')
        {
            let fun = "Math.";
            operation+=fun 
        }

        if(e.target.value == '10^'){
            operation= operation.replace("^","**");
        }
        if(e.target.value=='sqr'){
            input.value = 'sqr(' + input.value.replace("sqr","") + ')';
            operation = input.value.replace("sqr","").concat("**2")
        }
        if(e.target.value=='1/'){
            input.value = e.target.value.concat("("+ input.value.replace("1/","") +")");
            operation=input.value
        }

        if(e.target.value=='^'){
            input.value= "("+ input.value.replace("^","") + ")" + "^";
            operation = input.value.replace("^","**")

        }

        if (e.target.value == '=') {

            try{
                output.innerHTML = eval(operation.slice(0,-1))
                output.style.opacity = 1;
                output.style.top = 0;
            }catch(err)
            {
                output.innerHTML = `<p style="color:red;">Syntax error!</p>`
                output.style.opacity = 1;
                output.style.top = 0;
                input.value=""
            }
        }
        console.log(operation);
    }

})


// console.log()