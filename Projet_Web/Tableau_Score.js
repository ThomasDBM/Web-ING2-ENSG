var Tableau=document.getElementById('classement')

//On interroge la BDD pour avoir les scores
fetch('Tableau_des_scores.php?').then(function (result) {
    return result.json();

  }) .then(function (result) {

    //On trie les scores par ordre croissant
    var Scores=Tri_temps(result);
    
    for(i=0; i<Scores.length;i++){ //On parcourt la liste des scores

      //On ajoute la photo, le nom et le temps dans le tableau
      Tableau.innerHTML+='<tr>\
      <td>'+(i+1)+'</td>\
      <td><img class=Icon_Score src="icons/Selfies/'+Scores[i]['Picture']+'" > </td>\
      <td>'+Scores[i]['Nom']+' </td>\
      <td class="temps">'+Scores[i]['Temps']+' </td>\
      </tr>'
    }

    })

//On trie les résultats en fonction du temps réalisé
function Tri_temps(Liste){
  for(var i = 0; i < Liste.length; i++){
    //On stocke l'index de l'élément minimum
    var min = i; 
    for(var j = i+1; j < Liste.length; j++){
      if(convert_heure(Liste[j]['Temps']) < convert_heure(Liste[min]['Temps'])){
       //On met à jour l'index de l'élément minimum
       min = j; 
      }
    }
    var tmp = Liste[i];
    Liste[i] = Liste[min];
    Liste[min] = tmp;
  }
  return Liste;
}

//On convertit les minutes, secondes et dixièmes de seconde
function convert_heure(heure){
  Units=heure.split(':');
  return(600*parseInt(Units[0])+10*parseInt(Units[1])+parseInt(Units[2]));

}

