# Application fullstack de todolist 

Il s'agit d'une application de todolist où on a la possibilité de créer un compte et d'y ajouter des tâches, les modifier et les supprimer, et également de pouvoir visualiser les tâches des autres utilisateurs




## Fonctionnalités

- Authentification
- Créer un tâche
- Changer l'état de ses tâche (en attente, complétée)
- Rechercher un tâche
- Visualiser les tâches des autres utilisateurs

## Technologies utilisées

**Client:** React, JSX, TailwindCSS

**Server:** Laravel, Mysql


## Pour déployer le projet en local

Cloner le project

```bash
  git clone https://github.com/GysAlex/Brief4
```

Aller dans le repertoire du projet
```bash
  cd Brief4
```
Importer la base de donner(assurer vous d'avoir mysql installer dans les variables d'environnement)
```bash
  mysql -u root -p nouvelle_base_de_données < todolist.sql
```
Aller dans le repertoire todoList(il s'agit du backend)
```bash
  cd todoList 
```
Installer les dépendances
```bash
  php artisan install
```
Demarrer le serveur
```bash
  php artisan serve
```
Ouvrir un nouveau terminal et se deplacer dans le repertoire todolistFrontEnd
```bash
  cd todolistFrontEnd 
```
Installer les dépendances
```bash
  npm i
```
Lancer le frontend
```bash
  npm run dev
```
