const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Fonction pour démarrer le serveur
async function startServer() {
  try {
    // Test de la connexion à la base de données
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie avec succès.');

    // Synchronisation des modèles (en développement uniquement)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅ Modèles synchronisés avec la base de données.');
    }

    // Démarrage du serveur
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
      console.log(`📍 Environnement: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 URL: http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Impossible de démarrer le serveur:', error);
    process.exit(1);
  }
}

// Gestion des signaux de fermeture
process.on('SIGTERM', async () => {
  console.log('🔄 Signal SIGTERM reçu, fermeture du serveur...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🔄 Signal SIGINT reçu, fermeture du serveur...');
  await sequelize.close();
  process.exit(0);
});

// Démarrage du serveur
startServer();
