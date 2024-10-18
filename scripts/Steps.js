const COOKIE_NAME = "ONIDCOOKIE";
const REDIRECT = GetParam("backUrl");
Start();
function Start(){
SetValues();
}

function SetValues(){


    var name = GetParam("name") ?? "ONID";
    var logo = GetParam("imageUrl") ?? "https://onid.es/wp-content/uploads/2023/05/LogoOnID-1.png";

    document.getElementById("imgLogo").src = logo;
    document.getElementById("TitleName").innerHTML = name;

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
