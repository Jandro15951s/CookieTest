
var Messages = {
    "en": {
    "PermissionTitle": "Permission for cookie usage",
    "PermissionBody": "This site uses cookies to enhance your experience. Please accept the use of cookies to continue.",
    "PermissionBtn": "Accept cookies",
    "Accept": "Accept",
    "Steps": [
      "Avoid glare on the document",
      "Keep the document steady",
      "Achieve a good focus"
    ]
  },
    "es": {
      "PermissionTitle": "Permiso para el uso de cookies",
      "PermissionBody":"Este sitio utiliza cookies para mejorar su experiencia. Acepte el uso de cookies para continuar.",
      "PermissionBtn":"Aceptar cookies",
      "Accept":"Aceptar",
      "Steps": ["Evite el reflejo en el documento ", "Mantén el documento estable", "Logra un buen enfoque"]
    
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
