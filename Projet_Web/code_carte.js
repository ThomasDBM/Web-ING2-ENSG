
//on crée la variable de la carte
let mymap = L.map('mapid').setView([49.1177, 6.17899], 19);  


//on ajoute les tuiles sur la carte
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

//definition des variables globales
var Objets_recup= new Array();
var pseudo=self.location.href.split('=')[1];
var portrait='No_picture.png';
var markers={};

//on affiche le pseudo du joueur
var Affiche_nom=document.getElementById('Nom');
Affiche_nom.innerHTML=pseudo;

//fonction pour récupérer un objet et l'afficher sur la carte
function Recup_Objet(id,text,fonction){

  //on interroge la BDD
  fetch('BDD.php?Valeur='+id).then(function (result) {
    return result.json();

  }) .then(function (result) {    //on affiche un marker avec les information de la BDD

    var objet = L.icon({
      iconUrl: "icons/"+result['icon'],
      iconSize:     [50, 50], 
      iconAnchor:   [30,50], 
      popupAnchor:  [-3, -76] 
    });
  
     var Objet = L.marker([result['coord_X'],result['coord_Y']], {icon: objet}).on('dblclick', fonction)
     Objet.bindPopup(text+"<br><i>Double-cliquez pour utiliser l'objet.</i>");
     
     markers[result['nom']]=Objet;
    
     //on vérifie qu'on est au bon zoom pour afficher
     Zoom_actuel=mymap.getZoom()
     if (Zoom_actuel>=result['zoom']){
       mymap.addLayer(Objet)
     }

     //on créé une fonction pour afficher le marker ou non en fonction du zoom
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

//affichage de la poste
Recup_Objet(13,"Vous entrez dans la poste :<br>Vous n'avez pas de courrier <b>pour l'instant</b>");

//affichage du commissariat
Recup_Objet(11,"En arrivant au commissariat, un officier semble vous reconnaitre :<br>\
- "+pseudo+", nous avons quelque chose qui vous appartient !\
<br> En vous retournant vers lui, vous découvrez l'officier qui tient dans sa main vos clefs de voiture !\
<br> Vous auriez dû venir dès le début, c'est ici que l'on ramène les objets trouvés...<br>\
<button class='bouton' id='bouton_Comi' type='button' onclick='Click_Comissariat();' onclick>Récupérer les clefs</button> ",Click_Comissariat)
timer()

//fonction appellée si on doubleclick sur la Goldie
function Click_Goldie(e){

  //on recupère les coordonnées
  Co=this.getLatLng()

  //on créé un nouveau popup
  var popup = L.popup({offset : [0,-20]})
    .setLatLng(Co)
    .setContent("Malheureusement elles n'y sont pas... Vous partez donc vers le sud pour commencer vos recherches !\
     <br> En passant vous croisez une poste, elle pourrait être utile si vous attendez du <b>courrier</b>")
    .openOn(mymap);

    //on supprime le popup si le zoom change
    mymap.on('zoom',function(){
      mymap.removeLayer(popup)
    })

  //Affichage du Sapin
  Recup_Objet(3,"Vous arrivez devant le sapin. Cependant, une foule vous en bloque l'accès.\
  <br>Vous essayez de déterminer le but de cette manifestation.<br>Vous entendez que le gros\
   des troupes se trouve sur <b>la Promenade de l'Esplanade.</b>",Click_Sapin);

  //Affichage de la Fontaine
  Recup_Objet(4,"Vous arrivez devant la Fontaine de l'Esplanade, et vous voyez un groupe de manifestants avec des pancartes.\
  <br>Vous trouverez sûrement l'information que vous cherchez sur celles-ci !\
  <br> <img src=icons/Non_aux_SDF.jpg /img><br>\
  Au passage, vous trouvez l'endroit très joli. Vous pouvez prendre un selfie pour ramener un souvenir !",Click_Fontaine);
}

//fonction appellée si on doubleclick sur le Sapin
function Click_Sapin(e){

  //on recupère les coordonnées
  Co=this.getLatLng()

  //on créé un formulaire de réponse
  var Formulaire = '<form id="popup-form">\
  <label for="input">Cause de la manifestation :</label>\
  <input id="Cause" class="popup-input" type="text" maxlength="3" />\
  <p id=resultat></p>\
  <button class="bouton" id="button-submit" type="button">Valider</button>\
  </form>';

  //on ajoute un popup
  var popup = L.popup({offset : [0,-20]})
    .setLatLng(Co)
    .setContent(Formulaire) //on met le formulaire dans le popup
    .openOn(mymap);

  //on supprime le popup si le zoom change
  mymap.on('zoom',function(){
    mymap.removeLayer(popup)
  })

    //on récupère les objets html a modifier
    var input = L.DomUtil.get('Cause');
    var resultat=L.DomUtil.get('resultat');

    L.DomEvent.addListener(input, 'change', function (e) {   //on detecte un changement de valeur dans le formulaire
      if (input.value=='SDF'){      //si le code est bon
        //on affiche la suite dans le popup
        resultat.innerHTML="Vous avez bien réussi à déterminer la cause de cette foule.\
         Vous sympathisez avec certaines personnes qui vous laissent un passage pour accéder au sapin. <br>\
         En arrivant devant le sapin, un jeune homme arrive vers vous tout essouflé et vous dit :<br>\
         - Bonjour "+pseudo+", vous êtes convoqué.e par le Roi pour une audience immédiate, c'est urgent !<br>\
         <br> <b>Vous décidez donc de vous rendre au Palais du Gouverneur, au sud de l'Esplanade.<b> "

         //et on place l'objet suivant sur la carte
         Recup_Objet(5,"Vous arrivez au Palais du Gouverneur. Les portes y sont ouvertes et on vous laisse entrer.\
         L'intérieur est richement décoré, d'un style un peu ancien mais qui sied bien à une demeure de Roi. Vous ne comptez pas le nombre de\
         tapisseries qui pendent sur les murs.<br> Vous avez le temps de faire toutes ces constatations car on vous fait patienter \
         de longues minutes avant d'enfin vous accorder l'accès à <b>la salle d'audience.</b> :",Click_Roi);

      } else { //sinon
        resultat.innerHTML='Perdu...'  //on affiche que c'est perdu
      }
    });
  
}

//fonction appellée si on doubleclick sur la fontaine
function Click_Fontaine(e){

  var Portraits=['Mario.png','Luigi.png','Peach.png','Daisy.png','Yoshi.png','Birdo.png'];
  
  //on récupère les coordonnées
  Co=this.getLatLng()

  //on créé un popup
  var popup = L.popup({offset : [0,-20]})
    .setLatLng(Co)
    .setContent('<button class="bouton" id=bouton type="button">Prendre un selfie</button> ')
    .openOn(mymap);

    //on le supprime si le zoom change
    mymap.on('zoom',function(){
      mymap.removeLayer(popup)
    })

    var Bouton = L.DomUtil.get('bouton');
    L.DomEvent.addListener(bouton, 'click', function (e) {  //si on click sur le boutton

      var indice=Math.floor(Math.random() * Math.floor(6))

      //on recupère l'objet html
      var x = document.getElementById("portrait"); 
      
      //et on change sa source pour modifier l'image 
      x.setAttribute("src", "icons/Selfies/"+Portraits[indice] );
      portrait=Portraits[indice];
    })
}

//fonction appellée si on doubleclick sur le roi
function Click_Roi(e){

  //on recupère les coordonnées
  Co=this.getLatLng()

  //on créé la variable video
  var video='<video id=Roi src="video/roi.mp4" width=320  height=240 controls poster="video/Gouverneur.png"></video>'

  //on créé un popup
  var popup = L.popup({offset : [0,-20]})
    .setLatLng(Co)
    .setContent(video)
    .openOn(mymap);

    //on le supprime si le zoom change
    mymap.on('zoom',function(){
      mymap.removeLayer(popup)
    })

    //on récupère l'objet html
    var media = document.getElementById('Roi');


    media.addEventListener('ended',function(){    //a la fin de la video
      //on modifie le popup de la poste
      markers['poste'].bindPopup('En arrivant à la poste, vous vous présentez au guichet pour récupérer votre lettre.\
        <br> <button class="bouton" id="bouton" type="button" onclick="Click_Poste();" onclick>Récupérer la lettre</button>');
      //on ajoute la possibilité de doubleclicker sur la poste
      markers['poste'].on('dblclick', Click_Poste);
     
      //on place le tribunal sur la carte
      Recup_Objet(6,"Vous arrivez au tribunal, un peu stressé.e. <br> Un homme vous accueille et vous vous présentez :<br>\
      - Bonjour, je m'appelle "+pseudo+", je suis convoqué.e au tribunal.<br> La personne acquiesce et vous demande la missive\
      du Roi qui prouve la convocation.",Click_Tribunal)
    })
   
}

//fonction appellée si on doubleclick sur la poste
function Click_Poste(e){
  //on place la missive sur la carte
  Recup_Objet(12,"Vous pouvez à présent récuperer la missive du Roi pour vous rendre au Palis de justice proche de l'esplanade.",Click_Missive);
}

//fonction appellée si on doubleclick sur la Missive
function Click_Missive(e){
  var missive=this;

  //on supprime la missive
  mymap.removeLayer(missive)

  //si le zoom change, on re-supprimme la missive
  mymap.on('zoom',function(){
    mymap.removeLayer(missive)
  })

  //on note que la missive a été récupérée
  Objets_recup.push(12)

  //on affiche la missive a coté de la carte
  var Recup=document.getElementById('objets_recup')
  Recup.innerHTML= "<img id='missive' class='Objet' src=icons/Missive.png></img>"
}

//fonction appellée si on doubleclick sur le tribunal
function Click_Tribunal(e){
  var text;
  var ind_cle;
  var cle=false
  for(i=0; i<Objets_recup.length; i++){ //on parcous la liste es objets récupérés
    if(Objets_recup[i]==12){           //si on y trouve la missive
      cle=true                        //on note que on a bien la clef
      ind_cle=i;
    }
  }

  if(!cle){ //si on a pas la clefs
    text="Vous n'avez pas récupéré la lettre du Roi, vous ne pouvez pas entrer."

    //on recupère les coordonnées
    Co=this.getLatLng()
    //on créé un popup
    var popup = L.popup({offset : [0,-20]})
      .setLatLng(Co)
      .setContent("Vous n'avez pas récupéré la lettre du Roi, vous ne pouvez pas entrer.")
      .openOn(mymap);

      //on le supprime si le zoom change
      mymap.on('zoom',function(){
        mymap.removeLayer(popup)
      })

  } else { //si on a la clef
    //on supprime l'image de la missive a coté de la carte
    var Recup=document.getElementById('objets_recup')
    Recup.innerHTML= ""

    //on créé le texte du popup
    text="Vous entrez dans la salle d'audience. Le jugement est bref : <b> vous êtes coupable !</b><br> \
    Heureusement, le juge est d'humeur clémente. Il vous propose de vous acquitter si vous répondez à l'énigme suivante. <br>\
    Vous entrez dans une chambre et vous voyez sur le lit 2 chiens, 4 chats, 1 girafe et 5 vaches.\
    Il y a aussi 3 poules qui volent au-dessus de la chaise.\
    Combien y a-t-il de pieds au sol ?"

    //on met un formulaire en plus de text
    var In_popup='<p>'+text+'</p>\
    <form id="reponse">\
    <label for="input">Nombres de pieds:</label>\
    <input id="champ" class="popup-input" type="text" maxlength="2" />\
    <p id=resultat></p>\
    <button class="bouton" id="Valider" type="button">Valider</button>\
    </form>'

    //on récupère le coordonnées
    Co=this.getLatLng()
    //on créé un popup
    var popup = L.popup({offset : [0,-20]})
      .setLatLng(Co)
      .setContent(In_popup)
      .openOn(mymap);

      //on le supprime si le zoom change
      mymap.on('zoom',function(){
        mymap.removeLayer(popup)
      })

    var reponse=L.DomUtil.get('champ');
    var resultat=L.DomUtil.get('resultat');

    
    L.DomEvent.addListener(reponse, 'change', function (e) {   //Quand la valeur du formulaire change

        if(reponse.value=='10'){   //si c'est la bonne réponse
          //on ajoute un paragraphe pour indiquer la suite
          resultat.innerHTML="Bravo, vous avez été acquitté.e par ce bon juge ! En partant, il vous conseille même d'abandonner la voiture\
          et de rentrer à Paris, soit en bateau, soit en train.<br> Vous décidez de suivre son conseil. <br><b>Rendez-vous\
          au port ou à la gare.</b>"

          //on place la gare sur la carte
          Recup_Objet(7,"En arrivant à la gare, vous voyez qu'un train part immédiatemment en direction de Paris.\
          Vous décidez de le prendre.",Click_Gare);

          //on place le bateau sur la carte
          Recup_Objet(8,"En arrivant au port, vous voyez qu'un bateau part immédiatemment en direction de Paris.\
          Vous décidez de le prendre.",Click_Port);

        }else{   //sinon
          //on indique que c'est raré
          resultat.innerHTML='Raté...'
        }
    })
  }
}

//fonction appellée si on doubleclick sur la Gare
function Click_Gare(e){
  //on créé la liste des coordonnées prise par le train
  var deplacement=[[49.1086,6.1767],[49.1096,6.1785],[49.1116,6.1824],[49.1130,6.1847],[49.1144,6.1863],[49.1158,6.1873],
  [49.1174,6.1875],[49.1194,6.1873],[49.1210,6.1873],[49.1229,6.1869],[49.1252,6.1865],
  [49.1266,6.1861]];

  //on récupère le marker et on ferme son popup
  var train=this;
  train.closePopup();
  

  for(co in deplacement){  //on parcours la liste des coordonnées
    //on déplace le marker aux coordonnés en ajoutant un délais de plus en plus long
    Bouger_marker(train,deplacement[co],co*500)

  }
  setTimeout(function(){ //a la fin du déplacement
    //on change le popup du train pour indiquer la suite
    train.bindPopup("En passant au-dessus de la Moselle, le train déraille et tombe dans la rivière ! L'accident est\
    terrible. Vous arrivez difficilement à sortir du train et à nager jusqu'a la berge. <br> Sous le choc, votre téléphone\
    ayant pris l'eau, vous décidez de vous rendre au commissariat <b>de la Place de la Comedie sur l'île du Petit Saulcy</b>\
      pour prévenir les autorités.\
    <br> Dépêchez-vous, les heures de pauvres gens sont comptées !").openPopup()

    //on appelle la fonction commisariat
    Commissariat();
    
  }, 6000)
}

//fonction appellée si on doubleclick sur le Port
function Click_Port(e){
  //on créé la liste des coordonnées prise par le bateau
  var deplacement=[[49.1168,6.1665],[49.1171,6.1668],[49.1173,6.1673],[49.1176,6.1679],
  [49.1178,6.1683],[49.1181,6.1688],[49.1185,6.1692],[49.1192,6.1700],[49.1199,6.1713],
  [49.1204,6.1726],[49.1211,6.1738],[49.1219,6.1758],[49.1225,6.1772],[49.1232,6.1782],
  [49.1236,6.1792],[49.1243,6.1806],[49.1247,6.1812],[49.1252,6.1826],[49.1257,6.1839],
  [49.1261,6.1850],[49.1265,6.1860]];

  //on récupère le marker et on ferme son popup
  var bateau=this;
  bateau.closePopup()

  for(co in deplacement){   //on parcours la liste des coordonnées
    //on déplace le marker aux coordonnés en ajoutant un délais de plus en plus long
    Bouger_marker(bateau,deplacement[co],co*500)
  }
  setTimeout(function(){   //a la fin du déplacement
    //on change le popup du bateau pour indiquer la suite
    bateau.bindPopup("Quand vous passez sous la voie ferrée, un train déraille et tombe dans la rivière ! L'accident est\
    terrible. Le bateau s'arrête sur la berge pour aider les rescapés ! <br> Ne sachant pas nager et n'ayant pas de téléphone, vous décidez \
    de vous rendre au commissariat <b>de la Place de la Comédie sur l'île du Petit Saulcy</b> pour prévenir les autorités. <br> Dépêchez-vous, \
    les heures de pauvres gens sont comptées !").openPopup()

    //on appelle la fonction commisariat
    Commissariat();
    
  }, 11000)
}

//fonction appellée pour modifier le texte du commissariat si on a prit le bateau ou le train
function Commissariat() {
markers['Commissariat'].bindPopup("Vous arrivez au commissariat tout.e essouflé.e ! Vous avez été trop lent.e, les autorités ont déjà été prévenues !\
<br> Vous allez repartir quand un officier vous interpelle :<br>\
- "+pseudo+", nous avons quelque chose qui vous appartient !\
<br> En vous retournant, vous découvrez l'officier qui tient dans sa main vos clefs de voiture !\
<br> Vous auriez dû venir dès le début, c'est ici que l'on ramène les objets trouvés...\
<button class='bouton' id='bouton_Comi' type='button' onclick='Click_Comissariat();' onclick>Récupérer les clefs</button> ")
}

//fonction appellée si on doubleclick sur le commissariat
function Click_Comissariat(e){
  //on place la clef sur la carte
  Recup_Objet(2,"Bravo, vous avez retrouvé vos clefs, vous pouvez retourner à la voiture et rentrer à Paris !\
  <br><button class='bouton' id='bouton_clefs' type='button' onclick='Click_Clefs();' onclick>Rentrer à la voiture</button>",Click_Clefs)
}

//fonction appellée si on doubleclick sur les clefs
function Click_Clefs(e){

  //on récupère le temps et on arrète le timer
  var time_fin=document.getElementById('timer').innerHTML
  clearInterval(intervalId)

  //on enregistre le joueur avec son nom son selfie et son temps
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
  
  //on enregistre dans le stockage que le jeu a été terminé
  var storage=window.localStorage;
  storage.setItem(0, true);
  storage.setItem(1, time_fin);
  
 //on créé la liste des coordonnées prise par la Goldie
 var deplacement=[[49.1200,6.1840,12],[49.1319,6.1682],[49.1504,6.1843],
  [49.1789,6.1768],[49.2006,6.1750],[49.2001,6.1159,8],[49.1866,5.9827],
  [49.1790,5.7746],[49.1215,5.5879],[49.1125,5.4121],[49.0927,5.0056],
  [49.0297,4.4783],[49.1484,4.1871],[49.2167,3.9427],[49.1664,3.7257],
  [49.0873,3.3934],[49.0153,3.1544],[48.8638,2.8578],[48.8294,2.6106],
  [48.8356,2.5826,17],[48.8377,2.5823],[48.8380,2.5835],[48.8379,2.5855],[48.8401,2.5861],[48.8408,2.5860]];

  //on récupère le marker de la voiture
  var Voiture=markers['Goldie'];


  for(co in deplacement){ //on parcours la liste des coordonnées
    //on déplace le marker aux coordonnés en ajoutant un délais de plus en plus long
    Bouger_marker(Voiture,deplacement[co],co*750);
  }
  setTimeout(function(){  //a la fin du déplacement
    //on change le popup de la voiture pour indiquer la suite
    Voiture.bindPopup('Vous êtes enfin rentré à Champs sur Marne, quel soulagement <br>\
    <button class="bouton" id="bouton" type="button" onclick="fin();" onclick>fin !</button>').openPopup();
  }, 17250)

}

//permet de retourner a la page d'acceuil
function fin(){
  self.location.href="index.html";
}

//Au bout d'un certain temps, deplace un marker a des coordonnées données
function Bouger_marker(obj,coords,delay){
  setTimeout(function(){
    if(coords.length==3){mymap.setZoom(coords[2]);}  //si on a l'info, on change de zoom
    mymap.setView([coords[0],coords[1]]);  // on change la vue sur les nouvlles coordonnées
    obj.setLatLng({lat: coords[0], lng: coords[1]}); //on déplacele marker aux nouvelles coordonnées
  }, delay)
}

//calcul le temps qui s'écoule dans la partie
function timer(){
  time=document.getElementById('timer')
  let dec = 0;  //dixièmes de seconde
  let sec = 0;  //secondes
  let min = 0;  //minutes
  intervalId = setInterval(function(){ //on met a jour tout les 100ms
      dec += 1;
      if(dec >= 10){dec = 00; sec += 1;}
      if(sec >= 60){sec = 00; min += 1;}
      if(min >= 60){min = 00; heu += 1;}

      //on affiche le timer
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

//stop le timer
function stopTimer(){
  clearInterval(intervalId);
}