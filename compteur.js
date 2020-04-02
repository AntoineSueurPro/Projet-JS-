
class Compteur {
    constructor() {
        this.mn = 19;
        this.sec = 59;
        this.goTimer = document.getElementById("rent_button");
        this.cancel_timer = document.getElementById("cancel_timer");
        this.interval = 0;
        this.station_rent = document.getElementById("station_rent");
        this.adress_rent = document.getElementById("adress_rent");
    }
    go_Timer() {
        this.cancel_timer.addEventListener('click', () => { //Si clic sur "annuler"
            clearInterval(this.interval); // clear l'interval pour stopper le compteur
            sessionStorage.clear(); //supprime tout le contenu de sessionStorage pour être prêt a refaire une réservation
            sessionStorage.setItem("refreshShield", false); // le shield du compteur n'a plus besoin d'être true
            this.mn = 19; // remet les valeur par défaut
            this.sec = 59;
            sessionStorage.setItem("isRenting", false); // remet la valeur par défaut
            document.getElementById("rent_part").style.display = "none"; // cache la partie réservation
            document.getElementById("rent_failed").style.display = "none";
            document.getElementById("failed").style.display = "inline-block"; //remet la partie le timer 
            document.getElementById("form").style.display = "block"; // ré - affiche la partie formulaire
            document.getElementById("station_name").innerHTML = "Nom"
            document.getElementById("station_adress").innerHTML = "Adresse"
            document.getElementById("station_avail").innerHTML = " Vélo disponibles : ";
            document.getElementById("station_place").innerHTML = " Places disponibles : " ;
            document.getElementById("station_etat").innerHTML = "Station : ";
            
        })
        this.goTimer.addEventListener('click', () => { //au clic sur "reserver" 
            if (sessionStorage.getItem("isRenting") === "false" && sessionStorage.getItem("isGood") === "true") { // Si la signature est ok et renting false lancer le compteur
                this.interval = setInterval(() => {this.timerCount()}, 1000);
                sessionStorage.setItem("isRenting", true); //passe isRenting à true
            }
        })
       if (sessionStorage.getItem("refreshShield") === "true") { // refreshShield permet de sauvegarder les sec et mn si refresh de la page
            this.mn = sessionStorage.getItem("minutes"); 
            this.sec = sessionStorage.getItem("secondes");
            document.getElementById("rent_part").style.display = "flex";
            document.getElementById("form").style.display = "none";
            document.getElementById("station_rent").innerHTML = sessionStorage.getItem("stationNameRent");
            document.getElementById("adress_rent").innerHTML = sessionStorage.getItem("stationAdressRent");
            clearInterval(this.interval);
            this.interval = setInterval(() => {this.timerCount()}, 1000);
        }
    }
    timerCount() {
        sessionStorage.setItem('minutes', this.mn);
        sessionStorage.setItem('secondes', this.sec);
        sessionStorage.setItem("refreshShield", true); //active notre refreshShield
        if (this.sec === 0) { // Si les sec tombent a zéro elles repassent a 59 et décrémentent les mn de 1 
            this.sec = 59;
            this.mn --;
        } else { //Sinon décrémenter les sec
            this.sec --;
        }
        if (this.mn === -1 && this.sec === 59) { //Si le compteur atteint sa valeur finale - 1sec ( pas 0m0s car sinon bug viseul a 2s)
            clearInterval(this.interval); //on stop l'interval
            sessionStorage.clear(); // on clear le session storage pour une nouvelle réservation
            document.getElementById("rent_failed").style.display = "block"; 
            document.getElementById("failed").style.display = "none";
            document.getElementById("sec").innerHTML = "00";
            sessionStorage.setItem("refreshShield", false); //désactive notre refreshShield
            sessionStorage.setItem("isRenting", false); //remise par défaut
            sessionStorage.setItem("isSign", false); //remise par défaut
            this.mn = 19; //remise par défaut
            this.sec = 59; //remise par défaut  
        }
        
        //Ces conditions vont permettre d'avoir le compteur qui affiche les secondes et les minutes avec le format 09 - 08 - 07 ... et d'afficher le compteur dans mon html 
        
        if (this.mn < 9  && sessionStorage.getItem("minutes") != null) { // Si les minutes sont inéferieur a 9 et non null mettre un 0 avant le chiffre.
            document.getElementById("min").innerHTML = "0"+ sessionStorage.getItem("minutes")
        } else if (sessionStorage.getItem("minutes") === null) { //Si les minutes sont null mettre 0;
            document.getElementById("min").innerHTML = "0";
        }
        else { //Sinon afficher les minutes tel quel
        document.getElementById("min").innerHTML = sessionStorage.getItem("minutes");
        }
        if (this.sec < 9 && sessionStorage.length > 1) { // même principe avec les secondes
            document.getElementById("sec").innerHTML = "0"+ sessionStorage.getItem("secondes");
        } 
        else if (sessionStorage.getItem("secondes") <= 0) {
            document.getElementById("sec").innerHTML = "00";
        } 
        else  {
            document.getElementById("sec").innerHTML = sessionStorage.getItem("secondes");
        }
        
    }
}
const compteur = new Compteur();
compteur.go_Timer();
