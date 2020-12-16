<?php

//connection a la BDD
$link = mysqli_connect('localhost', 'root', 'root', 'geo_escape');

/*if (!$link) {
  die('Erreur de connexion');
} else {
  echo 'Succès... ';
}*/

//on recupère les indormation du joueur
$Nom = json_decode(file_get_contents('php://input'),true)["nom"];
$temps=json_decode(file_get_contents('php://input'),true)["temps"];
$image=json_decode(file_get_contents('php://input'),true)["picture"];


//on ecrit la requète SQL
$requete="INSERT INTO `joueurs` (`Nom`, `Temps`, `Picture`) VALUES ('". $Nom ."','". $temps ."','". $image ."')";

//on demande un resultat
$results = mysqli_query($link,$requete);

if ($results) { //si le résultat est bon
  echo json_encode('joueur_enregistré'); //on dit que c'est bon
} else { //sinon
    echo  json_encode('nope'); //on dit que c'est pas bon
}

?>