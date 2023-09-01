# EduShare - Plateforme d'éducation en ligne

EduShare est une plateforme d'éducation en ligne qui vise à fournir un espace où les utilisateurs peuvent partager, découvrir et télécharger des cours, créés par des étudiants de la même université/école, sur divers sujets. Que vous soyez étudiant, enseignant ou simplement intéressé par l'apprentissage, EduShare est conçu pour vous aider à accéder à une variété de ressources éducatives.

## Fonctionnalités Principales

- **Inscription et Connexion:** Les utilisateurs peuvent créer des comptes et se connecter pour accéder à toutes les fonctionnalités de la plateforme.

- **Ajout de Cours:** Les enseignants et les étudiants peuvent ajouter des cours sur différents sujets, accompagnés de descriptions .

- **Consultation de Cours:** Les utilisateurs peuvent parcourir la liste des cours disponibles, afficher les détails et les descriptions des cours, ainsi que consulter les commentaires des autres utilisateurs.

- **Téléchargement de Cours:** Les utilisateurs peuvent télécharger des cours au format PDF pour les consulter hors ligne.

- **Profils Utilisateurs:** Chaque utilisateur dispose d'un profil personnalisé où il peut mettre à jour ses informations, afficher ses cours ajoutés et consulter ses activités récentes.

- **Commentaires:** Les utilisateurs peuvent laisser des commentaires sur les cours pour partager leurs expériences et poser des questions.

## Technologies Utilisées

- **Frontend:** React, React Router, Axios
- **Backend:** Django, Django REST Framework
- **Base de données:** Mysql

## Installation

1. Accéder au dossier frontend : `cd frontend`.
2. Installer les dépendances : `npm install`.
3. Accéder au dossier backend : `cd backend`.
4. Créer un environnement virtuel : `python -m venv venv`.
5. Activer l'environnement virtuel :
   - Sur Windows : `venv\Scripts\activate`
   - Sur macOS et Linux : `source venv/bin/activate`
6. Installer les dépendances : `pip install -r requirements.txt`.
7. Exécuter les migrations : `python manage.py migrate`.
8. Lancer le serveur backend : `python manage.py runserver`.
9. Lancer le serveur frontend : `npm start`.
