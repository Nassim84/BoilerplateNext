# 🚀 Next.js Auth Boilerplate (Symfony Backend)

Boilerplate frontend sécurisé en Next.js conçu pour fonctionner avec un backend Symfony API.  
Il fournit une base propre, performante et scalable pour gérer une authentification moderne via cookie JWT HTTP-only.

---

## 🎯 Objectif

Ce projet est un boilerplate prêt à l’emploi pour :
- ✅ Login
- ✅ Register
- ✅ Logout
- ✅ Gestion de session persistante
- ✅ Protection des routes côté serveur (middleware)

Le tout avec une architecture claire, propre et sécurisée.

---

## 🧱 Stack Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- TanStack React Query
- Tailwind CSS + animations modernes
- Next Themes (dark / light)
- Framer Motion
- React Hook Form + Zod
- Styled Components
- Middleware Next.js
- JWT via cookie HTTP-only

---

## 🔐 Architecture Auth

Le frontend communique avec Symfony via API REST :

| Action                      | Endpoint Symfony       |
|-----------------------------|------------------------|
| Register                    | /api/register          |
| Login                       | /api/login_check       |
| Récupérer l'utilisateur     | /api/me                |
| Logout                      | /api/logout            |

### ✅ Sécurité appliquée

- Auth via cookie JWT HTTP-only
- Protection des routes serveur via Middleware Next
- Requête /me centralisée via React Query
- Pas de stockage sensible en localStorage
- Gestion automatique des sessions expirées

---

## 🧠 Fonctionnement global

### Fournisseurs globaux (RootLayout)

ThemeProvider  
QueryClientProvider  
AuthProvider  
Toaster (Sonner)

### Auth Context exposé

useAuth()

Fonctions disponibles :
- user
- isAuthenticated
- loading
- login(email, password)
- register(email, password)
- logout()

Une seule requête /me est utilisée pour déterminer l'état global de l'utilisateur.

---

## 🔒 Protection des routes

Routes protégées définies dans le middleware :

/profile

# Boilerplate Next.js avec Auth JWT

## /profile
Si l'utilisateur n'est **pas authentifié** → Redirection serveur instantanée vers `/login`.

---

## 📦 Installation

```bash
git clone https://github.com/TON-USER/BoilerplateNext.git
cd BoilerplateNext
npm install
```

Créer un fichier `.env.local` :
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

▶️ **Démarrer le projet**
```bash
npm run dev
```
Accès local : 👉 [http://127.0.0.1:3000](http://127.0.0.1:3000)

---

## 🧪 Scripts disponibles

| Commande         | Description          |
|------------------|----------------------|
| `npm run dev`    | Développement        |
| `npm run build`  | Build production     |
| `npm run start`  | Lancer le build      |
| `npm run lint`   | ESLint               |
| `npm run test`   | Tests Jest           |

---

## 📁 Structure du projet

```
src/
├── app/
├── components/
├── context/
│   └── AuthContext.tsx
├── services/
│   ├── apiClient.ts
│   └── authService.ts
├── middleware.ts
└── styles/
```

---

## ⚙️ Configuration Symfony attendue

Le backend Symfony doit :
- Gérer un cookie JWT sécurisé (HttpOnly)
- Autoriser CORS avec `credentials: true` et `origin` configuré
- Exposer les endpoints :
  - `POST   /api/login_check`
  - `POST   /api/register`
  - `GET    /api/me`
  - `POST   /api/logout`

---

## 🛡 Points forts du boilerplate

- Architecture clean & moderne
- Auth sécurisée sans localStorage
- Middleware de protection côté serveur
- React Query optimisé
- Structure scalable
- Prêt pour système de rôles
- Prêt pour production

---

## 🚧 Pistes d'amélioration

- Refresh Token automatique
- ACL par rôles
- Guard HOC côté client
- Dashboard admin
- Social Auth (Google / GitHub)
- Tests E2E Playwright

---

## 🧑‍💻 Auteur

Développé avec ❤️ par [Nassim Belalia](https://github.com/Nassim84)
Boilerplate conçu pour des projets sérieux, propres et évolutifs.


Si l'utilisateur n'est pas authentifié →  
Redirection serveur instantanée vers /login.
