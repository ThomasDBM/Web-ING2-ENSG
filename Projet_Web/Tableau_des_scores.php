<?php

//Connexion à la BDD
$link = mysqli_connect('localhost', 'root', 'root', 'geo_escape');

//Requête SQL
$requete="SELECT `Nom`,`Temps`,`Picture` FROM `joueurs`";

//Résultat de la requête
$results = mysqli_query($link,$requete);

//S'il y a un résultat, on le renvoie en format json
if ($results) {
    while ($name = mysqli_fetch_assoc($results)) {
        $nom[] = $name;
    }
} else {
    echo  json_encode('nope');
}

echo json_encode($nom);

?>
