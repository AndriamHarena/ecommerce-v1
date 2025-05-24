# Étape de conception

## Structure des dossiers

```mathematica
backend/
├── controllers/
│   └── authController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── Order.js
├── routes/
│   └── authRoutes.js
├── seed/
│   └── seedProducts.js
├── index.js
```

## Présentation du projet

Il s'agit d'un projet e-commerce développé avec Node.js, Express.js et MongoDB. Le projet est organisé en plusieurs dossiers, chacun contenant des composants spécifiques de l'application.

## Controllers (Contrôleurs)

Les contrôleurs contiennent la logique métier et interagissent avec les modèles pour effectuer les opérations CRUD (Créer, Lire, Mettre à jour, Supprimer). Le projet comprend les contrôleurs suivants :

* `productController.js` : Gère les opérations liées aux produits (création, lecture, mise à jour, suppression).
* `userController.js` : Gère les opérations liées aux utilisateurs.
* `authController.js` : Gère les opérations liées à l’authentification (connexion, enregistrement).

## Routes

Les routes définissent les points d’accès de l’API (endpoints). Le projet inclut les routes suivantes :

* `productRoutes.js` : Définit les routes liées aux produits, comme `/api/products`, `/api/products/:id`, etc.
* `userRoutes.js` : Définit les routes liées aux utilisateurs, comme `/api/users`, `/api/users/:id`, etc.
* `authRoutes.js` : Définit les routes liées à l’authentification, comme `/api/auth/login`, `/api/auth/register`, etc.

## Models (Modèles)

Les modèles définissent la structure des données stockées dans la base de données. Le projet contient les modèles suivants :

* `Product.js` : Décrit la structure d’un produit dans la base de données.
* `User.js` : Décrit la structure d’un utilisateur.
* `Order.js` : Décrit la structure d’une commande.

## Middleware

Les middlewares sont des fonctions qui s’exécutent avant ou après le traitement des routes. Le projet inclut notamment :

* `authMiddleware.js` : Vérifie le token d’authentification envoyé dans l’en-tête `Authorization` des requêtes.

## Scripts de seed

Les scripts de seed permettent de peupler la base de données avec des données initiales. Le projet inclut :

* `seedProducts.js` : Ajoute des produits initiaux dans la base de données.
* `seedUser.js` : Ajoute un utilisateur initial.

## Points d’entrée API

Voici les principaux points d’entrée de l’API du projet :

* Produits

  * `GET /api/products` : Récupère la liste de tous les produits.
  * `GET /api/products/:id` : Récupère un produit par son ID.
  * `POST /api/products` : Crée un nouveau produit.
  * `PUT /api/products/:id` : Met à jour un produit existant.
  * `DELETE /api/products/:id` : Supprime un produit.

* Utilisateurs

  * `GET /api/users` : Récupère la liste des utilisateurs.
  * `GET /api/users/:id` : Récupère un utilisateur par son ID.
  * `POST /api/users` : Crée un nouvel utilisateur.
  * `PUT /api/users/:id` : Met à jour un utilisateur.
  * `DELETE /api/users/:id` : Supprime un utilisateur.

* Authentification

  * `POST /api/auth/login` : Connecte un utilisateur et renvoie un token d’authentification.
  * `POST /api/auth/register` : Enregistre un nouvel utilisateur.
