export const IS_LOCAL = false;
let api ="http://flatio.ndu-systems.net/api"
let web ="http://flatio.ndu-systems.net"
if(IS_LOCAL){
    api='http://localhost:8080/flat/api';
    web='http://localhost:4200';    
}

export const   API_URL= api;
export const  WEB_HOST = web; 

export function GetImagePath(imageUrl){
    return `${API_URL}/Article/${imageUrl}`;
}


