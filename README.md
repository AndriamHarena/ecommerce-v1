# Étape de conception

## Structure des dossiers

```plaintext
frontend/
├── api/
│   └── apiClient.js
├── components/
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── UserProfile.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── OrderHistory.jsx
│   ├── ProfilePage.jsx
│   └── Register.jsx
├── App.jsx
├── main.jsx
├── index.html
└── package.json
```

## Présentation du projet

Il s’agit de la partie frontend d’une application e-commerce développée avec **React.js** et **Vite**. L’interface est découpée en composants réutilisables, avec un système de navigation par page et une gestion globale de l’authentification à l’aide du context API de React. Les appels vers l’API backend sont centralisés dans un client Axios.

## Répertoire `api`

Le dossier `api` centralise la gestion des requêtes vers l’API backend.

* `apiClient.js` : Ce fichier configure un client Axios avec une base URL (`http://localhost:3001/api`) et un intercepteur qui injecte automatiquement le token JWT (stocké dans le localStorage) dans les en-têtes des requêtes.
  Il exporte également plusieurs fonctions (ex : `getProducts`, `getCurrentUser`) qui facilitent la communication avec les points d’entrée du backend.

## Répertoire `components`

Le dossier `components` contient les composants React réutilisables à travers l'application :

* `Navbar.jsx` : Affiche la barre de navigation avec des liens vers les différentes pages (accueil, profil, etc.).
* `ProductCard.jsx` : Composant d’affichage des produits (image, nom, prix).
* `UserProfile.jsx` : Composant dédié à l’affichage des informations d’un utilisateur connecté.

Ces composants sont pensés pour être modulaires et intégrés facilement dans plusieurs pages.

## Répertoire `context`

Le dossier `context` gère l’état global de l’application, notamment pour l’authentification :

* `AuthContext.jsx` : Définit un `AuthContext` avec React. Il fournit :

  * L’état d’authentification (`user`, `token`, etc.).
  * Des fonctions de connexion, déconnexion, enregistrement, etc.
  * Le hook personnalisé `useAuth()` pour accéder facilement au contexte dans n’importe quel composant.

## Répertoire `pages`

Ce répertoire contient les pages principales de l’application, chacune correspondant à une route dans le système de navigation.

* `Home.jsx` : Page d’accueil affichant la liste des produits.
* `Login.jsx` : Formulaire de connexion.
* `Register.jsx` : Formulaire d’inscription.
* `OrderHistory.jsx` : Affiche les commandes passées par l’utilisateur connecté.
* `ProfilePage.jsx` : Affiche les informations personnelles de l’utilisateur.

Chaque fichier de page exporte un composant React représentant une vue complète avec sa logique propre.

## Autres fichiers importants

* `App.jsx` : Composant racine de l’application. Gère le routage et l’agencement général.
* `main.jsx` : Point d’entrée de l’application, qui monte `App` dans le DOM.
* `index.html` : Gabarit HTML principal utilisé par Vite.
* `package.json` : Contient les métadonnées, scripts, dépendances du projet frontend.

## Résumé

L’architecture du frontend est organisée selon une séparation claire des responsabilités :

* **`api/`** pour la communication avec le backend,
* **`components/`** pour les éléments visuels réutilisables,
* **`context/`** pour la gestion de l’état global,
* **`pages/`** pour les vues principales de l’application.
  Ce découpage facilite la maintenance, la lisibilité et l’évolutivité du code.
