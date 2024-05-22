# Application de Gestion d'Intervention

## Description

Une application web de gestion d'interventions pour divers services, construite avec AngularJS 1.7, Python Flask, et PostgreSQL.

## Installation

### Prérequis

- Assurez-vous que Docker Desktop est installé et lancé sur votre machine => https://www.docker.com/products/docker-desktop/.
  et que vous possédé un compte docker.
- Assurez-vous que Git est installé sur votre machine => https://git-scm.com/downloads.

### Étapes

1. Cloner le dépôt :

    ```sh
    git clone https://github.com/amaellounkokobi/simple-intervention.git
    ```
    
    ```    
    cd simple-intervention
    ```

2. Lancer Docker Compose depuis le répertoire du projet :

    ```sh
    docker compose build
    ```
    ```sh
    docker compose up
    ```

3. Accéder au frontend et tester l'application à l'adresse suivante :

    [http://localhost:8080/](http://localhost:8080/)

## Fonctionnalités

- Afficher les interventions : Oui
- Ajouter une intervention : Oui
- Afficher une modal : Oui
- Trier par ordre ascendant ou descendant : Oui
- Fonction de recherche : Ajoutée
- Modifier une intervention : Oui
- Supprimer une intervention : Oui
- Mettre à jour un statut : Oui
