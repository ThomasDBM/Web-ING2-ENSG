
<?php

//Connexion à la BDD
$link = mysqli_connect('localhost', 'root', 'root', 'geo_escape');


//On récupère l'id de l'objet que l'on veut récuperer
$id=$_GET["Valeur"];


if ($results = mysqli_query($link, 'SELECT * FROM objet WHERE id ='. $id .'')) { //si la requête sql renvoie un résultat
    while ($name = mysqli_fetch_object($results)) {
        $nom = $name;
    }
} else {
    echo 'nope';
}

//On l'envoie en format json
echo json_encode($nom);

?>
