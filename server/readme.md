# EduShare : Plateforme d'échange de cours

## Mise en place et démarrage

Suivez ces étapes pour démarrer le projet :

### 1. Configuration de l'environnement virtuel

Dans votre terminal, exécutez la commande suivante pour créer un environnement virtuel :

```bash
python -m venv env
```

Activez l'environnement virtuel :

```bash
env\Scripts\activate
```

### 2. Installation des dépendances

Assurez-vous que vous êtes dans le répertoire principal du projet (où se trouve le fichier requirements.txt) et exécutez :

```bash
pip install -r requirements.txt
```

### 3. Configuration de la base de données

Exécutez les commandes suivantes pour effectuer les migrations :

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Création d'un superutilisateur

Pour créer un superutilisateur pour l'interface d'administration, exécutez :

```bash
python manage.py createsuperuser
```

Suivez les instructions à l'écran pour définir un nom d'utilisateur, une adresse e-mail et un mot de passe.

### 5. Démarrage du serveur

Lancez le serveur avec la commande :

```bash
python manage.py runserver
```

## Utilisation

- Pour manipuler l'API via l'interface frontend, visitez : http://localhost:8000/api/

- Pour consulter la documentation de l'API, rendez-vous sur :
  http://localhost:8000/documentation/
