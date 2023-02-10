document.addEventListener("DOMContentLoaded", ()=>{
    select = document.querySelector("#id");
    inputCode = document.querySelector(".input-code");
    
        select.addEventListener("change", ()=>{
    
            switch(select.value) {
                case 'uzb':
                    inputCode.value = '+998'
                    break;
                case 'tjk':
                    inputCode.value = '+992'
                    break;
                case 'kzk': 
                    inputCode.value = '+7'
                    break;
                default:
                    break;
            }
        })




        

    

})