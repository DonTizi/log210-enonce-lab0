// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import request from 'supertest';
import app from '../../src/app';

describe('redemarrerJeu.test.ts', () => {
  it("devrait implémenter test", async () => {
    throw new Error("Ce test n'a pas été défini")
  });
});

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  beforeAll(async () => {
    // Créer deux joueurs avant les tests
    await request(app)
      .post('/api/v1/joueur')
      .send({ nom: 'Joueur1' });
    await request(app)
      .post('/api/v1/joueur')
      .send({ nom: 'Joueur2' });
  });

  it('devrait redémarrer le jeu avec succès', async () => {
    const response = await request(app)
      .get('/api/v1/jeu/redemarrerJeu')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('devrait supprimer tous les joueurs après le redémarrage', async () => {
    // Redémarrer le jeu
    await request(app).get('/api/v1/jeu/redemarrerJeu');
    
    // Vérifier qu'il n'y a plus de joueurs
    const response = await request(app)
      .get('/api/v1/joueur')
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(response.body).toHaveLength(0);
  });
});
