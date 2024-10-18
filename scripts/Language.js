
var Messages = {
    "en": {
    "PermissionTitle": "Permission for cookie usage",
    "PermissionBody": "This site uses cookies to enhance your experience. Please accept the use of cookies to continue.",
    "PermissionBtn": "Accept cookies",
    "Accept": "Accept",
    "Steps": [
      "1. Avoid glare on the document",
      "2. Keep the document steady",
      "3. Achieve a good focus"
    ]
  },
    "es": {
      "PermissionTitle": "Permiso para el uso de cookies",
      "PermissionBody":"Este sitio utiliza cookies para mejorar su experiencia. Acepte el uso de cookies para continuar.",
      "PermissionBtn":"Aceptar cookies",
      "Accept":"Aceptar",
      "Steps": ["1. Evite el reflejo en el documento ", "2. Mantén el documento estable", "3. Logra un buen enfoque"]
    
    }
  }
  

function GetLanguage(){
    const userLang = navigator.language || navigator.userLanguage; 

    const shortLang = userLang.split('-')[0];

    return shortLang;
}

function GetText(){

    var language = GetLanguage();

    const message = Messages[language] ? Messages[language] : Messages["en"];

    return message;
}