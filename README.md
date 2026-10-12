# G-INNOVA — Site web intégral, édition 2026

**Slogan officiel :** « L'innovation au rendez-vous du succès. »

G-INNOVA est présentée comme une plateforme de services innovants pour les entreprises et les particuliers, et non comme un bureau d’ingénierie. Le titre d’ingénieur polytechnicien concerne uniquement le promoteur.

Site multipage livré, autonome, en HTML/CSS/JavaScript. Aucun service payant ni étape de compilation n'est nécessaire pour le publier. Les contenus existants ont été restructurés, le logo original et les quatre photographies remises par le commanditaire ont été conservés sous forme de fichiers originaux. Le site présente les plateformes référencées par leurs URL vérifiables et les sept réalisations graphiques du ZIP initial.

## Pour découvrir le site

La méthode recommandée sur PC est d'ouvrir le dossier dans VS Code puis d'utiliser « Live Server ». Autrement, si Python est installé :

```bash
cd G-INNOVA-SITE-INTEGRAL
python -m http.server 8000
```

Ouvrez `http://localhost:8000/`. Vous pouvez également ouvrir `index.html` directement avec un navigateur pour une première visite, mais certaines fonctions de partage peuvent nécessiter HTTPS.

## Structure

- `index.html` : accueil immersif, sphère animée, valeurs, services, projets et fondateur.
- `services.html` : sept expertises détaillées.
- `projets.html` : portfolio filtrable, études de cas.
- `projet-*.html` : dix fiches projet authentiques (trois plateformes, sept créations).
- `intelligence-artificielle.html` : IA, agents et automatisation.
- `formations.html` : formation et accompagnement.
- `a-propos.html` : parcours du promoteur, galerie de quatre portraits originaux.
- `carte.html` : carte professionnelle avec QR code et contact VCF.
- `contact.html` : formulaire WhatsApp / e-mail avec validation et résumé.
- `conseils.html`, `conseil-*.html` : quatre guides originaux destinés à rendre le site plus utile et trouvable.
- `mentions-legales.html`, `confidentialite.html`, `404.html` : pages d'information.
- `assets/brand/logo.webp` : logo original non altéré.
- `assets/portraits/` : quatre nouveaux portraits originaux + anciennes photographies de l'archive.
- `assets/creations/` : les créations graphiques originales.
- `assets/meta/og-ginnova.png` : image sociale partagée.
- `assets/meta/qr-carte.png` : QR vers le domaine de production choisi.
- `assets/eugene-samuel-gwet.vcf` : contact enregistrable sur smartphone.
- `css/style.css` et `js/main.js` : style, animations, responsive et interactions.
- `tools/build_site.py` : générateur des 26 pages, métadonnées, sitemap, QR et VCF.
- `robots.txt`, `sitemap.xml` : éléments techniques SEO.
- `_redirects`, `vercel.json` : configuration de routes de compatibilité.

## Fonctionnalités développées

- Navigation desktop/mobile, menu accessible et lien pour passer au contenu.
- Animation cinématique CSS des titres, planète 3D stylisée, orbite animée, cartes flottantes, lumières, bandeau défilant, effets au survol, révélations progressives avec IntersectionObserver, déplacements liés à la souris (seulement sur appareils qui le permettent).
- Modes simplifiés quand `prefers-reduced-motion` est activé.
- Portfolio filtrable entre « web & applications » et « design graphique », sans faux projets.
- Chaque projet dispose d'une page HTML unique, de son URL canonique, d'un titre SEO, d'une description et de données structurées.
- Quatre photos originales du fondateur, sans transformation de visage ou retouche de vêtements.
- Carte digitale, fichier VCF, boutons téléphone/e-mail/WhatsApp, partage natif ou copie d'URL.
- Formulaire client avec validation navigateur, choix du domaine et préparation d'un message WhatsApp détaillé. **L'utilisateur doit confirmer l'envoi dans WhatsApp ; le site n'envoie rien automatiquement.**
- E-mail de secours par `mailto:` ; aucune donnée du formulaire n'est stockée par ce site statique.
- Images locales, contenu indexable dès le chargement (pas de rendu client obligatoire), SEO éditorial, `sitemap.xml`, `robots.txt`, Open Graph, Twitter Cards et schema.org.
- Quatre articles pratiques sur la conception web, l'automatisation, l'identité visuelle et les logiciels métier.

## IMPORTANT : à faire AVANT le lancement public

1. **Valider votre domaine définitif.** La configuration actuelle utilise `https://g-innova.vercel.app/` uniquement à titre de domaine de référence, car cette adresse a été communiquée. **Sa disponibilité et votre contrôle sur ce déploiement ne sont pas confirmés.** Elle ne doit pas être annoncée comme accessible sans test.
2. Ouvrir `tools/build_site.py`, modifier `SITE_URL`, puis exécuter `python tools/build_site.py`. Cela régénère les URL canoniques, le sitemap, le QR et le fichier VCF. Le QR scanne vers `SITE_URL/carte.html` : le vérifier sur téléphone **après publication**.
3. Vérifier les informations d'entreprise figurant dans les mentions légales et les compléter. Les numéros de registre et adresses absents n'ont pas été inventés.
4. Valider l'attribution précise des projets InesTools et Réussir Polytech. Les sources externes montrent les plateformes et les déclarations du promoteur, mais le code ni les contrats des projets n'ont été reçus.
5. Si vous contrôlez `g-innova-card.vercel.app`, configurer sa redirection permanente vers `https://VOTRE-DOMAINE/carte.html` sur **l'ancien déploiement**. Cette archive ne peut pas modifier un site qui est déjà hébergé ailleurs.
6. Publier votre dossier, puis valider les liens et le formulaire sur appareil réel. Tester les appels WhatsApp et les messageries installées.
7. Ajouter votre domaine à Google Search Console, vérifier la propriété puis soumettre `https://VOTRE-DOMAINE/sitemap.xml`.
8. Compléter votre profil entreprise Google si votre activité est admissible et vos coordonnées professionnelles peuvent être affichées. Mettre en place des liens vers le site depuis vos profils LinkedIn, Facebook et autres réseaux pertinents.

## Déploiement gratuit sur Cloudflare Pages

Le site est statique. Créez un projet Cloudflare Pages lié au dépôt GitHub contenant les fichiers. Choisissez l'intégration Git ; pour un site sans build, utilisez une configuration qui publie directement la racine du dépôt (ou un dossier contenant ces fichiers), avec une commande de build vide ou selon les exigences de l'interface, et définissez le dossier de sortie comme racine (`/`) si accepté par votre configuration. Si l'interface exige un dossier de sortie distinct, copiez les fichiers du site dans un dossier `public/` et publiez ce dossier. Vérifiez le domaine Cloudflare avant d'activer le QR de production.

## Déploiement gratuit sur Vercel

Créez un projet Vercel à partir du dépôt GitHub (type **Other / static site**, aucun framework), sans build supplémentaire. Déployez la racine du projet. Après mise en ligne, ouvrez toutes les pages importantes, en particulier `/carte.html`, `/contact.html`, `/projets.html` et `/sitemap.xml`. `vercel.json` inclut des redirections courtes pour `/carte` et `/portfolio`.

## Modifier les réalisations

Le contenu source des projets se trouve dans la liste `PORTFOLIO` au début de `tools/build_site.py`. Ajoutez une entrée authentique, déposez l'image correspondante dans `assets/creations/` si nécessaire, puis relancez `python tools/build_site.py`. Les pages individuelles et le sitemap sont reconstruits automatiquement. Les fonctionnalités ne prétendent pas fournir un **back-office multi-utilisateur sécurisé** : cela nécessiterait une authentification et une base de données/CMS externe. Ne publiez pas un pseudo-panneau administrateur accessible à tous.

## Confidentialité et analytics

Aucun script publicitaire, pixel de suivi, cookie analytics ou base de données n'a été installé. Le site charge actuellement des polices Google Fonts ; elles peuvent être remplacées par des polices auto-hébergées disposant des licences adéquates, ou par la pile de polices système si nécessaire. L'ajout futur d'analytics doit respecter les obligations de confidentialité applicables.

## Performance et qualité

Ce site est volontairement développé sans framework ni dépendance JavaScript externe afin de réduire le poids et faciliter l'hébergement gratuit. Les photos originales sont chargées progressivement en dehors de la première vue, les animations reposent majoritairement sur `transform` et `opacity`, les interactions sont natives. Les contrôles automatisés de ce dossier ont porté sur l'intégrité des fichiers, des liens locaux, les données structurées, des tailles de viewport 320/390/1440 et les fonctions de base (menu, filtres, formulaire). **Aucun score Lighthouse ni position Google n'est revendiqué** : la performance réelle doit être mesurée après déploiement, sur mobile et réseau représentatifs.

## Mentions et référence de portfolio

Les interfaces de prévisualisation de Réussir Polytech, InesTools et de la carte professionnelle sont des **compositions graphiques illustratives**, pas des captures d'écran authentiques. Les créations graphiques sont les fichiers originaux fournis.

Contact utilisé conformément au site d'origine : +237 672 356 441 · gweteugene05@gmail.com.

## Mise à jour des textes — positionnement de G-INNOVA

- Slogan officiel harmonisé dans le site, les données structurées, l'image sociale et la fiche contact : **« L'innovation au rendez-vous du succès. »**
- G-INNOVA est présentée comme une **plateforme de services innovants** destinée aux entreprises et aux particuliers.
- L'accueil met l'accent sur les besoins clients et précise les domaines d'intervention : développement web, applications et logiciels, création graphique, IA et agents intelligents, automatisation, vidéos IA et formation.
- Le titre d'**ingénieur polytechnicien** reste associé à **Eugène Samuel GWET**, fondateur et promoteur, sans qualifier la plateforme elle-même.
- Design, animations, visuels, portfolios, liens, formulaire WhatsApp et fonctionnalités techniques préservés. Seul un ajustement CSS sur petit mobile a été ajouté pour éviter de couper le nouveau grand titre.
