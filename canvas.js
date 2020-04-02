
class Canvas {
    constructor() {
        this.button = document.getElementById("buttona");
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext('2d');
        this.x;
        this.y;
        this.rentButton = document.getElementById("rent_button");
        this.cancel = document.getElementById("cancel");
        this.isPaint = false;
        this.isStarting = true;
        this.isCheck = false;
        this.canvasButton = document.getElementById("canvas_button");
        this.signWatch = 0;
        this.outWindows = false;
    }
    init() {
        this.button.addEventListener('click', (event) => { //au clic sur valider lance la methode write de l'objet canvas
            canvas.write();
        })
        this.cancel.addEventListener('click', () => { // Si clic sur annuler
            this.context.clearRect(0,0, this.canvas.width, this.canvas.height); //vide le canvas
            this.canvas.style.display = "none"; //le cache
            this.canvasButton.style.display = "none"; // cache ses boutons
            sessionStorage.setItem("isSign", false); //remise par défaut
            this.signWatch = 0; // remise par défaut
        })
        this.rentButton.addEventListener('click', () => { //si clic sur valider
            if (sessionStorage.getItem("isGood") === "true") { //vérifie que mon item est passé a true
                
                document.getElementById("rent_part").style.display = "flex"; //affiche la partie rent_part de mon html
                document.getElementById("canvas").style.display = "none"; //cache le canvas
                document.getElementById("canvas_button").style.display ="none"; //cache ses boutons
                document.getElementById("form").style.display = "none"; // cache la partie formulaire
                sessionStorage.setItem("isSign", true); //la variable passe a true car le canvas est signé
                sessionStorage.setItem("isRenting", true); //passe a true car la réservation est lancée
                this.context.clearRect(0,0, this.canvas.width, this.canvas.height); //vide le canvas
                this.signWatch = 0; //remise par défaut
                document.getElementById("station_avail").style.color = "black"; //remet la couleur des vélos par défaut
            } else {
                alert("Veuillez signer correctement.") //sinon alert l'utilisateur du probleme
                sessionStorage.setItem("isSign", false);
                this.context.clearRect(0,0, this.canvas.width, this.canvas.height); //vide le canvas
                this.signWatch = 0; //remet par défaut pour reinitialiser la signature
                this.outWindows = false;
            }
            
        })
    }
        
    write() {
        this.canvas.addEventListener("mousedown", (event) => { //Si il y a un evenement mousedown (contrairement au clic qui attend le mouseup pour être considéré comme clic)
            this.isPaint = true; 
            this.isStarting = true;
            this.context.lineWidth = 1; //epaisseur de la ligne
            this.context.strokeStyle = "black"; //couleur de la ligne
            this.context.beginPath(); // lance le nouveau chemin de tracé
            this.context.moveTo(this.x, this.y); //point de départ du tracé
            this.outWindows = true; //variable passe a true pour incrémenter la variable que si la souris est en train de bouger(mousemove) en mousedown
        })
        if (this.isStarting === true) { 
            this.canvas.addEventListener("mousemove", (event) => { //quand la souris se déplace
                if (this.isPaint === true) { //est true seulement si on est en mousedown
                    this.x = event.offsetX; //x est la coordonnée de la position x relatif a la fenetre canvas
                    this.y = event.offsetY; // comme x
                    this.context.lineTo(this.x, this.y); // point d'arrivée du tracé
                    this.context.stroke(); //effectue le trait
                    if (this.outWindows === true) { //si on est en mousedown en même temps
                        this.signWatch = this.signWatch +1; //incrémente this.signWatch pour observer si la signature est valide
                        console.log(this.signWatch);
                     }
                    if (this.signWatch > 35) { //est considéré comme valide si la valeur atteint ce seuil
                        sessionStorage.setItem("isGood", true);
                    }
                }
            })
        }
        this.canvas.addEventListener("mouseup", (event) => { //au levé du doigt sur le clic
            this.context.strokeStyle = "rgba(0,0,0,0)"; //le style de la ligne passe en opacity 0 pour eviter de continuer a dessiner
            this.x = event.offsetX;
            this.y = event.offsetY;
            this.context.moveTo(this.x, this.y);
            this.outWindows = false; //passe a false pour éviter d'incrémenter quand on passe la souris dessus dans etre en mousedown.
        })
    }
}
const canvas = new Canvas();
canvas.init();