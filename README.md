# Maison Aura — Salon de Coiffure

Site vitrine pour **Maison Aura**, salon de coiffure de luxe situé au 12 Rue du Faubourg, Paris (1er Arrondissement). Une expérience capillaire haut de gamme dans un cadre raffiné.

**[Voir le site en ligne →](https://samamuz.github.io/Maison-Aura.io/)**

---

## Fonctionnalités

- Design élégant avec palette ivoire, noir profond et bronze
- Hero section immersive avec animations
- Présentation des services (Coupe Signature, Balayage Lumière, Soin Tokyo, Coloration Végétale)
- Galerie de réalisations avec scroll horizontal
- Présentation de l'équipe
- Section témoignages clients
- Page de réservation en ligne
- Curseur personnalisé sur desktop
- Animations de révélation au scroll (Intersection Observer)
- Navigation multi-pages avec routing (Accueil, Réservation)
- Design responsive et mobile-first
- Chatbot assistant intégré (nécessite une clé API optionnelle)

## Stack technique

| Technologie | Version |
|---|---|
| Angular | 21.1 |
| TypeScript | 5.8 |
| Tailwind CSS | CDN |
| RxJS | 7.8 |

## Démarrage rapide

### Prérequis

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/Samamuz/Maison-Aura.io.git
cd Maison-Aura.io
npm install --legacy-peer-deps
```

### Développement

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`.

### Build de production

```bash
npm run build
```

Les fichiers statiques sont générés dans `dist/`.

## Structure du projet

```
├── angular.json                         # Configuration Angular CLI
├── index.html                           # Point d'entrée HTML
├── index.tsx                            # Bootstrap Angular + routing
├── tsconfig.json                        # Configuration TypeScript
├── src/
│   ├── app.component.ts                 # Composant racine
│   ├── components/
│   │   ├── features/
│   │   │   └── chat-widget.component.ts # Widget de chat assistant
│   │   ├── layout/
│   │   │   ├── footer/
│   │   │   │   └── footer.component.ts  # Pied de page
│   │   │   └── header/
│   │   │       └── header.component.ts  # En-tête / navigation
│   │   └── ui/
│   │       └── button.component.ts      # Bouton réutilisable
│   ├── data/
│   │   └── salon-data.ts                # Données du salon
│   ├── directives/
│   │   └── reveal.directive.ts          # Directive d'animation au scroll
│   ├── pages/
│   │   ├── booking/
│   │   │   └── booking.component.ts     # Page de réservation
│   │   └── home/
│   │       ├── home.component.ts        # Page d'accueil
│   │       ├── hero.component.ts        # Section hero
│   │       ├── intro.component.ts       # Section introduction
│   │       ├── services.component.ts    # Section services
│   │       ├── gallery.component.ts     # Galerie photo
│   │       ├── team.component.ts        # Section équipe
│   │       └── testimonials.component.ts # Témoignages
│   └── services/
│       └── ai.service.ts                # Service IA (optionnel)
```

## Déploiement

Déployé automatiquement sur GitHub Pages via GitHub Actions à chaque push sur `main`.

## Licence

Tous droits réservés — Maison Aura.
