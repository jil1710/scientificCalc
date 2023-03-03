function showOpt(e){
    e.classList.toggle('other')
    let check = e.classList.contains('other')
    let current = e.previousElementSibling;
    var lf = 76;
    while(current){
        if(!check)
        {
            current.style.left = "0"
            current.style.opacity = 0;
        }
        else{
            current.style.left = lf+"px";
            current.style.opacity = 1;
            lf+=76;
        }
        current = current.previousElementSibling;
    }

}