<?php

//Connexion à la BDD
$link = mysqli_connect('localhost', 'root', 'root', 'geo_escape');

/*if (!$link) {
  die('Erreur de connexion');
} else {
  echo 'Succès... ';
}*/

//On récupère les informations du joueur
$Nom = json_decode(file_get_contents('php://input'),true)["nom"];
$temps=json_decode(file_get_contents('php://input'),true)["temps"];
$image=json_decode(file_get_contents('php://input'),true)["picture"];


//On écrit la requête SQL
$requete="INSERT INTO `joueurs` (`Nom`, `Temps`, `Picture`) VALUES ('". $Nom ."','". $temps ."','". $image ."')";

//On demande un résultat
$results = mysqli_query($link,$requete);

if ($results) { //si le résultat est bon
  echo json_encode('joueur_enregistré'); //le joueur est enregistré
} else { //sinon
    echo  json_encode('nope'); //message d'erreur
}

?>
