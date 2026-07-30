# Quiz d'auto-évaluation — Terminale spécialité physique-chimie

Site statique (aucun serveur à gérer) permettant aux élèves de faire un quiz
d'auto-évaluation par chapitre. Les résultats (nom, classe, chapitre, score,
date) sont envoyés vers un Google Sheet **privé** que seul l'enseignant
consulte — ils ne transitent jamais par le dépôt GitHub, qui reste public.

## 1. Mettre le site en ligne (GitHub Pages)

1. Sur GitHub, crée un nouveau dépôt (ex : `quiz-tspe`), public, sans README
   auto-généré.
2. Dépose tous les fichiers de ce dossier à la racine du dépôt (via
   "Add file > Upload files" sur github.com, pas besoin de ligne de
   commande).
3. Dans le dépôt : **Settings > Pages > Source**, sélectionne la branche
   `main` et le dossier `/ (root)`. Valide.
4. Après une minute ou deux, ton site est accessible à une adresse du type
   `https://TON-PSEUDO.github.io/quiz-tspe/`.

## 2. Créer le Google Sheet qui reçoit les résultats

1. Crée un nouveau Google Sheet (vide), par exemple nommé "Résultats quiz Tspé".
2. Menu **Extensions > Apps Script**. Une nouvelle fenêtre s'ouvre.
3. Supprime le contenu par défaut du fichier `Code.gs` et colle le contenu
   du fichier `apps-script/Code.gs` fourni ici.
4. Clique sur **Déployer > Nouveau déploiement**.
   - Type : "Application Web"
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde** (nécessaire pour que le site public
     puisse envoyer les données ; le Sheet, lui, reste privé et n'est
     accessible qu'à toi)
5. Autorise les permissions demandées (c'est ton propre script, sur ton
   propre compte).
6. Copie l'URL du déploiement (elle ressemble à
   `https://script.google.com/macros/s/AKfycb.../exec`).

## 3. Relier le site au Google Sheet

Dans le fichier `script.js`, remplace la première ligne :

```js
const WEBHOOK_URL = "https://script.google.com/macros/s/REMPLACER_PAR_TON_ID/exec";
```

par l'URL copiée à l'étape précédente, puis réenregistre/republie le fichier
sur GitHub (modification directe possible dans l'éditeur en ligne de
GitHub, icône crayon).

## 4. Ajouter un nouveau chapitre

1. Duplique `chapters/acides-bases.json`, renomme-le (ex :
   `chapters/cinetique.json`), et remplace les questions.
2. Ajoute une ligne dans `chapters/manifest.json` :

```json
{ "id": "cinetique", "title": "Cinétique chimique", "number": 2 }
```

Le site affiche automatiquement le nouveau chapitre sur la page d'accueil.
Aucune autre modification de code n'est nécessaire.

## 5. Exploiter les statistiques

Chaque tentative crée une ligne dans l'onglet "Resultats" du Sheet :
horodatage, nom, classe, chapitre, score, total. Pour compter le **nombre
de tentatives** par élève et par chapitre, utilise une formule du type :

```
=COUNTIFS(Resultats!B:B, "Nom Elève"; Resultats!D:D, "Acides et bases")
```

ou construis un tableau croisé dynamique (Insertion > Tableau croisé
dynamique) avec Nom + Chapitre en lignes et "Nombre de Score" en valeurs.

## Limites à connaître

- Un élève peut modifier son nom avant d'envoyer ses résultats : ce
  dispositif sert à repérer qui fait le travail, pas à authentifier — ne
  pas s'en servir comme note officielle sans vigilance.
- Le champ "URL de déploiement" du script Apps Script change si tu
  crées un *nouveau* déploiement plutôt que de gérer les *versions*
  d'un déploiement existant. Utilise "Gérer les déploiements > Modifier"
  pour mettre à jour le code sans changer l'URL.
- Données d'élèves mineurs : garde le Sheet privé (ne le partage jamais
  en "Tout le monde avec le lien peut voir"), n'y mets pas d'e-mails ou
  d'identifiants sensibles.
