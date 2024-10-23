const OK = "ok";
const SCRIPT_ID = "OnIdScript"
const NAME = GetAttribute("data-name");
const LOGO_URL = GetAttribute("data-logo");
const VALIDATE_STEP = "redirect_to_steps";
const STEP_PARAM_NAME = "step";
const STEP = GetStep();
const USER = GetAttribute("data-user");
const PASSWORD = GetAttribute("data-password");
const WELCOME_PAGE = `https://portal.onid.us/wa/WelcomePage/WelcomePage.html?${STEP_PARAM_NAME}=${STEP}`;
const COMPONENT = `https://portal.onid.us/wa/auth?authmech=OnID+Password&do=login&username=${USER}&password=${PASSWORD}&cbval_vendorBase64=AAAk%2FwMGAAAAAQ%3D%3D&Submit1=Yes&&location=https%3a%2f%2fwebcomponentpsv.onid.us%2f`;
const STEPS_PAGE = `https://portal.onid.us/wa/WelcomePage/Steps.html?backUrl=${window.location.href}&&name=${NAME}&&imageUrl=${LOGO_URL}`;

function GetAttribute(name){

    const scriptTag = document.getElementById(SCRIPT_ID);
    const value = scriptTag.getAttribute(name);
    if(value == null){
        console.log(`You should provide a ${name} attribute for proper functionality.`)
    }
    return value;
}

function loadIframe() {



    const iframeElement = document.createElement('iframe');
    iframeElement.id = "verificationFrame";
    iframeElement.allow = "camera *; microphone *; fullscreen *; cross-origin *;";
    iframeElement.sandbox = "allow-scripts allow-storage-access-by-user-activation allow-same-origin allow-forms allow-modals";
    iframeElement.src = WELCOME_PAGE;
    iframeElement.style.width = "100%";
    iframeElement.style.height = "500px";
    iframeElement.style.maxWidth = "800px";
    document.getElementById('frame-onid-container').appendChild(iframeElement);

    // Add event listener to capture messages from the iframe
    window.addEventListener('message', function (event) {
        // Check if the message is from the iframe
        if (event.source === iframeElement.contentWindow) {
            var resultDiv = document.getElementById('result-onid');

            console.log("Received response data from iframe:", event.data);
            if (event.data.message == OK) {


       
                document.getElementById('verificationFrame').src = COMPONENT;
                document.getElementById('verificationFrame').allow = "camera *; microphone *; fullscreen *; cross-origin *;";
                DeleteParam();

            }

            if (event.data.message == VALIDATE_STEP) {
              
            window.location.href = STEPS_PAGE;
            }


            var procResponse = shortenStrings(event.data, 50);

            var response = JSON.stringify(procResponse, null, 2);

            var preElement = document.createElement('pre');
            preElement.style.whiteSpace = 'pre-wrap';
            preElement.style.backgroundColor = 'white';
            preElement.style.paddingLeft = '30px';
            preElement.textContent = response;
            if(resultDiv){
                resultDiv.appendChild(preElement);
            }
            
        }
    });


}



function shortenStrings(obj, maxLength) {
    if (typeof obj === 'string') {
        return obj.length > maxLength ? obj.substring(0, maxLength) + '...' : obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => shortenStrings(item, maxLength));
    }
    if (typeof obj === 'object' && obj !== null) {
        const newObj = {};
        for (const key in obj) {
            newObj[key] = shortenStrings(obj[key], maxLength);
        }
        return newObj;
    }
    return obj;
}

function DeleteParam() {
    const currentUrl = new URL(window.location);
    const params = currentUrl.searchParams;

    params.delete(STEP_PARAM_NAME);

    // Construye la nueva URL
    const newUrl = params.toString() ? currentUrl.toString() : currentUrl.origin + currentUrl.pathname;

    // Reemplaza la URL en el navegador sin recargar la página
    window.history.replaceState({}, document.title, newUrl);
}

function GetStep() {


    const urlParams = new URLSearchParams(window.location.search);

    var param = urlParams.get(STEP_PARAM_NAME);

    if (param == "null" || param == null) {

        param = "0";
    }

    return param;
}

loadIframe();
