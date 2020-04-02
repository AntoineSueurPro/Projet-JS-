const images = ["url('images/image1.jpg')","url('images/image2.jpg')", "url('images/image3.jpg')","url('images/image4.jpg')"]; // les images du diapo 

class Diaporama { //création de Diaporama
    constructor() {
        this.container = document.getElementById("diaporama");
        this.pause = document.getElementById("pause");
        this.play = document.getElementById("play");
        this.arrow_right = document.getElementById("arrow_right");
        this.arrow_left = document.getElementById("arrow_left");
        this.counter = 0;
        this.interval = 0;
    }
    
    // ici sont les methodes de diaporama
    
    slide(){ // la methode qui va permettre d'afficher le slide du diapo
        if (this.counter === (images.length)){ // Si mon compteur est egal a l'indice max du tableau, on le fait revenir a 0 pour revenir sur la première image
            this.counter = 0;
            this.container.style.backgroundImage = images[this.counter];
            
        };
        if (this.counter <= (images.length-1)) { // Si mon compteur est inferieur au nombre d'indice max du tableau 
            this.container.style.backgroundImage = images[this.counter]; // le compteur vaut l'indice dans le tableau*
            this.counter++;
        };
    }
    playButton(){
        clearInterval(this.interval);
        this.interval = setInterval(() => {this.slide()},5000); // mise en place du bouton play qui va appeler slide() toute les 5sec.
    };
    start(){ // Lancement du diapo par défaut
        
        this.pause.style.color = "rgba(41,128,202,1)";
        this.play.style.color = "black";
        
        this.arrow_left.addEventListener("click", () => { //on écoute si il y a un clic sur l'icone de la flèche gauche.
            clearInterval(this.interval); // On clearInterval pour eviter que les images sautent.
            this.pause.style.color = "rgba(41,128,202,1)";
            this.play.style.color = "black";
            if(this.counter === 0){ //si mon compteur est à 0
                    this.counter = images.length;
                    this.container.style.backgroundImage = images[this.counter];
                    
                };
                this.counter--;
                this.container.style.backgroundImage = images[this.counter];
                
    // Dans cette partie du script je fais revenir mes valeurs counter à -1 car quand nous appuyons sur la flèche de droite alors que nous somme a l'indice 3 (le dernier) la valeur counter est déjà a -1 vu que la condition (images.length - 1) est valide. Il passe donc a 0 avec l'incrémentation.
            
        });
        this.arrow_right.addEventListener("click", () => { //on écoute si il y a un clic sur la flèche droite. Si c'est la flèche droite, verifier que l'on est pas au dernier indice, sinon retourner a l'indice -1.
            clearInterval(this.interval);
            this.pause.style.color = "rgba(41,128,202,1)";
            this.play.style.color = "black";
            if (this.counter === (images.length - 1)) {
                    this.counter = -1;
                    this.container.style.backgroundImage = images[this.counter];
                };
                this.counter++;
                this.container.style.backgroundImage = images[this.counter];
                
        });
        
        document.addEventListener("keydown", (event) => { // on écoute si une touche du clavier est activée
            clearInterval(this.interval);
            this.pause.style.color = "rgba(41,128,202,1)";
            this.play.style.color = "black";
            this.nameKey = event.key;
            
            if (this.nameKey === "ArrowLeft"){ //si l'on appuie sur flèche gauche
                if(this.counter === 0){
                    this.counter = images.length;
                    this.container.style.backgroundImage = images[this.counter];
                    
                };
                this.counter--;
                this.container.style.backgroundImage = images[this.counter];
               
                
            };
            if (this.nameKey === "ArrowRight") { //Si l'on appuie sur flèche droite
                if (this.counter === (images.length - 1)) {
                    this.counter = -1;
                    this.container.style.backgroundImage = images[this.counter];
                    
                };
                this.counter++;
                this.container.style.backgroundImage = images[this.counter];
                
                
            };
        });
        this.pause.addEventListener("click", () => { //mise en place de l'event pause 
                clearInterval(this.interval);
                this.pause.style.color = "rgba(41,128,202,1)"; //changement de couleurs des boutons
                this.play.style.color = "black";
            });
        this.play.addEventListener("click", () => { //mise en place de l'event play
            this.playButton();
            this.pause.style.color = "black";
            this.play.style.color = "rgba(41,128,202,1)";
        });
    };
};
const diaporama = new Diaporama();
diaporama.start();
