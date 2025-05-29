# 🛒 Projet E-Commerce - NodeJS & ReactJS

## 🧠 Objectif du projet

Ce projet est le fruit d’un travail collaboratif réalisé dans le cadre d’un cours portant sur **Git** et **l’intégration de l’IA** dans le processus de développement. L’objectif principal était de **concevoir une application e-commerce complète** tout en mettant en pratique les notions suivantes :

* Utilisation avancée de Git pour le versioning, les branches et les pull requests.
* Répartition des tâches entre les membres de l’équipe.
* Intégration d’une intelligence artificielle pour assister le développement (ex : documentation, génération de code, suggestions, debug).
* Création d’une application web moderne en **NodeJS (Express)** pour le backend et **ReactJS (Vite)** pour le frontend.

---

## 🧩 Fonctionnalités principales

* ✅ Authentification avec **rôles utilisateurs** : `admin`, `user`.
* 🛍️ Affichage dynamique des **produits**.
* 🧾 Possibilité de passer une **commande**.
* 📜 Visualisation de l’**historique des commandes** pour chaque utilisateur.
* 🛠️ Espace **administrateur** permettant de gérer :

  * Les **produits** (CRUD),
  * Les **utilisateurs** (CRUD),
  * Les **commandes** (vue globale des commandes).

---

## ⚙️ Architecture technique

Le projet est composé de deux parties distinctes :

### 🔧 Backend (NodeJS + Express + MongoDB)

> Gère toute la logique métier, l’authentification, les rôles et l’accès à la base de données.

**Principales responsabilités :**

* Conception des modèles (produits, utilisateurs, commandes).
* Création de l’API REST (CRUD pour chaque entité).
* Sécurisation avec JWT + middlewares.
* Connexion à une base de données MongoDB.
* Seed de données initiales (produits, utilisateur admin, etc.).

Structure simplifiée :

```plaintext
backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── seed/
└── index.js
```

---

### 🎨 Frontend (ReactJS + Vite)

> Interface utilisateur intuitive, moderne et responsive.

**Fonctionnalités clés :**

* Système de pages (Accueil, Connexion, Inscription, Profil, Commandes...).
* Authentification avec persistance via JWT (stockage local).
* Interface utilisateur divisée en composants réutilisables.
* Gestion de l’état global avec React Context API.
* Requêtes HTTP centralisées avec Axios.
* Interface d’administration conditionnelle selon le rôle.

Structure simplifiée :

```plaintext
frontend/
└── src/
    ├── api/
    ├── components/
    ├── context/
    ├── pages/
    ├── styles/
    ├── App.jsx
    └── main.jsx
```

---

## 🛠️ Technologies et bibliothèques utilisées

### 🖥️ Backend

* **Node.js** : Environnement d’exécution JavaScript.
* **Express.js** : Framework web minimaliste.
* **MongoDB** + **Mongoose** : Base de données NoSQL.
* **JSON Web Token (JWT)** : Authentification sécurisée.
* **bcryptjs** : Hachage de mots de passe.
* **dotenv** : Gestion des variables d’environnement.
* **CORS** : Gestion des politiques d'accès cross-domain.

### 🌐 Frontend

* **React.js** : Librairie UI.
* **Vite** : Outil de build rapide.
* **React Router DOM** : Navigation par URL.
* **Axios** : Requêtes HTTP.
* **Context API** : Gestion de l’état global.
* **CSS** : Mise en forme des composants.

---

## 📁 Exécution du projet

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 👨‍👩‍👧‍👦 Travail en équipe & Git

Le projet a été conçu de manière collaborative :

* Répartition claire des responsabilités (frontend, backend, routes, composants, etc.).
* Utilisation de **GitHub** pour le versioning et le suivi de l’avancement.
* Branches dédiées à chaque membre / fonctionnalité.
* Pull requests validées collectivement.
* Suivi des commits, historique, gestion des conflits.

### 🔍 GitLens — Git supercharged

L’extension **GitLens** a été utilisée dans l’éditeur pour :

* Obtenir un **graphique visuel** des commits et des fusions (merges) entre les différentes branches.
* Identifier rapidement l’auteur et le contexte de chaque modification.
* Améliorer la compréhension de l’historique du projet et faciliter la collaboration.

---

## 🧠 Apport de l’IA dans le projet

L’intelligence artificielle a été un **véritable assistant de développement** tout au long du projet, via deux outils complémentaires :

### 🌀 Windsurf (intégré à l’IDE)

* Utilisé pour **comprendre la structure globale du projet** grâce à sa capacité à analyser tous les fichiers et les dépendances.
* Très utile pour **naviguer rapidement dans l’arborescence**, trouver des erreurs potentielles ou suggérer des améliorations contextuelles.
* A également servi à **générer des fonctions adaptées** à l’architecture déjà en place.

### 🤖 ChatGPT

* Aide précieuse pour la **rédaction de la documentation** (README, commentaires, etc.).
* **Débogage** de certaines erreurs de logique ou de syntaxe.
* **Relecture de code** pour détecter les incohérences ou proposer des simplifications.
* **Suggestions d’optimisation** pour améliorer la lisibilité, les performances ou la structure du code.
* Utilisé également pour **reformuler et clarifier les prompts** destinés à Windsurf, afin d’en tirer le meilleur parti.

---

## 📌 Conclusion

Ce projet est une **base fonctionnelle d'application e-commerce**. Il peut facilement être enrichi avec de nouvelles fonctionnalités (paiement, filtres, tri, gestion des stocks, tableau de bord analytique, etc.).

Il démontre :

* La **capacité à travailler en équipe** avec Git.
* La **connaissance des outils modernes** de développement web.
* L’**intégration cohérente d’une IA** dans un workflow réel.

## 🧑‍💻 Auteur

* **Elhadj Ibrahima BAH** — Authentification, gestion des utilisateurs, JWT, middleware des rôles
  [GitHub](https://github.com/Ibrahima17)

* **Baptiste TABAR LABONNE** — Gestion des produits, commandes et historique des commandes
  [GitHub](https://github.com/TabarBaptiste)

* **Harena ANDRIAMANANJARA MANDIMBY** — Interface utilisateur, intégration API frontend, routing React, panneau d’administration
  [GitHub](https://github.com/AndriamHarena)
