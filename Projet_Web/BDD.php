
<?php

//connection a la BDD
$link = mysqli_connect('localhost', 'root', 'root', 'geo_escape');


//on récupère l'id de l'objet a récuperer
$id=$_GET["Valeur"];


if ($results = mysqli_query($link, 'SELECT * FROM objet WHERE id ='. $id .'')) { //si la requete sql renvoie un resultat
    while ($name = mysqli_fetch_object($results)) {
        $nom = $name;
    }
} else {
    echo 'nope';
}

//on l'envoie en format json
echo json_encode($nom);

?>