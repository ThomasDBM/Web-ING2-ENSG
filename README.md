# Web-ING2-ENSG
Projet web de deuxième année à l'ENSG

## Table des matières

1. [Info générale](#Info-générale)
2. [Technologies](#technologies)
3. [Installation](#installation)

### Info générale

Bienvenue sur GEOldie !
GEOldie est un escape-game géographique dont le principe est simple : votre voiture est bloquée dans un parking de Metz, et vous devez parcourir toute la ville pour en retrouver la clef.

### Technologies

Technologies utilisées:
* [Mamp](https://www.mamp.info/en/mamp/windows/): Version 4.2.0

### Installation

Commencez par récupérer le dossier Projet_Web. Et plcez le à l’emplacement de votre choix. 

Pour pouvoir exécuter les fichiers d’utilisation du jeu sur votre machine, il vous faudra installer un serveur. Les manipulations à effectuer dépendent de votre système d’exploitation.

I – Vous êtes sous Windows ou MacOS :

Téléchargez et installez le logiciel MAMP à l’adresse suivante :
https://www.mamp.info/fr/downloads/. 
Puis ouvrez le logiciel ; vous devez voir apparaître cette fenêtre.

![mamp](https://user-images.githubusercontent.com/76124859/102393520-c5dccd80-3fd8-11eb-9622-c2ae1050347b.png)

Cliquez sur MAMP, puis sur Préférences. Dans l’onglet Web Server, cliquez sur Select pour sélectionner le dossier que vous voulez exécuter.

![preférences_mamp](https://user-images.githubusercontent.com/76124859/102393543-cbd2ae80-3fd8-11eb-9838-41fd98519eba.png)

Il s’agit du dossier Projet_Web, que vous avez préalablement téléchargé à l’emplacement de votre choix.
Il vous suffit ensuite de taper « localhost » dans la barre de recherche de votre navigateur. Vous n’avez plus qu’à suivre les instructions à l’écran !

II – Vous êtes sous Linux :

Il vous faut dans ce cas installer un serveur LAMP. N’ayant pas d’environnement Linux à disposition, nous sommes dans l’incapacité de vous donner des indications précises quant à cette installation. Nous vous recommandons cependant de suivre ce tuto https://www.linuxtricks.fr/wiki/debian-installer-un-serveur-lamp-apache-mysql-php ou celui-ci http://doc.ubuntu-fr.org/lamp.  
Une fois LAMP installé, tapez « localhost » dans la barre de recherche de votre navigateur, puis sélectionnez le dossier Projet_Web. Vous n’avez plus qu’à suivre les instructions à l’écran !

III Importation Base de donnée :

Pour pouvoir lancer le jeu, il vous faudra créé la base de donnée sur votre appareil.
Pour commencer assurez vous d'avoir ouvert le serveur SQL en plus du serveur apache sur Mamp.
Ensuite cliquez sur : Open Webstart page et rendez vous sur la page d'accueil de Mamp sur votre navigateur.
De la, cliquez sur PHPmyAdmin pour acceder a la gestion de base de donnée

