# GIT

1. On a plusieurs versions du même code : locale et distante (GitHub/GitLab).
2. On peut créer différentes **branches** qui vont être des versions parallèles du même code source.
3. Chaque modification que l'on effectue peut être sauvegardée (**versioning**).
4. Chaque dev peut travailler sur les mêmes fichiers. Si un conflit survient, on pourra le régler.
5. Chaque modification est enregistrée, accompagnée d’un **auteur**, d’un **message**, d’une **date**, etc.

---

## Comment travailler

1. **On crée une branche par fonctionnalité** :

   ```bash
   git checkout
   git branch
   ```

2. **Lorsqu'une modification est prête, on peut "commit" (sauvegarder)** :

   ```bash
   git commit -m "Message du commit"
   ```

3. **Lorsque tout est terminé et testé, on peut faire un "push" (envoyer le code local vers la version distante)** :

   ```bash
   git push
   ```

4. **Lorsque le code a été push, on peut "fusionner" les branches** (en entreprise, cette étape est accompagnée d'une *pull request*).

---

## Comment démarrer notre projet sur GitHub à l'aide de GIT

1. Créer un **repository** sur GitHub.

2. Ajouter vos collègues en tant que **collaborateurs**.

3. Récupérer le lien du repo dans l'onglet **"Code" (bouton vert)** :

```bash
https://github.com/titoms/ecommerce-v1.git
```

## 4. Depuis votre machine locale, lancer la commande suivante

   ```bash
   git clone https://github.com/titoms/ecommerce-v1.git
   ```

## 5. Pour bien utiliser GIT, voici les commandes utiles à connaître

```bash
git status                     # Résumé des modifications actuelles
git checkout                   # Changer de branche
git checkout -b "BRANCH_NAME" # Créer et se positionner sur une nouvelle branche
git branch                     # Visualiser les branches locales
git add .                      # Ajouter tous les fichiers modifiés au prochain commit
git commit -m "COMMIT_MESSAGE" # Sauvegarder le code avec un message explicatif
git push                       # Envoyer le code local vers le dépôt distant
```

## 6. Une fois le code "pushé", il reste cette étape importante

   1. Créer une **pull request** sur GitHub : cela affiche les modifications effectuées sur votre branche.
   2. Quelqu’un de l’équipe vérifie vos changements. Si tout va bien, il **merge** votre branche avec `main`.
   3. Sur votre PC (local), **revenir sur la branche `main`** et faire :

      ```bash
      git pull
      ```

## 7. Après avoir fait vos tâches et un `push`, **tout le monde doit vérifier qu'il a la dernière version** du projet

* Si vous êtes sur `main` et commencez à travailler :

```bash
git pull
```

* Si vous étiez déjà en train de bosser, pour actualiser votre version :

```bash
git rebase   # (SURTOUT, JAMAIS FAIRE "git pull")
```

* Si vous installez le projet pour la première fois ou si une nouvelle dépendance a été ajoutée :

```bash
npm install
```
