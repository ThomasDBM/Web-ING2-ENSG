
//On crée la variable de la carte
let mymap = L.map('mapid').setView([49.1177, 6.17899], 19);  


//On ajoute les tuiles sur la carte
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

//On définit les variables globales
var Objets_recup= new Array();
var pseudo=self.location.href.split('=')[1];
var portrait='No_picture.png';
var markers={};

//On affiche le pseudo du joueur
var Affiche_nom=document.getElementById('Nom');
Affiche_nom.innerHTML=pseudo;

//On récupère un objet et on l'affiche sur la carte
function Recup_Objet(id,text,fonction){

  //On interroge la BDD
  fetch('BDD.php?Valeur='+id).then(function (result) {
    return result.json();

  }) .then(function (result) {    //On affiche un marqueur avec les informations de la BDD

    var objet = L.icon({
      iconUrl: "icons/"+result['icon'],
      iconSize:     [50, 50], 
      iconAnchor:   [30,50], 
      popupAnchor:  [-3, -76] 
    });
  
     var Objet = L.marker([result['coord_X'],result['coord_Y']], {icon: objet}).on('dblclick', fonction)
     Objet.bindPopup(text+"<br><i>Double-cliquez pour utiliser l'objet.</i>");
     
     markers[result['nom']]=Objet;
    
     //On vérifie qu'on est au bon niveau de zoom pour afficher l'objet
     Zoom_actuel=mymap.getZoom()
     if (Zoom_actuel>=result['zoom']){
       mymap.addLayer(Objet)
     }

     //On crée une fonction pour afficher le marqueur ou non en fonction du niveau de zoom
     mymap.on('zoom',function(){
      Zoom_actuel=mymap.getZoom()
      if (Zoom_actuel>=result['zoom']){
        mymap.addLayer(Objet)
      } else mymap.removeLayer(Objet)
  
    })
  })

}

//Affichage de la Goldie
Recup_Objet(1,"<b>La Goldie est coincée ici !</b><br>Retrouvez ses clefs\
 pour pouvoir rentrer à Paris !<br>Pour cela, commencez par vous rendre sur\
  la place Saint-Louis devant le sapin de Noël.<br> Mais avant, double-cliquez sur la voiture\
   pour vérifier que les clefs ne sont pas dedans.",Click_Goldie);

//Affichage de la poste
Recup_Objet(13,"Vous entrez dans la poste :<br>Vous n'avez pas de courrier <b>pour l'instant</b>");

//Affichage du commissariat
Recup_Objet(11,"En arrivant au commissariat, un officier semble vous reconnaitre :<br>\
- "+pseudo+", nous avons quelque chose qui vous appartient !\
<br> En vous retournant vers lui, vous découvrez l'officier qui tient dans sa main vos clefs de voiture !\
<br> Vous auriez dû venir dès le début, c'est ici que l'on ramène les objets trouvés...<br>\
<button class='bouton' id='bouton_Comi' type='button' onclick='Click_Comissariat();' onclick>Récupérer les clefs</button> ",Click_Comissariat)
timer()

//Fonction appelée si on double-clique sur la Goldie
function Click_Goldie(e){

  //On récupère les coordonnées
  Co=this.getLatLng()

  //On crée un nouveau popup
  var popup = L.popup({offset : [0,-20]})
    .setLatLng(Co)
    .setContent("Malheureusement elles n'y sont pas... Vous partez donc vers le sud pour commencer vos recherches !\
     <br> En passant vous croisez une poste, elle pourrait être utile si vous attendez du <b>courrier</b>")
    .openOn(mymap);

    //On supprime le popup si le niveau de zoom change
    mymap.on('zoom',function(){
      mymap.removeLayer(popup)
    })

  //Affichage du sapin
  Recup_Objet(3,"Vous arrivez devant le sapin. Cependant, une foule vous en bloque l'accès.\
  <br>Vous essayez de déterminer le but de cette manifestation.<br>Vous entendez que le gros\
   des troupes se trouve sur <b>la Promenade de l'Esplanade.</b>",Click_Sapin);

  //Affichage de la fontaine
  Recup_Objet(4,"Vous arrivez devant la Fontaine de l'Esplanade, et vous voyez un groupe de manifestants avec des pancartes.\
  <br>Vous trouverez sûrement l'information que vous cherchez sur celles-ci !\
  <br> <img src=icons/Non_aux_SDF.jpg /img><br>\
  Au passage, vous trouvez l'endroit très joli. Vous pouvez prendre un selfie pour ramener un souvenir !",Click_Fontaine);
}

//Fonction appelée si on double-clique sur le sapin
function Click_Sapin(e){

  //On récupère les coordonnées
  Co=this.getLatLng()

  //On crée un formulaire de réponse
  var Formulaire = '<form id="popup-form">\
  <label for="input">Cause de la manifestation :</label>\
  <input id="Cause" class="popup-input" type="text" maxlength="3" />\
  <p id=resultat></p>\
  <button class="bouton" id="button-submit" type="button">Valider</button>\
  </form>';

  //On ajoute un popup
  var popup = L.popup({offset : [0,-20]})
    .setLatLng(Co)
    .setContent(Formulaire) //On met le formulaire dans le popup
    .openOn(mymap);

  //On supprime le popup si le niveau de zoom change
  mymap.on('zoom',function(){
    mymap.removeLayer(popup)
  })

    //On récupère les objets html à modifier
    var input = L.DomUtil.get('Cause');
    var resultat=L.DomUtil.get('resultat');

    L.DomEvent.addListener(input, 'change', function (e) {   //On détecte un changement de valeur dans le formulaire
      if (input.value=='SDF'){      //Si le code est bon
        //On affiche la suite dans le popup
        resultat.innerHTML="Vous avez bien réussi à déterminer la cause de cette foule.\
         Vous sympathisez avec certaines personnes qui vous laissent un passage pour accéder au sapin. <br>\
         En arrivant devant le sapin, un jeune homme arrive vers vous tout essouflé et vous dit :<br>\
         - Bonjour "+pseudo+", vous êtes convoqué.e par le Roi pour une audience immédiate, c'est urgent !<br>\
         <br> <b>Vous décidez donc de vous rendre au Palais du Gouverneur, au sud de l'Esplanade.<b> "

         //Et on place l'objet suivant sur la carte
         Recup_Objet(5,"Vous arrivez au Palais du Gouverneur. Les portes y sont ouvertes et on vous laisse entrer.\
         L'intérieur est richement décoré, d'un style un peu ancien mais qui sied bien à une demeure de Roi. Vous ne comptez pas le nombre de\
         tapisseries qui pendent sur les murs.<br> Vous avez le temps de faire toutes ces constatations car on vous fait patienter \
         de longues minutes avant d'enfin vous accorder l'accès à <b>la salle d'audience.</b> :",Click_Roi);

      } else { 
        resultat.innerHTML='Perdu...'  //On affiche que c'est perdu
      }
    });
  
}

//Fonction appelée si on double-clique sur la fontaine
function Click_Fontaine(e){

  var Portraits=['Mario.png','Luigi.png','Peach.png','Daisy.png','Yoshi.png','Birdo.png'];
  
  //On récupère les coordonnées
  Co=this.getLatLng()

  //On crée un popup
  var popup = L.popup({offset : [0,-20]})
    .setLatLng(Co)
    .setContent('<button class="bouton" id=bouton type="button">Prendre un selfie</button> ')
    .openOn(mymap);

    //On le supprime si le zoom change
    mymap.on('zoom',function(){
      mymap.removeLayer(popup)
    })

    var Bouton = L.DomUtil.get('bouton');
    L.DomEvent.addListener(bouton, 'click', function (e) {  //Si on clique sur le bouton

      var indice=Math.floor(Math.random() * Math.floor(6))

      //On récupère l'objet html
      var x = document.getElementById("portrait"); 
      
      //Et on change sa source pour modifier l'image 
      x.setAttribute("src", "icons/Selfies/"+Portraits[indice] );
      portrait=Portraits[indice];
    })
}

//Fonction appelée si on double-clique sur le roi
function Click_Roi(e){

  //On récupère les coordonnées
  Co=this.getLatLng()

  //On crée la variable video
  var video='<video id=Roi src="video/roi.mp4" width=320  height=240 controls poster="video/Gouverneur.png"></video>'

  //On crée un popup
  var popup = L.popup({offset : [0,-20]})
    .setLatLng(Co)
    .setContent(video)
    .openOn(mymap);

    //On le supprime si le niveau de zoom change
    mymap.on('zoom',function(){
      mymap.removeLayer(popup)
    })

    //On récupère l'objet html
    var media = document.getElementById('Roi');


    media.addEventListener('ended',function(){    //A la fin de la vidéo
      //On modifie le popup de la poste
      markers['poste'].bindPopup('En arrivant à la poste, vous vous présentez au guichet pour récupérer votre lettre.\
        <br> <button class="bouton" id="bouton" type="button" onclick="Click_Poste();" onclick>Récupérer la lettre</button>');
      //On ajoute la possibilité de double-cliquer sur la poste
      markers['poste'].on('dblclick', Click_Poste);
     
      //On place le tribunal sur la carte
      Recup_Objet(6,"Vous arrivez au tribunal, un peu stressé.e. <br> Un homme vous accueille et vous vous présentez :<br>\
      - Bonjour, je m'appelle "+pseudo+", je suis convoqué.e au tribunal.<br> La personne acquiesce et vous demande la missive\
      du Roi qui prouve la convocation.",Click_Tribunal)
    })
   
}

//Fonction appelée si on double-clique sur la poste
function Click_Poste(e){
  //On place la missive sur la carte
  Recup_Objet(12,"Vous pouvez à présent récuperer la missive du Roi pour vous rendre au Palais de Justice proche de l'Esplanade.",Click_Missive);
}

//Fonction appelée si on double-clique sur la missive
function Click_Missive(e){
  var missive=this;

  //On supprime la missive
  mymap.removeLayer(missive)

  //Si le zoom change, la missive disparaît
  mymap.on('zoom',function(){
    mymap.removeLayer(missive)
  })

  //On note que la missive a été récupérée
  Objets_recup.push(12)

  //On affiche la missive à côté de la carte
  var Recup=document.getElementById('objets_recup')
  Recup.innerHTML= "<img id='missive' class='Objet' src=icons/Missive.png></img>"
}

//Fonction appelée si on double-clique sur le tribunal
function Click_Tribunal(e){
  var text;
  var ind_cle;
  var cle=false
  for(i=0; i<Objets_recup.length; i++){ //On parcourt la liste des objets récupérés
    if(Objets_recup[i]==12){            //Si on y trouve la missive
      cle=true                          //On note qu'on a bien la clef
      ind_cle=i;
    }
  }

  if(!cle){ //Si on n'a pas la clef
    text="Vous n'avez pas récupéré la lettre du Roi, vous ne pouvez pas entrer."

    //On récupère les coordonnées
    Co=this.getLatLng()
    //On crée un popup
    var popup = L.popup({offset : [0,-20]})
      .setLatLng(Co)
      .setContent("Vous n'avez pas récupéré la lettre du Roi, vous ne pouvez pas entrer.")
      .openOn(mymap);

      //On le supprime si le zoom change
      mymap.on('zoom',function(){
        mymap.removeLayer(popup)
      })

  } else { //Si on a la clef
    //On supprime l'image de la missive à côté de la carte
    var Recup=document.getElementById('objets_recup')
    Recup.innerHTML= ""

    //On crée le texte du popup
    text="Vous entrez dans la salle d'audience. Le jugement est bref : <b> vous êtes coupable !</b><br> \
    Heureusement, le juge est d'humeur clémente. Il vous propose de vous acquitter si vous répondez à l'énigme suivante. <br>\
    Vous entrez dans une chambre et vous voyez sur le lit 2 chiens, 4 chats, 1 girafe et 5 vaches.\
    Il y a aussi 3 poules qui volent au-dessus de la chaise.\
    Combien y a-t-il de pieds au sol ?"

    //On met un formulaire en plus du texte
    var In_popup='<p>'+text+'</p>\
    <form id="reponse">\
    <label for="input">Nombres de pieds:</label>\
    <input id="champ" class="popup-input" type="text" maxlength="2" />\
    <p id=resultat></p>\
    <button class="bouton" id="Valider" type="button">Valider</button>\
    </form>'

    //On récupère les coordonnées
    Co=this.getLatLng()
    //On crée un popup
    var popup = L.popup({offset : [0,-20]})
      .setLatLng(Co)
      .setContent(In_popup)
      .openOn(mymap);

      //On le supprime si le zoom change
      mymap.on('zoom',function(){
        mymap.removeLayer(popup)
      })

    var reponse=L.DomUtil.get('champ');
    var resultat=L.DomUtil.get('resultat');

    
    L.DomEvent.addListener(reponse, 'change', function (e) {   //Quand la valeur du formulaire change

        if(reponse.value=='10'){   //Si c'est la bonne réponse
          //On ajoute un paragraphe pour indiquer la suite
          resultat.innerHTML="Bravo, vous avez été acquitté.e par ce bon juge ! En partant, il vous conseille même d'abandonner la voiture\
          et de rentrer à Paris, soit en bateau, soit en train.<br> Vous décidez de suivre son conseil. <br><b>Rendez-vous\
          au port ou à la gare.</b>"

          //On place la gare sur la carte
          Recup_Objet(7,"En arrivant à la gare, vous voyez qu'un train part immédiatemment en direction de Paris.\
          Vous décidez de le prendre.",Click_Gare);

          //On place le bateau sur la carte
          Recup_Objet(8,"En arrivant au port, vous voyez qu'un bateau part immédiatemment en direction de Paris.\
          Vous décidez de le prendre.",Click_Port);

        }else{   
          //On indique que c'est raté
          resultat.innerHTML='Raté...'
        }
    })
  }
}

//Fonction appelée si on double-clique sur la gare
function Click_Gare(e){
  //On crée la liste des coordonnées prises par le train
  var deplacement=[[49.1086,6.1767],[49.1096,6.1785],[49.1116,6.1824],[49.1130,6.1847],[49.1144,6.1863],[49.1158,6.1873],
  [49.1174,6.1875],[49.1194,6.1873],[49.1210,6.1873],[49.1229,6.1869],[49.1252,6.1865],
  [49.1266,6.1861]];

  //On récupère le marqueur et on ferme son popup
  var train=this;
  train.closePopup();
  

  for(co in deplacement){  //On parcourt la liste des coordonnées
    //On déplace le marqueur aux coordonnées en ajoutant un délai de plus en plus long
    Bouger_marker(train,deplacement[co],co*500)

  }
  setTimeout(function(){ //A la fin du déplacement
    //On change le popup du train pour indiquer la suite
    train.bindPopup("En passant au-dessus de la Moselle, le train déraille et tombe dans la rivière ! L'accident est\
    terrible. Vous arrivez difficilement à sortir du train et à nager jusqu'a la berge. <br> Sous le choc, votre téléphone\
    ayant pris l'eau, vous décidez de vous rendre au commissariat <b>de la Place de la Comedie sur l'île du Petit Saulcy</b>\
      pour prévenir les autorités.\
    <br> Dépêchez-vous, les heures de pauvres gens sont comptées !").openPopup()

    //On appelle la fonction commissariat
    Commissariat();
    
  }, 6000)
}

//Fonction appelée si on double-clique sur le port
function Click_Port(e){
  //On crée la liste des coordonnées prises par le bateau
  var deplacement=[[49.1168,6.1665],[49.1171,6.1668],[49.1173,6.1673],[49.1176,6.1679],
  [49.1178,6.1683],[49.1181,6.1688],[49.1185,6.1692],[49.1192,6.1700],[49.1199,6.1713],
  [49.1204,6.1726],[49.1211,6.1738],[49.1219,6.1758],[49.1225,6.1772],[49.1232,6.1782],
  [49.1236,6.1792],[49.1243,6.1806],[49.1247,6.1812],[49.1252,6.1826],[49.1257,6.1839],
  [49.1261,6.1850],[49.1265,6.1860]];

  //On récupère le marqueur et on ferme son popup
  var bateau=this;
  bateau.closePopup()

  for(co in deplacement){   //On parcourt la liste des coordonnées
    //On déplace le marqueur aux coordonnées en ajoutant un délai de plus en plus long
    Bouger_marker(bateau,deplacement[co],co*500)
  }
  setTimeout(function(){   //A la fin du déplacement
    //On change le popup du bateau pour indiquer la suite
    bateau.bindPopup("Quand vous passez sous la voie ferrée, un train déraille et tombe dans la rivière ! L'accident est\
    terrible. Le bateau s'arrête sur la berge pour aider les rescapés ! <br> Ne sachant pas nager et n'ayant pas de téléphone, vous décidez \
    de vous rendre au commissariat <b>de la Place de la Comédie sur l'île du Petit Saulcy</b> pour prévenir les autorités. <br> Dépêchez-vous, \
    les heures de pauvres gens sont comptées !").openPopup()

    //On appelle la fonction commissariat
    Commissariat();
    
  }, 11000)
}

//Fonction appelée pour modifier le texte du commissariat si on a prit le bateau ou le train
function Commissariat() {
markers['Commissariat'].bindPopup("Vous arrivez au commissariat tout.e essouflé.e ! Vous avez été trop lent.e, les autorités ont déjà été prévenues !\
<br> Vous allez repartir quand un officier vous interpelle :<br>\
- "+pseudo+", nous avons quelque chose qui vous appartient !\
<br> En vous retournant, vous découvrez l'officier qui tient dans sa main vos clefs de voiture !\
<br> Vous auriez dû venir dès le début, c'est ici que l'on ramène les objets trouvés...\
<button class='bouton' id='bouton_Comi' type='button' onclick='Click_Comissariat();' onclick>Récupérer les clefs</button> ")
}

//Fonction appelée si on double-clique sur le commissariat
function Click_Comissariat(e){
  //On place la clef sur la carte
  Recup_Objet(2,"Bravo, vous avez retrouvé vos clefs, vous pouvez retourner à la voiture et rentrer à Paris !\
  <br><button class='bouton' id='bouton_clefs' type='button' onclick='Click_Clefs();' onclick>Rentrer à la voiture</button>",Click_Clefs)
}

//Fonction appelée si on double-clique sur les clefs
function Click_Clefs(e){

  //On récupère le temps et on arrête le timer
  var time_fin=document.getElementById('timer').innerHTML
  clearInterval(intervalId)

  //On enregistre le joueur avec son nom, son selfie et son temps
  var data={nom: pseudo, temps:time_fin, picture:portrait};
  console.log(data['nom'])
    fetch('Enregistrer_joueur.php', {
        method: 'post',
        body:  JSON.stringify(data)
      })
      .then(r => r.json())
      .then(r => {
        console.log(r)
      })
  
  //On enregistre dans le stockage que le jeu a été terminé
  var storage=window.localStorage;
  storage.setItem(0, true);
  storage.setItem(1, time_fin);
  
 //On crée la liste des coordonnées prises par la Goldie
 var deplacement=[[49.1200,6.1840,12],[49.1319,6.1682],[49.1504,6.1843],
  [49.1789,6.1768],[49.2006,6.1750],[49.2001,6.1159,8],[49.1866,5.9827],
  [49.1790,5.7746],[49.1215,5.5879],[49.1125,5.4121],[49.0927,5.0056],
  [49.0297,4.4783],[49.1484,4.1871],[49.2167,3.9427],[49.1664,3.7257],
  [49.0873,3.3934],[49.0153,3.1544],[48.8638,2.8578],[48.8294,2.6106],
  [48.8356,2.5826,17],[48.8377,2.5823],[48.8380,2.5835],[48.8379,2.5855],[48.8401,2.5861],[48.8408,2.5860]];

  //On récupère le marqueur de la voiture
  var Voiture=markers['Goldie'];


  for(co in deplacement){ //On parcourt la liste des coordonnées
    //On déplace le marqueur aux coordonnées en ajoutant un délai de plus en plus long
    Bouger_marker(Voiture,deplacement[co],co*750);
  }
  setTimeout(function(){  //A la fin du déplacement
    //On change le popup de la voiture pour indiquer la suite
    Voiture.bindPopup('Vous êtes enfin rentré.e à Champs sur Marne, quel soulagement <br>\
    <button class="bouton" id="bouton" type="button" onclick="fin();" onclick>fin !</button>').openPopup();
  }, 17250)

}

//On retourne à la page d'accueil
function fin(){
  self.location.href="index.html";
}

//Au bout d'un certain temps, on déplace un marqueur à des coordonnées données
function Bouger_marker(obj,coords,delay){
  setTimeout(function(){
    if(coords.length==3){mymap.setZoom(coords[2]);}  //Si on a l'info, on change de zoom
    mymap.setView([coords[0],coords[1]]);  //On change la vue sur les nouvelles coordonnées
    obj.setLatLng({lat: coords[0], lng: coords[1]}); //On déplace le marqueur aux nouvelles coordonnées
  }, delay)
}

//On calcule le temps qui s'écoule dans la partie
function timer(){
  time=document.getElementById('timer')
  let dec = 0;  //dixièmes de seconde
  let sec = 0;  //secondes
  let min = 0;  //minutes
  intervalId = setInterval(function(){ //On met à jour toutes les 100ms
      dec += 1;
      if(dec >= 10){dec = 00; sec += 1;}
      if(sec >= 60){sec = 00; min += 1;}
      if(min >= 60){min = 00; heu += 1;}

      //On affiche le timer
      if(min<10){
        if(sec<10){
          if(dec<10){
            time.innerHTML ='0'+ min + ':0' + sec + ':0' + dec;

          } else{
            time.innerHTML ='0'+ min + ':0' + sec + ':' + dec;
          }
        } else{
          if(dec<10){
            time.innerHTML ='0'+ min + ':' + sec + ':0' + dec;
          }else{
            time.innerHTML ='0'+ min + ':' + sec + ':' + dec;
          }
        }
      }else{
       if(sec<10){
          if(dec<10){
            time.innerHTML = min + ':0' + sec + ':0' + dec;
          } else{
            time.innerHTML = min + ':0' + sec + ':' + dec;
          }
        } else{
          if(dec<10){
            time.innerHTML = min + ':' + sec + ':0' + dec;
          }else{
            time.innerHTML = min + ':' + sec + ':' + dec;
          }
        }
      }
  }, 100)
}

//On arrête le timer
function stopTimer(){
  clearInterval(intervalId);
}
