<?php

//connection a la BDD
$link = mysqli_connect('localhost', 'root', 'root', 'geo_escape');

//requete SQL
$requete="SELECT `Nom`,`Temps`,`Picture` FROM `joueurs`";

//resultat de la requete
$results = mysqli_query($link,$requete);

//si il y a un resultat on le renvoie en format json
if ($results) {
    while ($name = mysqli_fetch_assoc($results)) {
        $nom[] = $name;
    }
} else {
    echo  json_encode('nope');
}

echo json_encode($nom);

?>