# Résumé des commandes Git essentielles

## 🔄 1. `git clone`

> **Copie un projet distant sur ta machine (GitHub, GitLab, etc.)**

```bash
git clone https://github.com/utilisateur/projet.git
```

---

## 🔀 2. `git switch` ou `git checkout`

> **Changer de branche**

```bash
git switch nom-de-branche      # recommandé (plus moderne)
git checkout nom-de-branche    # ancienne syntaxe encore utilisée
```

> **Créer et se placer sur une nouvelle branche :**

```bash
git switch -c nouvelle-branche
```

---

## 📝 3. `git status`

> **Voir les fichiers modifiés / en attente de commit**

```bash
git status
```

---

## 📂 4. `git add`

> **Prépare un ou plusieurs fichiers pour le commit**

```bash
git add monfichier.txt         # ajouter un fichier
git add .                      # ajouter tous les fichiers modifiés
```

---

## 💾 5. `git commit`

> **Enregistre les changements avec un message**

```bash
git commit -m "Message clair de ce que tu as fait"
```

---

## 📤 6. `git push`

> **Envoie tes commits vers le dépôt distant (GitHub, etc.)**

```bash
git push origin nom-de-branche
```

---

## 🔄 7. `git pull`

> **Récupère les dernières modifications du dépôt distant et les fusionne dans ta branche**

```bash
git pull origin nom-de-branche
```

> Exemples :

```bash
git pull origin main
```

---

## 🔀 8. `git merge`

> **Fusionne une branche dans ta branche actuelle**

```bash
git merge nom-de-la-branche-a-fusionner
```

> Exemples :

```bash
git switch main
git merge ma-feature
```

---

## 🔧 9. `git log`

> **Voir l’historique des commits**

```bash
git log
git log --oneline     # version courte
```

---

## ❌ 10. `git reset`

> **Annule un commit (attention !)**

```bash
git reset --soft HEAD~1   # annule le dernier commit, garde les fichiers
git reset --hard HEAD~1   # annule et supprime les modifications
```

---

## 🧽 11. `git stash`

> **Sauvegarde temporairement tes modifs pour faire autre chose**

```bash
git stash           # sauvegarde
git stash pop       # récupère ce que tu avais mis de côté
```

---

### 🔁 Récap express (cas typique)

```bash
git pull origin main
git switch -c nouvelle-branche
# tu codes...
git add .
git commit -m "Ajout d'une fonctionnalité"
git push origin nouvelle-branche
```
