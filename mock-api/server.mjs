import { createServer } from 'node:http';

const livres = [
  { id: 1, titre: 'Le Petit Prince', auteur: 'A. de Saint-Exupéry', genre: 'Roman', dispo: true, image: 'livre1.jpg' },
  { id: 2, titre: '1984', auteur: 'George Orwell', genre: 'Dystopie', dispo: false, image: 'livre2.jpg' },
  { id: 3, titre: 'Dune', auteur: 'Frank Herbert', genre: 'SF', dispo: true, image: 'livre3.jpg' },
  { id: 4, titre: 'Harry Potter T.1', auteur: 'J.K. Rowling', genre: 'Fantasy', dispo: true, image: 'livre4.jpg' },
  { id: 5, titre: "L'Alchimiste", auteur: 'Paulo Coelho', genre: 'Roman', dispo: false, image: 'livre5.jpg' },
  { id: 6, titre: 'Le Comte de Monte-Cristo', auteur: 'A. Dumas', genre: 'Aventure', dispo: true, image: 'livre6.jpg' },
  { id: 7, titre: 'Fahrenheit 451', auteur: 'Ray Bradbury', genre: 'Dystopie', dispo: true, image: 'livre7.jpg' },
  { id: 8, titre: 'Le Seigneur des Anneaux', auteur: 'J.R.R. Tolkien', genre: 'Fantasy', dispo: true, image: 'livre8.jpg' },
];
let prochainId = livres.length + 1;

const emails = new Set(['deja@campus.ma']);

const actualites = [
  {
    id: 1,
    titre: 'Atelier de lecture pour enfants',
    date: '2026-11-21',
    resume: 'Rejoignez-nous samedi pour notre atelier hebdomadaire.',
  },
  {
    id: 2,
    titre: 'Nouvelles acquisitions',
    date: '2026-11-10',
    resume: '450 nouveaux ouvrages sont disponibles.',
  },
  {
    id: 3,
    titre: 'Horaires de fin d’année',
    date: '2026-12-01',
    resume: 'La bibliothèque adapte ses horaires.',
  },
];

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function repondre(res, statut, donnees) {
  res.writeHead(statut, { 'Content-Type': 'application/json; charset=utf-8', ...CORS });
  res.end(donnees === undefined ? undefined : JSON.stringify(donnees));
}

function lireCorps(req) {
  return new Promise((resolve) => {
    let brut = '';
    req.on('data', (morceau) => (brut += morceau));
    req.on('end', () => resolve(brut ? JSON.parse(brut) : {}));
  });
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const [, api, ressource, id] = url.pathname.split('/'); // /api/livres/3

  if (req.method === 'OPTIONS') return repondre(res, 204);
  if (api !== 'api') return repondre(res, 404, { message: 'Introuvable' });

  if (ressource === 'livres') {
    if (req.method === 'GET' && !id) {
      const genre = url.searchParams.get('genre');
      const q = (url.searchParams.get('q') ?? '').toLowerCase();
      return repondre(
        res,
        200,
        livres.filter(
          (l) =>
            (!genre || l.genre === genre) &&
            (!q || `${l.titre} ${l.auteur}`.toLowerCase().includes(q)),
        ),
      );
    }

    if (req.method === 'POST') {
      const livre = { ...(await lireCorps(req)), id: prochainId++ };
      livres.push(livre);
      return repondre(res, 201, livre);
    }

    const livre = livres.find((l) => l.id === Number(id));
    if (!livre) return repondre(res, 404, { message: 'Livre introuvable' });

    if (req.method === 'GET') return repondre(res, 200, livre);
    if (req.method === 'PUT') {
      return repondre(res, 200, Object.assign(livre, await lireCorps(req), { id: livre.id }));
    }
    if (req.method === 'DELETE') {
      livres.splice(livres.indexOf(livre), 1);
      return repondre(res, 204);
    }
  }

  if (ressource === 'actualites' && req.method === 'GET') return repondre(res, 200, actualites);

  if (ressource === 'auth' && id === 'email-existe') {
    const email = (url.searchParams.get('email') ?? '').toLowerCase();
    return repondre(res, 200, { existe: emails.has(email) });
  }

  if (ressource === 'auth' && id === 'inscription' && req.method === 'POST') {
    const d = await lireCorps(req);
    await new Promise((r) => setTimeout(r, 800)); // latence simulée
    if (emails.has(String(d.email).toLowerCase())) {
      return repondre(res, 409, { message: 'Cet email est déjà utilisé.' });
    }
    emails.add(String(d.email).toLowerCase());
    return repondre(res, 201, { message: `Bienvenue, ${d.prenom} ${d.nom} !` });
  }

  if (ressource === 'contact' && req.method === 'POST') {
    await lireCorps(req);
    return repondre(res, 201, { message: 'Message envoyé' });
  }

  repondre(res, 404, { message: 'Route inconnue' });
}).listen(3000, () => console.log('API fictive : http://localhost:3000/api'));
