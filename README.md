# Application de Vente d'Objets entre Particuliers
Ce projet consiste en une application Web permettant la mise en relation de particuliers pour la vente d'objets.
L'application offre des fonctionnalités complètes, allant de l'inscription des utilisateurs jusqu'à la gestion des ventes et du chiffre d'affaires.

## Fonctionnalités
### Utilisateur
1. Inscription
- Création de compte utilisateur avec login, mot de passe chiffré et ville de résidence.

2. Mise en vente d'un objet
- Ajout d'objets à vendre avec description courte et prix.
- Attribution automatique d'un numéro d'enregistrement pour chaque objet.

3. Recherche d'objets par mots-clés
- Consultation des objets disponibles à la vente (objets non vendus) via des mots-clés.

4. Enregistrement de la vente
- Gestion des ventes par le propriétaire de l'objet.

### Administrateur
5. Calcul du chiffre d'affaires
- Consultation du chiffre d'affaires total réalisé.
- Gestion des commissions (10 % par vente).

### Version professionnelle (futur développement)
- Gestion des professionnels avec calcul de la TVA selon la catégorie de l'objet.

## Spécifications Techniques
1. Backend
- Framework : Spring Framework ou Spring Boot
- Base de données : MySQL ou MariaDB
- Chiffrement des mots de passe dans la base de données.

2. Frontend
- Technologie : React ou Thymeleaf

3. Sécurité
- Requêtes HTTP chiffrées via HTTPS.

4. Architecture
- Conception agile et maintenable pour favoriser l'évolutivité.

## Installation
### Prérequis
- Java 17+
- Maven
- Node.js et npm (si utilisation de React)
- MySQL ou MariaDB

### Étapes d'installation
1. Clonez ce dépôt :
```
git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo
```

2. Configurez la base de données dans le fichier ```application.properties``` ou ```application.yml```.

3. Installez les dépendances backend avec Maven :

```
mvn clean install
```

4. Lancez le backend :

```
mvn spring-boot:run
```

5. Installez les dépendances frontend (si React) :

```
cd frontend
npm install
npm start
```

## Tests
1. Backend
- Utilisation de JUnit pour tester les services, contrôleurs et repositories.
```
mvn test
```

2. Frontend
- Tests avec Jest (si React).

## Licence
Ce projet est sous licence MIT.

## Auteur
Développé par HUANG Loïc, MOLAWKA Leonardo & CARDON Sowen.
