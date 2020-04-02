const mapCarte = L.map('map').setView([43.2961743, 5.3699525], 14); //Invocation de la map leaflet
L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapCarte);

class Map { // Création de l'objet map
    constructor() {
        this.marker;
        this.responses;
        this.button = document.getElementById("buttona");
        this.cancel = document.getElementById("cancel");
        this.canvas = document.getElementById("canvas");
        this.canvasButton = document.getElementById("canvas_button");
        this.station = document.getElementById("station");
        this.cancel_rent = document.getElementById("cancel_timer");
        
    }
    isOkApi() { // Envoi d'une requête pour récuperer les infos
        
        const request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { //Si la requête est bien acheminée (avec le code 200 et .done)
                this.responses = JSON.parse(this.responseText); // alors convertir la réponse qui est au format JSON.
                for (const response of this.responses) {
                    this.marker = L.marker([response.position.lat, response.position.lng]); // pour chaque item présent dans la réponse, mettre un marker en fonction de la lattitude et longitude
                    this.marker.addTo(mapCarte);
                    this.marker.addEventListener("click", () => {
                        
                            sessionStorage.setItem("isClicked", true); // Va me permettre d'avoir l'information que l'utilisateur a cliquer sur un marker
                        
                        if (localStorage.getItem("alreadyPut") === "true") {
                            
                            document.getElementById("buttona").removeAttribute("disabled");
                        }
                        
                        if (sessionStorage.getItem("isRenting") != "true") { //En cas de refresh de la page, si la valeur était diffente de true, c'est qu'elle est false. Dans ce cas, comme elle n'existe pas a l'initialisation de la page, elle sera mise en false.
                            sessionStorage.setItem("isRenting", false);
                        }
                        if (sessionStorage.getItem("isRenting") === "false") { //Permet de garder de coter les adresse et nom si jamais il y a reservation.
                            
                            sessionStorage.setItem("stationNameRent", response.name);
                            sessionStorage.setItem("stationAdressRent", response.address);
                        }
                        
                        // a partir d'ici nous allons stocker les valeurs des stations pour les ressortir sur notre HTML durant le choix de station
                        
                        sessionStorage.setItem("stationName", response.name);
                        sessionStorage.setItem("stationAdress", response.address);
                        sessionStorage.setItem("stationAvail", response.available_bikes);
                        sessionStorage.setItem("stationPlace", response.available_bike_stands);
                        if (response.status === "OPEN") {
                            sessionStorage.setItem("stationEtat", "Ouverte");
                        } else {
                            sessionStorage.setItem("stationEtat", "Fermée")
                        }
                        
                        
                        // ici nous mettons nos données stockées dans le html
                        
                        document.getElementById("station_name").innerHTML = response.name;
                        document.getElementById("station_adress").innerHTML = response.address;
                        document.getElementById("station_avail").innerHTML = " Vélo disponibles : " + response.available_bikes;
                        document.getElementById("station_place").innerHTML = " Places disponibles : " + response.available_bike_stands;
                        document.getElementById("station_etat").innerHTML = "Station : " + sessionStorage.getItem("stationEtat");
                        
                        if (response.available_bikes >0){
                             // Si il y a des vélos disponibles vélo sera affiché en vert
                            document.getElementById("station_avail").style.color = "green";
                        }
                        else {
                            document.getElementById("buttona").setAttribute("disabled", ""); // Si aucun vélo, disabled le bouton
                            document.getElementById("station_avail").style.color = "red";
                        }  
                        
                    }
                )}
            }
        };
        request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey=f854a15afa923a9dfb6feece120778d71378e042"); //envoi de la requete avec le lien de l'api qui contient le nom de la ville (ici Marseille) et ma clef qui se situe après "key".
        request.send();
        
    }
    rent() {
       
        this.button.addEventListener("click", () => { // Au clic sur "valider", vérifie qu'une station est choisie puis modifie le html 
            if (sessionStorage.getItem("isClicked") === "true") {
                
                if (sessionStorage.getItem("isRenting") === "false") {
                    
                    document.getElementById("station_rent").innerHTML = sessionStorage.getItem("stationNameRent");
                    document.getElementById("adress_rent").innerHTML = sessionStorage.getItem("stationAdressRent");
                } 
            } 
        })
        
        this.isOkApi();
    }
}
 
const map = new Map();
map.rent();
