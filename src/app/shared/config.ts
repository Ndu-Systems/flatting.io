export const IS_LOCAL = true;
let api ="http://ndu-systems.net/guliwe/api"
let web ="http://ndu-systems.net"
if(IS_LOCAL){
    api='http://localhost:8080/flat/api';
    web='http://localhost:4200';    
}

export const   API_URL= api;
export const  WEB_HOST = web; 

export function GetImagePath(imageUrl){
    return `${API_URL}/Article/${imageUrl}`;
}


