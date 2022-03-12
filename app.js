

let loader = document.querySelector(".loaderelement");
window.addEventListener("load",function(){
    loader.style.display = "none";
});

let link = document.querySelector("#social-linkedin");
link.addEventListener("click", function(){    
    location.href = 'https://www.linkedin.com/in/quinton-parks/';
});

let link1 = document.querySelector("#social-github");
link1.addEventListener("click", function(){    
    location.href = 'https://github.com/qparks753';
});

let link2 = document.querySelector('.resumebtn');
link2.addEventListener("click",()=>{
    location.href = "images/Quinton Parks Resume 2022 .pdf";
});


