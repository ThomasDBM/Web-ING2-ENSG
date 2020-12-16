var storage=window.localStorage

//Si le jeu a été terminé
if (storage.getItem(0)){

  //on recupère les variables
  var time_fin=storage.getItem(1);
  var text_fin=document.getElementById('fin_jeu');
  //on ajoute un paragraphe à la page du debut
  text_fin.innerHTML="Bravo, vous avez récupéré les clefs de la Goldie en "+time_fin+" ! <br>Vous pouvez rejouer si vous voulez,\
   mais nous savons tous les deux que ce sera moins marrant la deuxième fois !";
   storage.clear();
}


//fonction pour démarrer le jeu
function demarrer(){
  var pseudo=document.getElementById('nom').value
  if (pseudo.length==0){
    var text=document.getElementById('alerte')
    text.innerHTML+='Il faut remplir un nom pour commencer'
  }else{
      self.location.href='carte.php?name='+document.getElementById('nom').value
  }
}