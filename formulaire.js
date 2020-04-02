let isValid = false;
let isValid2 = false;
class Formulaire {
    constructor() {
        this.prenom = document.getElementById("prenom");
        this.nom = document.getElementById("nom");
        this.button = document.getElementById("buttona");
        this.rent_part = document.getElementById("rent_part");
        this.canvas = document.getElementById("canvas");
        this.canvas_button = document.getElementById("canvas_button");
        this.cancel = document.getElementById("cancel");
    }
    listenForm(){
        // On écoute les formulaires pour enregistrer la valeur entrée dans local storage
        this.nom.addEventListener('input', () => {
            localStorage.setItem('nom', this.nom.value);
        })
        this.prenom.addEventListener('input', () => {
            localStorage.setItem('prenom', this.prenom.value);
            })
        // Au moment de cliquer sur le bouton, vérifier que les champs ne soient pas vides
        if (localStorage.getItem("alreadyPut") === "true") { //Cette valeur est true si il y a des données dans local storage, donc le bouton peut être désactivé car les données ne sont présente que si une réservation a été validée (donc ne permettra pas de disabled le bouton avec un refresh et un nom invalide)
            document.getElementById('buttona').removeAttribute("disabled");
        } 
        this.prenom.addEventListener('input', function(e) { // ce qui est écrit dans le formulaire sera mis dans la variable locale "value"
            let value = e.target.value;
            
            if (value.match(/[^A-Za-zÀ-ú-]/)) { //Regex qui renvoi false si il y a des lettre comprise entre A-Z en majuscule et minuscule (accent compris) et le signe "-". Cela prend en compte la chaine de caractère entière et pas uniquement a chaque entrée sur le clavier
                document.getElementById('buttona').setAttribute("disabled", ""); // Donc si elle renvoi true, c'est qu'il y a un chiffre ou autre donc ce n'est pas valide
                isValid = false;
                document.getElementById("prenom").classList.replace("input", "input_wrong")
                
            } else { // Sinon la valeur respecte bien mes attentes donc elle est valide
                isValid = true; 
                document.getElementById("prenom").classList.replace("input_wrong", "input")
            }
             if (isValid === true && isValid2 === true) { // Si les deux champs sont valide, le bouton est disabled pour pouvoir reserver
            document.getElementById('buttona').removeAttribute("disabled");
        }   
        })
        this.nom.addEventListener('input', function(e) { //même principe qu'avec le prenom
            let value = e.target.value;
            
            if (value.match(/[^A-Za-zÀ-ú-\s]/)) { //meme regex mais ici comme c'est un nom, on autorise les espaces avec \s
                document.getElementById('buttona').setAttribute("disabled", "");
                isValid2 = false;
                document.getElementById("nom").classList.replace("input", "input_wrong")
                localStorage.setItem("alreadyPut", false)
                
            } else {
                isValid2 = true;
                document.getElementById("nom").classList.replace("input_wrong", "input")
                
                
            }
            if (isValid === true && isValid2 === true) {
            document.getElementById('buttona').removeAttribute("disabled");
        }   
        })
        
        this.button.addEventListener('click', (e) => { //Au clic sur le bouton vérifie que les champs soient rempli et que des vélos sont dispo
            if(this.nom.value === "" || this.prenom.value === "" ) {
                alert("Veuillez renseigner les champs nom et/ou prénom.");
                e.preventDefault(); //preventDefault() permet à mon bouton de type "submit" de ne pas avoir son comportement de refresh quand on clic dessus
            } else if (sessionStorage.getItem("stationAvail") <= 0) { 
                e.preventDefault();
                alert("Veuillez choisir une station.")
            }
            
            else{
                localStorage.setItem("alreadyPut", true); //considère les données dans les champs nom prenom comme mise et valide.
                e.preventDefault();
                document.getElementById("canvas").style.display = "block"; //Si tout est bon afficher le canvas et ses boutons
                document.getElementById("canvas_button").style.display ="block";
            }
        })
        
        this.cancel.addEventListener('click', () => { //Si clic sur annuler cache la partie canvas du html
            document.getElementById("canvas").style.display = "none";
            document.getElementById("canvas_button").style.display ="none";
            sessionStorage.setItem("isRenting", false); //remet la valeur par défaut 
        })
     
        this.form_Save() //enregistre les nom et prenom entré dans le local storage
    }
    form_Save(){
        this.nom.value = localStorage.getItem("nom");
        this.prenom.value = localStorage.getItem("prenom");
    }
}
const formulaire = new Formulaire();
formulaire.listenForm();
