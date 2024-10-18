const COOKIE_NAME = "ONIDCOOKIE";
const REDIRECT = GetParam("backUrl");
Start();
function Start(){
SetValues();
}

function SetValues(){
    var values = GetText();

    var contador = 1;
    values.Steps.forEach(data => {

        var element = document.getElementById("step_"+contador);
 
        element.innerHTML = data;
        contador = contador + 1;
    });

     document.getElementById("btnAceptar").innerHTML = values.Accept;
}



function SetCookie(){
        document.cookie = `${COOKIE_NAME}=.; path=/; SameSite=None; Secure`; 
        window.location.href = `${REDIRECT}?step=1`;
}

function GetParam(paramName){
const urlParams = new URLSearchParams(window.location.search);

const url = urlParams.get(paramName);

return url;
}