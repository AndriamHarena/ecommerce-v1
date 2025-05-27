
# Installation des dépendances de base

Aller dans le dossier `frontend` :

```bash
cd frontend
```

## 1. Installation des dépendances de base

Installer les dépendances avec :

```bash
npm install
```

### Cela a généré

* Un dossier `node_modules/` (où toutes les dépendances sont installées)
* Un fichier `package-lock.json`

---

## 2. Démarrage du serveur de développement

```bash
npm run dev
```

### Cela a

* démarré le serveur Vite
* généré un dossier `.vite/` (cache de build local pour que ce soit plus rapide)

---

## 3. Ajout de `react-router-dom`

Dépendence pour le routing. :

```bash
npm install react-router-dom
```

### Cela a installé

* `react-router-dom` (permet de gérer les routes en React)

---

## 4. Ajout de `axios`

```bash
npm install axios
```

### Cela a installé

* `axios` (pour faire des appels HTTP comme `GET`, `POST`, etc.)

---

## 📦 Liste actuelle des principales dépendances dans `package.json`

```json
"dependencies": {
  "axios": "...",
  "react": "...",
  "react-dom": "...",
  "react-router-dom": "..."
}
```

Et dans `"devDependencies"` :

```json
"devDependencies": {
  "@vitejs/plugin-react": "...",
  "vite": "..."
}
```

---

## 🔁 Résumé des commandes

| Étape                           | Commande utilisée                                     |
| ------------------------------- | ----------------------------------------------------- |
| Création du projet Vite + React | `npm create vite@latest frontend -- --template react` |
| Installation de base            | `cd frontend && npm install`                          |
| Lancement du dev server         | `npm run dev`                                         |
| Ajout de `react-router-dom`     | `npm install react-router-dom`                        |
| Ajout de `axios`                | `npm install axios`                                   |
