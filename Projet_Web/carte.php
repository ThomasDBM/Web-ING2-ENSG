<!DOCTYPE html>
<html lang="fr">

  <head>
    <meta charset="UTF-8">
    <title>GEOldie</title>

    <link rel="stylesheet" href="style.css">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>

    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>

  </head>

  <body id=carte>

    <div id=joueur class=case>
    <img id=portrait src="icons\Selfies\No_picture.png" >
    <p id=Nom></p>
    </div>

    <p class=titre>GEOldie</p>

    <div id="mapid" class=case></div>

    <div id="objets_recup" class=case></div>

    <div id=timer>00.00</div>

    <div class=box_classement>
      <table class=tableau id='classement'></table>
    </div>
    
    <script src="code_carte.js"></script>
    <script src="Tableau_Score.js"></script>

    <div id=footer>
    <p class=in_footer id=crédits>Thomas de Beaumont<br> Floriane Kergus</p>
  </div>
  </body>

</html>