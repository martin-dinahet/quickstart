# ⚡ Quickstart

Une solution simple, modulaire et moderne pour initialiser son application Next.JS facilement et rapidement !

## Démarrage rapide, pour les flemmards

```bash
# cloner le dépôt
git clone -b main https://github.com/martin-dinahet-quickstart.git

# réinitialiser l'historique Git
rm -rf .git
git init

# installer les dépendances
npm install

# lancer la base de données en mode développement
npx prisma studio

# lancer le serveur de développement
npm run dev
```

## Documentation

### Choisir votre branche

Ce projet propose actuellement deux branches selon vos besoins :

- **`main`** : version de base sans authentification
- **`auth`** : version avec un système d'authentification intégré

Pour cloner la branche souhaitée :

```bash
# Sans authentification
git clone -b main https://github.com/martin-dinahet/quickstart.git <nom-du-projet>

# Avec authentification
git clone -b auth https://github.com/martin-dinahet/quickstart.git <nom-du-projet>
```

Ou si vous avez déjà cloné le dépôt :

```bash
# Basculer vers la branche main
git checkout main

# Basculer vers la branche auth
git checkout auth
```

### Réinitialiser Git

Lorsque vous clonez ce dépôt, il conserve l'historique Git du projet original. Pour commencer avec un historique propre :

```bash
# Supprimer l'historique Git existant
rm -rf .git

# Initialiser un nouveau dépôt Git
git init

# Faire votre premier commit
git add --all
git commit -m "chore(repo): initial commit"
```

### Installer les dépendances

Après avoir cloné le projet, vous devez installer toutes les dépendances nécessaires au fonctionnement de l'application.

```bash
npm install
# ou
pnpm install
# ou
yarn install
```

Pourquoi cette étape est nécessaire ?

- Le dossier `node_modules` n'est pas inclus dans le dépôt Git (trop volumineux)
- Cette commande télécharge tous les packages listés dans `package.json`
- Elle installe Next.js, React, et toutes les librairies utilisées par le projet
- Sans cette étape, votre application ne pourra pas démarrer


### Configuration de l'environnement

**Créer le fichier `.env`**

Créez un fichier `.env` à la racine du projet.

**Variables d'environnement requises**

Pour toutes les branches :

```env
# Database
DATABASE_URL="url-de-votre-base-de-données
```

Pour la branche `auth` uniquement : 

```env
# Session (générez une clé aléatoire et sécurisée)
SESSION_SECRET="votre-clé-secrète-aléatoire-et-longue"
```

### Configuration de Prisma

**Configurer votre base de données**

Le projet utilise Prisma comme ORM. Il est recommandé d'utiliser PostgreSQL.
Modifiez `DATABASE_URL` dans `.env` et ajoutez-y l'URL de votre base de données.

**Créer des tables**

Ajoutez les tables nécessaires au fonctionnement de votre application dans le fichier `prisma/schema.prisma`. Pour des instructions sur comment créer des tables, veuillez vous référer à la documentation officielle de Prisma. Pour la branche `auth`, la table `User` permet le bon fonctionnement du système d'authentification et d'accéder aux détails de l'utilisateur actuel.

Appliquez les migrations pour créer les tables dans votre base de données (si vous en avez une):

```bash
# npm
npx prisma migrate dev

# pnpm
pnpm prisma migrate dev
```

### Mode développement

Pour faciliter votre expérience développeur, vous pouvez ouvrir le mode studio de Prisma:

```bash
# npm
npx prisma studio

# pnpm
pnpm prisma studio
```

Pour rapidement créer une base de données de développement:

```bash
# npm
npx prisma dev

# pnpm
pnpm prisma dev
```

### Linting et formattage: Biome

Ce projet utilise Biome comme linter et formatteur de code. Biome est un outil de qualité de code tout-en-un, remplaçant ESLint, Prettier, et d'autres outils similaires.

**Configuration**

La configuration de Biome est définie dans le fichier `biome.json` à la racine du projet :

- Formatage automatique avec indentation de 2 espaces
- Largeur de ligne maximale de 100 caractères
- Règles de linting recommandées pour Next.js et React
- Organisation automatique des imports
- Exclusion des dossiers `node_modules`, `.next`, `dist` et `build`

**Commandes disponibles**

```bash
# Vérifier le formatage
pnpm biome check .

# Formater automatiquement les fichiers
pnpm biome format . --write

# Lancer le linter
pnpm biome lint .

# Vérifier et corriger tous les problèmes
pnpm biome check . --write
```

**Extension VS Code**

Pour une meilleure expérience de développement, installez l'extension Biome pour VS Code. Elle permet :
- Le formatage à la sauvegarde
- La détection des erreurs en temps réel
- Des suggestions de correction automatiques

### Système d'Authentification

Le projet intègre un système d'authentification robuste basé sur les sessions JWT (JSON Web Tokens). Voici comment il fonctionne :

**Architecture du système**

- Utilise des sessions basées sur les cookies avec JWT pour une sécurité maximale
- Protection des routes sensibles via un middleware Next.js
- Gestion des sessions côté serveur avec une expiration automatique
- Stockage sécurisé des sessions dans des cookies HTTP-only

**Fonctionnalités principales**

1. **Connexion (`/auth/sign-in`)**
   - Validation des données avec des schémas typés
   - Vérification sécurisée des identifiants
   - Redirection automatique vers le tableau de bord

2. **Protection des routes**
   - Middleware automatique sur `/dashboard` et les routes protégées
   - Redirection vers la page de connexion si non authentifié
   - Validation du JWT à chaque requête

3. **Gestion des sessions**
   - Durée de session de 7 jours par défaut
   - Cookies sécurisés avec flags httpOnly et secure
   - Révocation de session lors de la déconnexion

**Utilisation dans le code**

Pour protéger une route :

```ts
// Ajoutez le chemin dans middleware.ts
export const config = {
  matcher: ["/dashboard", "/votre-route-protegee"],
};
```

Pour accéder à l'utilisateur connecté :

```ts
import { getCurrentUser } from "@/lib/actions/auth/get-current-user";

const user = await getCurrentUser();
```
