const sequelize = require('./connection');
const Utilisateur = require('./models/Utilisateur');
const Prestataire = require('./models/Prestataire');
const Service = require('./models/Service');
const Sponsor = require('./models/Sponsor');
const Billetterie = require('./models/Billetterie');
const Avis = require('./models/Avis');
const Don = require('./models/Don');
const MapData = require('./models/MapData');
const Point = require('./models/Point');
const Association = require('./models/Association');
const Reservation = require('./models/Reservation');
const MotDePasseUtilisateur = require('./models/MotDePasseUtilisateur');
const Notif = require('./models/Notif');
const Emplacement = require('./models/Emplacement');
const Menu = require('./models/Menu');
const Categories = require('./models/Categorie');

const bcrypt = require("bcrypt");
const fs = require('fs');
const path = require('path');


const Produit = require('./models/Produit');
const CategorieProduit = require('./models/CategorieProduit');
const Commande = require('./models/Commande');
const CommandeProduit = require('./models/CommandeProduit');
const AvisProduit = require('./models/AvisProduit');
const SuiviCommande = require('./models/SuiviCommande');
const BoutiqueStatus = require('./models/BoutiqueStatus');


const syncDatabase = async () => {
    try {
        Utilisateur.hasMany(Prestataire, { foreignKey: 'id_utilisateur', as: 'prestataires', onDelete: 'CASCADE' });
        Prestataire.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur', as: 'utilisateur', onDelete: 'CASCADE' });

        Prestataire.hasMany(Service, { foreignKey: 'id_prestataire', as: 'services', onDelete: 'CASCADE' });
        Service.belongsTo(Prestataire, { foreignKey: 'id_prestataire', as: 'prestataire', onDelete: 'CASCADE' });

        Prestataire.hasMany(Menu, { foreignKey: 'id_prestataire', as: 'menus', onDelete: 'CASCADE' });
        Menu.belongsTo(Prestataire, { foreignKey: 'id_prestataire', as: 'prestataire', onDelete: 'CASCADE' });

        Prestataire.hasMany(Avis, { foreignKey: 'id_prestataire', as: 'avis', onDelete: 'CASCADE' });
        Avis.belongsTo(Prestataire, { foreignKey: 'id_prestataire', as: 'prestataire', onDelete: 'CASCADE' });

        //boutique
        // Produit → Categorie
        CategorieProduit.hasMany(Produit, { foreignKey: 'id_categorie', as: 'produits', onDelete: 'CASCADE' });
        Produit.belongsTo(CategorieProduit, { foreignKey: 'id_categorie', as: 'categorie', onDelete: 'CASCADE' });

        // Produit → Prestataire
        Prestataire.hasMany(Produit, { foreignKey: 'id_prestataire', as: 'produits', onDelete: 'CASCADE' });
        Produit.belongsTo(Prestataire, { foreignKey: 'id_prestataire', as: 'prestataire', onDelete: 'CASCADE' });

        // AvisProduit → Produit + Utilisateur
        Produit.hasMany(AvisProduit, { foreignKey: 'id_produit', as: 'avis_produits', onDelete: 'CASCADE' });
        AvisProduit.belongsTo(Produit, { foreignKey: 'id_produit', as: 'produit', onDelete: 'CASCADE' });

        Utilisateur.hasMany(AvisProduit, { foreignKey: 'id_utilisateur', as: 'avis_utilisateur', onDelete: 'CASCADE' });
        AvisProduit.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur', as: 'utilisateur', onDelete: 'CASCADE' });

        // Commande → Utilisateur
        Utilisateur.hasMany(Commande, { foreignKey: 'id_utilisateur', as: 'commandes', onDelete: 'CASCADE' });
        Commande.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur', as: 'utilisateur', onDelete: 'CASCADE' });

        // CommandeProduit → Commande + Produit
        Commande.hasMany(CommandeProduit, { foreignKey: 'id_commande', as: 'articles', onDelete: 'CASCADE' });
        CommandeProduit.belongsTo(Commande, { foreignKey: 'id_commande', as: 'commande', onDelete: 'CASCADE' });

        Produit.hasMany(CommandeProduit, { foreignKey: 'id_produit', as: 'commandes', onDelete: 'CASCADE' });
        CommandeProduit.belongsTo(Produit, { foreignKey: 'id_produit', as: 'produit', onDelete: 'CASCADE' });

        // SuiviCommande → Commande
        Commande.hasMany(SuiviCommande, { foreignKey: 'id_commande', as: 'suivi', onDelete: 'CASCADE' });
        SuiviCommande.belongsTo(Commande, { foreignKey: 'id_commande', as: 'commande', onDelete: 'CASCADE' });

        // BoutiqueStatus → Prestataire
        Prestataire.hasOne(BoutiqueStatus, { foreignKey: 'id_prestataire', as: 'status', onDelete: 'CASCADE' });
        BoutiqueStatus.belongsTo(Prestataire, { foreignKey: 'id_prestataire', as: 'prestataire', onDelete: 'CASCADE' });


        Categories.hasMany(Prestataire, { foreignKey: 'id_categorie', as: 'prestataires', onDelete: 'CASCADE' });
        Prestataire.belongsTo(Categories, { foreignKey: 'id_categorie', as: 'relationCategorie', onDelete: 'CASCADE' });

        Prestataire.hasMany(Reservation, { foreignKey: 'id_prestataire', as: 'reservations', onDelete: 'CASCADE' });
        Reservation.belongsTo(Prestataire, { foreignKey: 'id_prestataire', as: 'prestataire', onDelete: 'CASCADE' });

        await sequelize.sync({ force: true });

        // Insertion des utilisateurs
        await Utilisateur.bulkCreate([
            { nom_utilisateur: 'Alice Dupont', email_utilisateur: 'alice.dupont@example.com', mot_de_passe: bcrypt.hashSync('user', bcrypt.genSaltSync(8), null), adresse_utilisateur: '123 rue de Paris, 75001 Paris, France', telephone: '0123456789', date_inscription: '2024-01-01T00:00:00.000Z', role: 'utilisateur' },
            { nom_utilisateur: 'Bob Martin', email_utilisateur: 'bob.martin@example.com', mot_de_passe:  bcrypt.hashSync('user', bcrypt.genSaltSync(8), null), adresse_utilisateur: '456 avenue de Lyon, 69001 Lyon, France', telephone: '0987654321', date_inscription: '2024-01-05T00:00:00.000Z', role: 'prestataire' },
            { nom_utilisateur: 'Carole Durand', email_utilisateur: 'carole.durand@example.com', mot_de_passe:  bcrypt.hashSync('admin', bcrypt.genSaltSync(8), null), adresse_utilisateur: '789 boulevard de Marseille, 13001 Marseille, France', telephone: '0147258390', date_inscription: '2024-02-10T00:00:00.000Z', role: 'admin' },
            { nom_utilisateur: 'David Lefevre', email_utilisateur: 'david.lefevre@example.com', mot_de_passe:  bcrypt.hashSync('user', bcrypt.genSaltSync(8), null), adresse_utilisateur: '321 rue de Lille, 59800 Lille, France', telephone: '0758392045', date_inscription: '2024-03-15T00:00:00.000Z', role: 'utilisateur' },
            { nom_utilisateur: 'Emma Leroy', email_utilisateur: 'emma.leroy@example.com', mot_de_passe:  bcrypt.hashSync('user', bcrypt.genSaltSync(8), null), adresse_utilisateur: '654 avenue de Nice, 06000 Nice, France', telephone: '0612345678', date_inscription: '2024-04-20T00:00:00.000Z', role: 'prestataire' },
            { nom_utilisateur: 'Marc Bernard', email_utilisateur: 'marc.bernard@example.com', mot_de_passe:  bcrypt.hashSync('user', bcrypt.genSaltSync(8), null), adresse_utilisateur: '123 avenue Bordeaux, 33000 Bordeaux, France', telephone: '0600000001', date_inscription: '2024-06-01T00:00:00.000Z', role: 'prestataire' },
            { nom_utilisateur: 'Julie Vignon', email_utilisateur: 'julie.vignon@example.com', mot_de_passe:  bcrypt.hashSync('user', bcrypt.genSaltSync(8), null), adresse_utilisateur: '123 rue Strasbourg, 67000 Strasbourg, France', telephone: '0600000002', date_inscription: '2024-06-01T00:00:00.000Z', role: 'prestataire' },
            { nom_utilisateur: 'Thomas Girard', email_utilisateur: 'thomas.girard@example.com', mot_de_passe:  bcrypt.hashSync('user', bcrypt.genSaltSync(8), null), adresse_utilisateur: '123 rue Rouen, 76000 Rouen, France', telephone: '0600000003', date_inscription: '2024-06-01T00:00:00.000Z', role: 'prestataire' },
            { nom_utilisateur: 'Sophie Marchand', email_utilisateur: 'sophie.marchand@example.com', mot_de_passe:  bcrypt.hashSync('user', bcrypt.genSaltSync(8), null), adresse_utilisateur: '123 rue Reims, 51100 Reims, France', telephone: '0600000004', date_inscription: '2024-06-01T00:00:00.000Z', role: 'prestataire' },
            { nom_utilisateur: 'Paul Dubois', email_utilisateur: 'paul.dubois@example.com', mot_de_passe:  bcrypt.hashSync('user', bcrypt.genSaltSync(8), null), adresse_utilisateur: '321 avenue Nancy, 54000 Nancy, France', telephone: '0600000005', date_inscription: '2024-06-02T00:00:00.000Z', role: 'prestataire' },
            { nom_utilisateur: 'Claire Fontaine', email_utilisateur: 'claire.fontaine@example.com', mot_de_passe:  bcrypt.hashSync('user', bcrypt.genSaltSync(8), null), adresse_utilisateur: '654 avenue Metz, 57000 Metz, France', telephone: '0600000006', date_inscription: '2024-06-03T00:00:00.000Z', role: 'prestataire' }
        ]);
        await Emplacement.bulkCreate([
            { id: 1, coordinates: [47.6862,6.8071], icon: 'evenement' },
            { id: 2, coordinates: [47.6865, 6.8085], icon: 'restaurant' },
            { id: 3, coordinates: [47.6861, 6.8089], icon: 'evenement' },
            { id: 4, coordinates: [47.6854, 6.8079], icon: 'stand' },
            { id: 5, coordinates: [47.6867, 6.8077], icon: 'restaurant' },
            { id: 6, coordinates: [47.6863, 6.8079], icon: 'restaurant' },
            { id: 7, coordinates: [47.6867, 6.8080], icon: 'peinture' },
            { id: 8, coordinates: [47.6860, 6.8077], icon: 'pedalo' }
        ]);

        await Categories.bulkCreate([
            { id: 1, nom: 'Activité' },
            { id: 2, nom: 'Gastronomie' },
            { id: 3, nom: 'Mascotte' },
            { id: 4, nom: 'Événement'}
        ])

        // Insertion des prestataires
        await Prestataire.bulkCreate([
            {nom: 'Jeux et Divertissements', description: "Espace dédié aux jeux pour enfants et adultes avec diverses animations, telles que des ateliers créatifs, des jeux de société géants, et des parcours d'obstacles pour toute la famille. C'est l'endroit idéal pour se détendre et s'amuser, que vous soyez enfant ou adulte.", description_accueil: 'Jeux et animations pour tous.', id_categorie: 1, id_emplacement: 1, id_evenement: 1, page_route: '/prestataire/1', image: convertImageToBase64('test/ImagesPrestataires/jeu_divertissement.jpg'), accepted: true,  id_utilisateur: 2 },
            {nom: 'Restaurant Le Gourmet', description: "Restaurant proposant une variété de plats traditionnels et internationaux, mettant en avant des ingrédients locaux et de saison. Profitez d'un menu diversifié avec des options pour tous les goûts, y compris des plats végétariens, végétaliens, et sans gluten. Le cadre chaleureux et accueillant rend chaque repas une expérience mémorable.", description_accueil: 'Cuisine variée et ingrédients locaux.', id_categorie: 2, id_emplacement: 2, id_evenement: 1, page_route: '/prestataire/2', image: convertImageToBase64('test/ImagesPrestataires/restaurant.jpg'), accepted: true, id_utilisateur: 5 },
            {nom: 'Mascotte Festival', description: "Notre mascotte officielle anime le festival et pose pour des photos avec les visiteurs. En plus de cela, la mascotte participe à des parades et des spectacles tout au long de l'événement, apportant de la joie et de l'énergie aux petits et grands. Ne manquez pas les séances de dédicaces et les moments de partage avec notre mascotte emblématique.", description_accueil: 'Animations et photos avec la mascotte.', id_categorie: 3, id_emplacement: 3, id_evenement: 1, page_route: '/prestataire/3', image: convertImageToBase64('test/ImagesPrestataires/mascotte.jpg'), accepted: true, id_utilisateur: 6 },
            {nom: 'Stand Artisanat Local', description: "Découvrez et achetez des produits artisanaux locaux fabriqués par nos prestataires. Le stand propose une variété d'articles allant des bijoux faits main aux objets en céramique, en passant par des peintures et des œuvres d'art uniques. Participez à des ateliers de création pour apprendre les techniques artisanales et repartez avec vos propres créations.", description_accueil: 'Produits artisanaux uniques.', id_categorie: 1, id_emplacement: 4, id_evenement: 1, page_route: '/prestataire/4', image: convertImageToBase64('test/ImagesPrestataires/stand.jpg'), accepted: true, id_utilisateur: 7 },
            {nom: 'Dégustation de Canard', description: "Venez déguster une variété de plats à base de canard, préparés par des chefs renommés. Découvrez des recettes traditionnelles et innovantes, toutes mettant en vedette le canard sous ses meilleures formes.", description_accueil: 'Dégustation de plats à base de canard.', id_categorie: 3, id_emplacement: 5, id_evenement: 1, page_route: '/prestataire/5', image: convertImageToBase64('test/ImagesPrestataires/degustation_canard.jpg'), accepted: true, id_utilisateur: 8 },
            {nom: 'Concours de Cuisine', description: "Participez ou assistez à un concours de cuisine où des chefs amateurs et professionnels se défient pour créer le meilleur plat à base de canard. Un jury de renom évaluera les créations et décernera des prix aux meilleurs chefs.", description_accueil: 'Concours de cuisine autour du canard.', id_categorie: 4, id_emplacement: 6, id_evenement: 1, page_route: '/prestataire/6', image: convertImageToBase64('test/ImagesPrestataires/concours_cuisine_canard.jpg'), accepted: true, id_utilisateur: 9 },
            {nom: 'Atelier Peinture', description: "Découvrez l'art de la peinture sur canard. Participez à cet atelier unique où des artistes locaux vous montreront comment créer des œuvres d'art étonnantes en utilisant des canards comme toile.", description_accueil: 'Atelier de peinture sur canard.', id_categorie: 1, id_emplacement: 7, id_evenement: 1, page_route: '/prestataire/7', image: convertImageToBase64('test/ImagesPrestataires/atelier_peinture_canard.jpg'), accepted: true, id_utilisateur: 10 },
            {nom: "Ped'ailo!", description: "Avec Ped'ailo, prenez vos ailes et flottez comme un canard sur les étangs du Malsaucy en famille, entre amis ou en canard solitaire !", description_accueil: 'Stand de pédalo sur les étangs', id_categorie: 1, id_emplacement: 8, id_evenement: 1, page_route: '/prestataire/8', image: convertImageToBase64('test/ImagesPrestataires/pedalo_canard.jpg'), accepted: true, id_utilisateur: 11 }
        ]);

        await Menu.bulkCreate([
            // Plats
            { nom: 'Confit de canard', type:"Plats" , description: 'Confit de canard avec pommes de terre sautées.', prix: 18, image: 'confit_canard.jpg', categorie: 'plats', id_prestataire: 2 },
            { nom: 'Magret de canard', type:"Plats" , description: 'Magret de canard avec sauce au miel.', prix: 22, image: 'magret_canard.jpg', categorie: 'plats', id_prestataire: 2 },
            { nom: 'Cuisse de canard à l\'orange', type:"Plats" , description: 'Une cuisse de canard tendre servie avec une sauce à l\'orange.', prix: 20, image: 'cuisse_canard_orange.jpg', categorie: 'plats', id_prestataire: 2 },
            { nom: 'Poulet rôti', type:"Plats" , description: 'Poulet rôti aux herbes de Provence.', prix: 15, image: 'poulet_roti.jpg', categorie: 'plats', id_prestataire: 2 },
            { nom: 'Steak frites', type:"Plats" , description: 'Steak de bœuf grillé accompagné de frites maison.', prix: 17, image: 'steak_frites.jpg', categorie: 'plats', id_prestataire: 2 },

            // Boissons
            { nom: 'Eau plate', type:"Boissons" , description: 'Bouteille de 50 cl.', prix: 2, image: 'eau_plate.jpg', categorie: 'boissons', id_prestataire: 2 },
            { nom: 'Eau pétillante', type:"Boissons" , description: 'Bouteille de 50 cl.', prix: 2.5, image: 'eau_petillante.jpg', categorie: 'boissons', id_prestataire: 2 },
            { nom: 'Coca-Cola', type:"Boissons" , description: 'Canette de 33 cl.', prix: 3, image: 'coca_cola.jpg', categorie: 'boissons', id_prestataire: 2 },

            // Desserts
            { nom: 'Tarte aux pommes', type:"Desserts" , description: 'Tarte maison avec des pommes caramélisées.', prix: 6, image: 'tarte_pommes.jpg', categorie: 'desserts', id_prestataire: 2 },
            { nom: 'Mousse au chocolat', type:"Desserts" , description: 'Délicieuse mousse au chocolat noir.', prix: 5, image: 'mousse_chocolat.jpg', categorie: 'desserts', id_prestataire: 2 },
            { nom: 'Crème brûlée', type:"Desserts" , description: 'Crème vanille avec une croûte caramélisée.', prix: 6, image: 'creme_brulee.jpg', categorie: 'desserts', id_prestataire: 2 },
            { nom: 'Fondant au chocolat', type:"Desserts" , description: 'Fondant avec un cœur coulant au chocolat.', prix: 7, image: 'fondant_chocolat.jpg', categorie: 'desserts', id_prestataire: 2 },
            { nom: 'Coupe glacée', type:"Desserts" , description: 'Deux boules de glace avec des fruits frais.', prix: 5, image: 'coupe_glacee.jpg', categorie: 'desserts', id_prestataire: 2 },

            // Menus Enfants
            { nom: 'Nuggets de poulet', type:"Menus Enfants" ,description: '5 nuggets avec frites et jus d\'orange.', prix: 8, image: 'nuggets_poulet.jpg', categorie: 'menusEnfants', id_prestataire: 2 },
            { nom: 'Mini burger', type:"Menus Enfants" , description: 'Petit burger avec steak haché et frites.', prix: 9, image: 'mini_burger.jpg', categorie: 'menusEnfants', id_prestataire: 2 },
            { nom: 'Pâtes à la bolognaise', type:"Menus Enfants" , description: 'Assiette de pâtes avec sauce tomate et viande hachée.', prix: 7, image: 'pates_bolognaise.jpg', categorie: 'menusEnfants', id_prestataire: 2 }
          ]);


        await Service.bulkCreate([
            { nom_service: 'service1', description_service: 'description', lien_service: 'lien_service1', statut_service: true, id_prestataire: 1 },
            { nom_service: 'service1', description_service: 'description', lien_service: 'lien_service1', statut_service: true, id_prestataire: 2 },
            { nom_service: 'service1', description_service: 'description', lien_service: 'lien_service1', statut_service: true, id_prestataire: 3 },
            { nom_service: 'service1', description_service: 'description', lien_service: 'lien_service1', statut_service: true, id_prestataire: 4 },
            { nom_service: 'service1', description_service: 'description', lien_service: 'lien_service1', statut_service: true, id_prestataire: 5 },
            { nom_service: 'service1', description_service: 'description', lien_service: 'lien_service1', statut_service: true, id_prestataire: 6 },
            { nom_service: 'service1', description_service: 'description', lien_service: 'lien_service1', statut_service: true, id_prestataire: 7 },
            { nom_service: 'service1', description_service: 'description', lien_service: 'lien_service1', statut_service: true, id_prestataire: 8 }
        ]);

        await Sponsor.bulkCreate([
            {nom_sponsor: 'BirdLife International', description_accueil: 'Soutenir la protection des cannes sauvages...', description: 'BirdLife International est un leader mondial...', image:  convertImageToBase64("test/ImagesPrestataires/logo.png") },
            {nom_sponsor: 'Wild Ducks Conservation', description_accueil: 'Engagés pour un environnement sûr...', description: "Wild Ducks Conservation s'efforce de créer...", image:  convertImageToBase64("test/ImagesPrestataires/logo.png") },
            {nom_sponsor: 'Natural Habitat Safaris', description_accueil: 'Offrir des expériences écoresponsables...', description: 'Natural Habitat Safaris propose des voyages...', image:  convertImageToBase64("test/ImagesPrestataires/logo.png")},
            {nom_sponsor: 'Fondation des Marais Sauvages', description_accueil: 'Protège les habitats naturels des ansériformes.', description: 'La Fondation des Marais Sauvages est dédiée...', image:  convertImageToBase64("test/ImagesPrestataires/logo.png") },
            {nom_sponsor: 'Éco Nature Environnement', description_accueil: 'Un partenaire clé pour la sensibilisation...', description: 'Éco Nature Environnement organise des campagnes...', image:  convertImageToBase64("test/ImagesPrestataires/logo.png")}
        ]);
        await Avis.bulkCreate([
            { id_prestataire: 1, id_utilisateur: 1, texte: 'Je me suis trop méga amusée omg omg wouhouuu !!', note: 5 },
            { id_prestataire: 1, id_utilisateur: 2, texte: "C'était trop bien, mais j'ai marché sur un caca de chien. Où sont les nettoyeurs ?", note: 4 }
        ]);

        await Don.bulkCreate([
            { id_utilisateur: 2, id_prestataire: 2, message: 'Merci pour votre soutien!', montant: 300, date: '2024-11-15' }
        ]);

        await MapData.bulkCreate([
            { id: 1, name: 'emplacement1', fill_color: 'cyan', stroke_color: 'red', stroke_width: '2', opacity: '0' },
            { id: 2, name: 'emplacement2', fill_color: 'green', stroke_color: 'red', stroke_width: '2', opacity: '0' },
            { id: 3, name: 'emplacement3', fill_color: 'blue', stroke_color: 'red', stroke_width: '2', opacity: '0' }
        ]);

        await Point.bulkCreate([
            { map_id: 1, x_coord: '150', y_coord: '80' },
            { map_id: 1, x_coord: '175', y_coord: '115' },
            { map_id: 1, x_coord: '200', y_coord: '80' },
            { map_id: 2, x_coord: '180', y_coord: '50' },
            { map_id: 2, x_coord: '210', y_coord: '80' },
            { map_id: 3, x_coord: '240', y_coord: '100' },
            { map_id: 3, x_coord: '260', y_coord: '120' }
        ]);
        await Reservation.bulkCreate([
            { id_prestataire: 2, date: '2025-09-01', heure: '12:00', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-01', heure: '12:30', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-01', heure: '13:00', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-01', heure: '13:30', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-01', heure: '19:00', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-01', heure: '19:30', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-01', heure: '20:00', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-02', heure: '12:00', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-02', heure: '13:00', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-02', heure: '14:00', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-02', heure: '19:00', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-02', heure: '19:30', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-02', heure: '20:00', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-02', heure: '20:30', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-03', heure: '12:30', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-03', heure: '13:00', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-03', heure: '14:30', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-03', heure: '19:00', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-03', heure: '19:30', type_service: 'restaurant' },
            { id_prestataire: 2, date: '2025-09-03', heure: '21:00', type_service: 'restaurant' },
            { id_prestataire: 8, date: '2025-09-01', heure: '08:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-01', heure: '08:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-01', heure: '09:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-01', heure: '09:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-01', heure: '10:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-01', heure: '10:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-01', heure: '11:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-01', heure: '12:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-01', heure: '13:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-01', heure: '14:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-01', heure: '14:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-01', heure: '15:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-01', heure: '15:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-01', heure: '16:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-01', heure: '16:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '08:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '08:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '09:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '09:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '10:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '10:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '11:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '12:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '13:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '14:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '14:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '15:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '15:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '16:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-02', heure: '16:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '08:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '08:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '09:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '09:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '10:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '10:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '11:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '12:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '13:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '14:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '14:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '15:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '15:30', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '16:00', type_service: 'balade' },
            { id_prestataire: 8, date: '2025-09-03', heure: '16:30', type_service: 'balade' }
        ]);

       await Association.bulkCreate(  [
            {
                id_association: "1",
                nom_association: "Les Canards Ailés",
                description_accueil: "Bienvenue à notre club passionné par l'aventure et la découverte.",
                description: "Nous organisons des activités en plein air pour amateurs de nature et d'aventure, telles que des randonnées, des excursions en canoë et bien plus.",
                image: convertImageToBase64("test/ImagesPrestataires/logo.png"),
            },
            {
                id_association: "2",
                nom_association: "La Plume Solidaire",
                description_accueil: "Rejoignez-nous pour écrire un monde meilleur.",
                description: "Association dédiée à l'aide humanitaire à travers des ateliers d'écriture et de sensibilisation dans les écoles et les quartiers.",
                image:  convertImageToBase64("test/ImagesPrestataires/logo.png"),
            },
            {
                id_association: "3",
                nom_association: "L'Étang des Canards",
                description_accueil: "Un havre de paix pour les amoureux des canards.",
                description: "Cette association se consacre à la préservation des canards et de leurs habitats naturels à travers des actions locales et des ateliers pédagogiques.",
                image: convertImageToBase64("test/ImagesPrestataires/logo.png"),
            },
        ]);

        const categories = await CategorieProduit.bulkCreate([
            { nom: 'accessoire_et_lifestyle' },
            { nom: 'aliments' },
            { nom: 'objet_cinema_tech' },
            { nom: 'papeterie_collection' },
            { nom: 'premium' },
            { nom: 'textiles_et_modes' }
        ], { returning: true });

        const categoriesMap = {};
        categories.forEach(c => categoriesMap[c.nom] = c.id);

        await Produit.bulkCreate(goodies.map(g => ({
            nom: g.nom,
            description: g.description,
            prix: g.prix,
            tailles: Array.isArray(g.tailles) ? g.tailles : [],
            couleurs: Array.isArray(g.couleurs) ? g.couleurs : [],
            stock: g.stock,
            image: convertImageToBase64(`test/Boutique/${g.categorie}/${g.image}`),
            pays_fabrication: g.pays_fabrication,
            composition: g.composition,
            temps_livraison: g.temps_livraison,
            id_categorie: categoriesMap[g.categorie] || null,
        })));





        console.log('Database & tables created!');

    } catch (error) {
        console.error('Error creating database & tables:', error);
    }
};

function convertImageToBase64(imagePath) {
    try {
        const imageBuffer = fs.readFileSync(imagePath); // Lire l'image
        return `data:image/${path.extname(imagePath).slice(1)};base64,${imageBuffer.toString('base64')}`;
    } catch (error) {
        console.error("Erreur lors de la conversion en base64 :", error);
        return null;
    }
}

let goodies = [
    {
        id: 1,
        nom: "Badge Festival",
        description: "Badge officiel du festival, idéal pour afficher votre passion.",
        prix: 2,
        tailles: ["Unique"],
        couleurs: ["Jaune"],
        couleur_image: "jaune.png",
        stock: 100,
        image: "badge.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "France",
        composition: "Plastique recyclé, impression UV",
        temps_livraison: "3 à 5 jours ouvrés",
        avis: []
    },
    {
        id: 2,
        nom: "Badge Duo",
        description: "Set de 2 badges en édition limitée, parfait pour les collectionneurs.",
        prix: 4,
        tailles: ["Unique"],
        couleurs: ["Multicolore"],
        couleur_image: "multicolore.png",
        stock: 50,
        image: "badge1.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Italie",
        composition: "Métal léger, revêtement anti-rayures",
        temps_livraison: "5 à 7 jours ouvrés",
        avis: []
    },
    {
        id: 3,
        nom: "Badge Trio",
        description: "Set de 3 badges exclusifs, un incontournable pour les fans du festival.",
        prix: 6,
        tailles: ["Unique"],
        couleurs: ["Multicolore"],
        couleur_image: "multicolore.png",
        stock: 30,
        image: "badge2.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Espagne",
        composition: "Aluminium, finition brillante",
        temps_livraison: "6 à 8 jours ouvrés",
        avis: []
    },
    {
        id: 4,
        nom: "Coque Téléphone",
        description: "Coque design avec motif de canard, robuste et tendance.",
        prix: 12,
        tailles: ["iPhone", "Samsung"],
        couleurs: ["Jaune", "Noir"],
        couleur_image: { "Jaune": "coque_jaune.png", "Noir": "coque_noir.png" },
        stock: 80,
        image: "coque.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Allemagne",
        composition: "Silicone souple, protection renforcée",
        temps_livraison: "3 à 6 jours ouvrés",
        avis: []
    },
    {
        id: 5,
        nom: "Coque Téléphone Fun",
        description: "Coque fantaisie avec design unique et finition brillante.",
        prix: 14,
        tailles: ["iPhone"],
        couleurs: ["Vert", "Bleu"],
        couleur_image: { "Vert": "coque_vert.png", "Bleu": "coque_bleu.png" },
        stock: 50,
        image: "coque1.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Chine",
        composition: "Plastique rigide, impression HD",
        temps_livraison: "4 à 6 jours ouvrés",
        avis: []
    },
    {
        id: 6,
        nom: "Coque Premium",
        description: "Coque premium avec un style épuré et une protection optimale.",
        prix: 16,
        tailles: ["Samsung"],
        couleurs: ["Blanc", "Gris"],
        couleur_image: { "Blanc": "coque_blanc.png", "Gris": "coque_gris.png" },
        stock: 40,
        image: "coque2.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Japon",
        composition: "Polymère résistant aux chocs",
        temps_livraison: "5 à 7 jours ouvrés",
        avis: []
    },
    {
        id: 7,
        nom: "Coque Luxe",
        description: "Coque de luxe avec détails dorés et finitions haut de gamme.",
        prix: 20,
        tailles: ["iPhone", "Samsung"],
        couleurs: ["Or", "Noir"],
        couleur_image: { "Or": "coque_or.png", "Noir": "coque_noir.png" },
        stock: 30,
        image: "coque3.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Italie",
        composition: "Aluminium brossé, dorure 24 carats",
        temps_livraison: "Livraison express sous 48h",
        avis: []
    },
    {
        id: 8,
        nom: "Coque Édition Limitée",
        description: "Coque rare pour les amateurs de design et d’originalité.",
        prix: 22,
        tailles: ["iPhone"],
        couleurs: ["Rouge", "Bleu"],
        couleur_image: { "Rouge": "coque_rouge.png", "Bleu": "coque_bleu.png" },
        stock: 20,
        image: "coque4.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "USA",
        composition: "Plastique renforcé, protection antichoc",
        temps_livraison: "4 à 7 jours ouvrés",
        avis: []
    },
    {
        id: 9,
        nom: "Gourde Canard",
        description: "Gourde écologique avec motif canard, parfaite pour les déplacements.",
        prix: 15,
        tailles: ["500ml", "1L"],
        couleurs: ["Jaune"],
        couleur_image: "jaune.png",
        stock: 70,
        image: "gourde.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Portugal",
        composition: "Acier inoxydable, sans BPA",
        temps_livraison: "5 jours ouvrés",
        avis: []
    },
    {
        id: 10,
        nom: "Lunettes Jaunes",
        description: "Lunettes amusantes en forme de canard, un accessoire fun pour tous.",
        prix: 8,
        tailles: ["Unique"],
        couleurs: ["Jaune"],
        couleur_image: "jaune.png",
        stock: 90,
        image: "lunettes.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Chine",
        composition: "Plastique renforcé, verres UV400",
        temps_livraison: "6 à 9 jours ouvrés",
        avis: []
    },
    {
        id: 11,
        nom: "Lunettes Festives",
        description: "Lunettes fantaisie colorées, parfaites pour les festivaliers.",
        prix: 10,
        tailles: ["Unique"],
        couleurs: ["Multicolore"],
        couleur_image: "multicolore.png",
        stock: 60,
        image: "lunettes1.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "France",
        composition: "Plastique résistant, verres teintés",
        temps_livraison: "4 à 6 jours ouvrés",
        avis: []
    },
    {
        id: 12,
        nom: "Lunettes Édition Limitée",
        description: "Lunettes stylées, idéales pour les soirées du festival.",
        prix: 12,
        tailles: ["Unique"],
        couleurs: ["Bleu", "Vert"],
        couleur_image: { "Bleu": "lunettes_bleu.png", "Vert": "lunettes_vert.png" },
        stock: 50,
        image: "lunettes2.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Italie",
        composition: "Plastique léger, protection UV400",
        temps_livraison: "3 à 5 jours ouvrés",
        avis: []
    },
    {
        id: 13,
        nom: "Mug Festival",
        description: "Mug officiel du festival avec un design emblématique.",
        prix: 10,
        tailles: ["Standard"],
        couleurs: ["Blanc", "Jaune"],
        couleur_image: { "Blanc": "mug_blanc.png", "Jaune": "mug_jaune.png" },
        stock: 60,
        image: "mugs.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Portugal",
        composition: "Céramique de qualité, impression résistante",
        temps_livraison: "5 à 7 jours ouvrés",
        avis: []
    },
    {
        id: 14,
        nom: "Mug Collector",
        description: "Mug exclusif pour les collectionneurs et amateurs du festival.",
        prix: 12,
        tailles: ["Standard"],
        couleurs: ["Noir", "Rouge"],
        couleur_image: { "Noir": "mug_noir.png", "Rouge": "mug_rouge.png" },
        stock: 40,
        image: "mugs1.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Espagne",
        composition: "Porcelaine premium, finition mate",
        temps_livraison: "4 à 6 jours ouvrés",
        avis: []
    },
    {
        id: 15,
        nom: "Mug Édition Limitée",
        description: "Mug rare en série limitée avec un design unique.",
        prix: 15,
        tailles: ["Standard"],
        couleurs: ["Bleu", "Vert"],
        couleur_image: { "Bleu": "mug_bleu.png", "Vert": "mug_vert.png" },
        stock: 30,
        image: "mugs2.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Allemagne",
        composition: "Céramique robuste, résistant aux rayures",
        temps_livraison: "5 à 8 jours ouvrés",
        avis: []
    },
    {
        id: 16,
        nom: "Parapluie Festival",
        description: "Parapluie avec motif canard, indispensable pour les jours de pluie.",
        prix: 18,
        tailles: ["Unique"],
        couleurs: ["Jaune", "Bleu"],
        couleur_image: { "Jaune": "parapluie_jaune.png", "Bleu": "parapluie_bleu.png" },
        stock: 40,
        image: "parapluie.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Chine",
        composition: "Toile imperméable, manche en bois",
        temps_livraison: "7 à 10 jours ouvrés",
        avis: []
    },
    {
        id: 17,
        nom: "Parapluie Compact",
        description: "Parapluie compact, léger et facile à transporter.",
        prix: 20,
        tailles: ["Unique"],
        couleurs: ["Noir", "Rouge"],
        couleur_image: { "Noir": "parapluie_noir.png", "Rouge": "parapluie_rouge.png" },
        stock: 30,
        image: "parapluie1.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Japon",
        composition: "Tissu anti-vent, ouverture automatique",
        temps_livraison: "5 à 7 jours ouvrés",
        avis: []
    },
    {
        id: 18,
        nom: "Parapluie Luxe",
        description: "Parapluie élégant, conçu pour les passionnés du festival.",
        prix: 25,
        tailles: ["Unique"],
        couleurs: ["Vert", "Multicolore"],
        couleur_image: { "Vert": "parapluie_vert.png", "Multicolore": "parapluie_multicolore.png" },
        stock: 20,
        image: "parapluie2.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "France",
        composition: "Matériaux premium, poignée ergonomique",
        temps_livraison: "Livraison express sous 48h",
        avis: []
    },
    {
        id: 19,
        nom: "Porte-clé Canard",
        description: "Porte-clé mignon en forme de canard, idéal pour personnaliser vos clés.",
        prix: 5,
        tailles: ["Unique"],
        couleurs: ["Jaune"],
        couleur_image: "jaune.png",
        stock: 100,
        image: "porte-cle.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "France",
        composition: "Plastique résistant, attache en métal",
        temps_livraison: "3 à 5 jours ouvrés",
        avis: []
    },
    {
        id: 20,
        nom: "Porte-clé Collector",
        description: "Porte-clé spécial festival, un must-have pour les fans.",
        prix: 6,
        tailles: ["Unique"],
        couleurs: ["Blanc", "Noir"],
        couleur_image: { "Blanc": "porte-cle_blanc.png", "Noir": "porte-cle_noir.png" },
        stock: 80,
        image: "porte-cle1.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Italie",
        composition: "Métal chromé, finition brillante",
        temps_livraison: "4 à 6 jours ouvrés",
        avis: []
    },
    {
        id: 21,
        nom: "Porte-clé Luxe",
        description: "Porte-clé en édition limitée avec logo du festival gravé.",
        prix: 8,
        tailles: ["Unique"],
        couleurs: ["Or", "Argent"],
        couleur_image: { "Or": "porte-cle_or.png", "Argent": "porte-cle_argent.png" },
        stock: 50,
        image: "porte-cle2.jpg",
        categorie: "accessoire_et_lifestyle",
        pays_fabrication: "Suisse",
        composition: "Acier inoxydable, finition dorée",
        temps_livraison: "5 à 7 jours ouvrés",
        avis: []
    },

    // Aliments
    {
        id: 22,
        nom: "Biscuits Festival",
        description: "Biscuits décorés aux couleurs du festival, un délice sucré.",
        prix: 5,
        tailles: ["Pack de 10"],
        couleurs: ["Doré"],
        couleur_image: "dore.png",
        stock: 60,
        image: "biscuits.jpg",
        categorie: "aliments",
        pays_fabrication: "France",
        composition: "Farine bio, sucre, beurre",
        temps_livraison: "3 à 5 jours ouvrés",
        avis: []
    },
    {
        id: 23,
        nom: "Chocolats Festival",
        description: "Chocolats artisanaux avec un design inspiré du cinéma.",
        prix: 7,
        tailles: ["Boîte de 6"],
        couleurs: ["Marron"],
        couleur_image: "marron.png",
        stock: 50,
        image: "chocolats.jpg",
        categorie: "aliments",
        pays_fabrication: "Belgique",
        composition: "Chocolat noir 70%, praliné noisette",
        temps_livraison: "4 à 6 jours ouvrés",
        avis: []
    },

    // Objet Cinéma et Tech
    {
        id: 24,
        nom: "Écouteurs Canard",
        description: "Écouteurs stylés avec design inspiré du canard, parfaits pour les amateurs de musique.",
        prix: 25,
        tailles: ["Standard"],
        couleurs: ["Jaune", "Blanc"],
        couleur_image: { "Jaune": "ecouteur_jaune.png", "Blanc": "ecouteur_blanc.png" },
        stock: 30,
        image: "ecouteur.jpg",
        categorie: "objet_cinema_tech",
        pays_fabrication: "Chine",
        composition: "Plastique ABS, embouts en silicone",
        temps_livraison: "5 à 7 jours ouvrés",
        avis: []
    },
    {
        id: 25,
        nom: "Écouteurs Premium",
        description: "Écouteurs premium pour une qualité sonore exceptionnelle et un confort optimal.",
        prix: 35,
        tailles: ["Standard"],
        couleurs: ["Noir", "Rouge"],
        couleur_image: { "Noir": "ecouteur_noir.png", "Rouge": "ecouteur_rouge.png" },
        stock: 20,
        image: "ecouteur1.jpg",
        categorie: "objet_cinema_tech",
        pays_fabrication: "Japon",
        composition: "Aluminium brossé, isolation sonore",
        temps_livraison: "Livraison express sous 48h",
        avis: []
    },
    {
        id: 26,
        nom: "Clap de Cinéma",
        description: "Mini clap de cinéma, un accessoire indispensable pour les passionnés de tournage.",
        prix: 10,
        tailles: ["15x15 cm"],
        couleurs: ["Noir", "Blanc"],
        couleur_image: "clap_cinema.png",
        stock: 40,
        image: "mini-clap.jpg",
        categorie: "objet_cinema_tech",
        pays_fabrication: "France",
        composition: "Bois verni, peinture résistante",
        temps_livraison: "3 à 5 jours ouvrés",
        avis: []
    },
    {
        id: 27,
        nom: "Clé USB Festival",
        description: "Clé USB 32GB avec le logo officiel du festival, idéale pour stocker vos souvenirs.",
        prix: 12,
        tailles: ["32GB"],
        couleurs: ["Noir", "Jaune"],
        couleur_image: { "Noir": "usb_noir.png", "Jaune": "usb_jaune.png" },
        stock: 80,
        image: "usb.jpg",
        categorie: "objet_cinema_tech",
        pays_fabrication: "Taïwan",
        composition: "Plastique résistant, connecteur USB 3.0",
        temps_livraison: "4 à 6 jours ouvrés",
        avis: []
    },
    {
        id: 28,
        nom: "Clé USB Collector",
        description: "Clé USB édition limitée avec un design inspiré du festival de Cannes.",
        prix: 15,
        tailles: ["64GB"],
        couleurs: ["Argent", "Or"],
        couleur_image: { "Argent": "usb_argent.png", "Or": "usb_or.png" },
        stock: 50,
        image: "usb1.jpg",
        categorie: "objet_cinema_tech",
        pays_fabrication: "Allemagne",
        composition: "Métal brossé, gravure laser",
        temps_livraison: "5 à 7 jours ouvrés",
        avis: []
    },
    {
        id: 29,
        nom: "Vinyle Festival",
        description: "Vinyle de la bande sonore officielle du festival, un must-have pour les collectionneurs.",
        prix: 20,
        tailles: ["33 Tours"],
        couleurs: ["Noir"],
        couleur_image: "vinyle_noir.png",
        stock: 35,
        image: "vinyle.jpg",
        categorie: "objet_cinema_tech",
        pays_fabrication: "USA",
        composition: "Vinyle pressé, pochette cartonnée",
        temps_livraison: "6 à 9 jours ouvrés",
        avis: []
    },
    {
        id: 30,
        nom: "Vinyle Collector",
        description: "Vinyle édition collector avec design exclusif et son remasterisé.",
        prix: 30,
        tailles: ["33 Tours"],
        couleurs: ["Noir", "Transparent"],
        couleur_image: { "Noir": "vinyle_noir.png", "Transparent": "vinyle_transparent.png" },
        stock: 25,
        image: "vinyle1.jpg",
        categorie: "objet_cinema_tech",
        pays_fabrication: "Angleterre",
        composition: "Vinyle haute qualité, édition numérotée",
        temps_livraison: "Livraison sous 10 jours",
        avis: []
    },

    // Papeterie et Collection
    {
        id: 31,
        nom: "Carnet Festival",
        description: "Carnet de notes avec couverture rigide inspirée du festival.",
        prix: 6,
        tailles: ["A5"],
        couleurs: ["Jaune", "Vert"],
        couleur_image: { "Jaune": "carnet_jaune.png", "Vert": "carnet_vert.png" },
        stock: 50,
        image: "carnet2.jpg",
        categorie: "papeterie_collection",
        pays_fabrication: "France",
        composition: "Papier recyclé, couverture rigide",
        temps_livraison: "4 à 6 jours ouvrés",
        avis: []
    },
    {
        id: 32,
        nom: "Carnet Collector",
        description: "Carnet premium pour les amateurs d'écriture et de cinéma.",
        prix: 8,
        tailles: ["A5"],
        couleurs: ["Bleu", "Rouge"],
        couleur_image: { "Bleu": "carnet_bleu.png", "Rouge": "carnet_rouge.png" },
        stock: 40,
        image: "carnet3.jpg",
        categorie: "papeterie_collection",
        pays_fabrication: "Italie",
        composition: "Papier ivoire, reliure cousue",
        temps_livraison: "5 à 8 jours ouvrés",
        avis: []
    },
    {
        id: 33,
        nom: "Carte Postale Festival",
        description: "Carte postale officielle du festival, parfaite pour envoyer un souvenir à vos proches.",
        prix: 2,
        tailles: ["10x15 cm"],
        couleurs: ["Multicolore"],
        couleur_image: "carte_multicolore.png",
        stock: 100,
        image: "carte.jpg",
        categorie: "papeterie_collection",
        pays_fabrication: "France",
        composition: "Papier glacé haute qualité",
        temps_livraison: "3 à 5 jours ouvrés",
        avis: []
    },
    {
        id: 34,
        nom: "Carte Postale Collector",
        description: "Carte postale en édition limitée avec un design exclusif du festival.",
        prix: 3,
        tailles: ["10x15 cm"],
        couleurs: ["Blanc", "Noir"],
        couleur_image: { "Blanc": "carte_blanche.png", "Noir": "carte_noire.png" },
        stock: 70,
        image: "carte1.jpg",
        categorie: "papeterie_collection",
        pays_fabrication: "Italie",
        composition: "Papier texturé, finition dorée",
        temps_livraison: "4 à 6 jours ouvrés",
        avis: []
    },
    {
        id: 35,
        nom: "Marque-Page Festival",
        description: "Marque-page élégant avec motif du Festival de Cannes, idéal pour vos lectures.",
        prix: 2,
        tailles: ["Unique"],
        couleurs: ["Jaune", "Bleu"],
        couleur_image: { "Jaune": "marque_page_jaune.png", "Bleu": "marque_page_bleu.png" },
        stock: 80,
        image: "marque-page.jpg",
        categorie: "papeterie_collection",
        pays_fabrication: "Espagne",
        composition: "Carton laminé, dorure à chaud",
        temps_livraison: "3 à 5 jours ouvrés",
        avis: []
    },
    {
        id: 36,
        nom: "Stylo Festival",
        description: "Stylo à bille officiel, parfait pour prendre des notes lors des événements du festival.",
        prix: 3,
        tailles: ["Standard"],
        couleurs: ["Noir", "Jaune"],
        couleur_image: { "Noir": "stylo_noir.png", "Jaune": "stylo_jaune.png" },
        stock: 100,
        image: "stylo.jpg",
        categorie: "papeterie_collection",
        pays_fabrication: "Allemagne",
        composition: "Plastique recyclé, encre bleue",
        temps_livraison: "3 à 7 jours ouvrés",
        avis: []
    },

    // Premium
    {
        id: 37,
        nom: "Catalogue Festival",
        description: "Catalogue officiel en édition limitée, retraçant l'histoire et les coulisses du Festival de Cannes.",
        prix: 15,
        tailles: ["A4"],
        couleurs: ["Blanc"],
        couleur_image: "catalogue_blanc.png",
        stock: 20,
        image: "catalogue.jpg",
        categorie: "premium",
        pays_fabrication: "France",
        composition: "Papier glacé haute qualité, couverture rigide",
        temps_livraison: "Livraison en 3 jours ouvrés",
        avis: []
    },
    {
        id: 38,
        nom: "Mini Palme d'Or",
        description: "Réplique en or du trophée emblématique, une pièce de collection pour les amateurs de cinéma.",
        prix: 50,
        tailles: ["10 cm"],
        couleurs: ["Or"],
        couleur_image: "palme_or.png",
        stock: 10,
        image: "palme_or.jpg",
        categorie: "premium",
        pays_fabrication: "Suisse",
        composition: "Métal doré 24K, socle en marbre noir",
        temps_livraison: "Livraison en 5 jours ouvrés",
        avis: []
    },

    // Textiles et Modes
    {
        id: 39,
        nom: "T-shirt Festival",
        description: "T-shirt officiel du Festival de Cannes, en coton bio, ultra confortable.",
        prix: 18,
        tailles: ["S", "M", "L", "XL"],
        couleurs: ["Blanc", "Jaune"],
        couleur_image: { "Blanc": "tshirt_blanc.png", "Jaune": "tshirt_jaune.png" },
        stock: 60,
        image: "t-shirt.jpg",
        categorie: "textiles_et_modes",
        pays_fabrication: "Portugal",
        composition: "100% coton bio, impression écologique",
        temps_livraison: "4 à 6 jours ouvrés",
        avis: []
    },
    {
        id: 40,
        nom: "T-shirt Édition Limitée",
        description: "T-shirt en édition limitée pour les fans, disponible uniquement durant le festival.",
        prix: 20,
        tailles: ["S", "M", "L", "XL"],
        couleurs: ["Noir", "Gris"],
        couleur_image: { "Noir": "tshirt_noir.png", "Gris": "tshirt_gris.png" },
        stock: 50,
        image: "t-shirt2.jpg",
        categorie: "textiles_et_modes",
        pays_fabrication: "Italie",
        composition: "Coton premium, impression résistante",
        temps_livraison: "Livraison en 5 jours ouvrés",
        avis: []
    },
    {
        id: 41,
        nom: "Sweat-shirt Festival",
        description: "Sweat-shirt confortable et chaud avec le logo officiel du festival.",
        prix: 35,
        tailles: ["M", "L", "XL"],
        couleurs: ["Gris", "Bleu"],
        couleur_image: { "Gris": "sweat_gris.png", "Bleu": "sweat_bleu.png" },
        stock: 50,
        image: "sweat-shirt.jpg",
        categorie: "textiles_et_modes",
        pays_fabrication: "Turquie",
        composition: "Coton et polyester, intérieur molletonné",
        temps_livraison: "6 à 8 jours ouvrés",
        avis: []
    },
    {
        id: 42,
        nom: "Sweat-shirt Classique",
        description: "Sweat-shirt simple et élégant, idéal pour un look décontracté.",
        prix: 38,
        tailles: ["M", "L", "XL"],
        couleurs: ["Noir", "Blanc"],
        couleur_image: { "Noir": "sweat_noir.png", "Blanc": "sweat_blanc.png" },
        stock: 40,
        image: "sweat-shirt1.jpg",
        categorie: "textiles_et_modes",
        pays_fabrication: "France",
        composition: "Coton bio, impression écologique",
        temps_livraison: "Livraison en 5 à 7 jours ouvrés",
        avis: []
    },
    {
        id: 43,
        nom: "Sweat-shirt Édition Limitée",
        description: "Sweat-shirt rare pour les collectionneurs, avec broderie dorée exclusive.",
        prix: 40,
        tailles: ["M", "L"],
        couleurs: ["Rouge", "Bleu"],
        couleur_image: { "Rouge": "sweat_rouge.png", "Bleu": "sweat_bleu.png" },
        stock: 30,
        image: "sweat-shirt2.jpg",
        categorie: "textiles_et_modes",
        pays_fabrication: "Italie",
        composition: "Coton premium, broderie fine",
        temps_livraison: "Livraison en 6 jours ouvrés",
        avis: []
    },
    {
        id: 44,
        nom: "Bob Festival",
        description: "Bob tendance avec logo du festival, idéal pour se protéger du soleil tout en affichant son style.",
        prix: 15,
        tailles: ["Unique"],
        couleurs: ["Jaune", "Bleu"],
        couleur_image: { "Jaune": "bob_jaune.png", "Bleu": "bob_bleu.png" },
        stock: 70,
        image: "bob.jpg",
        categorie: "textiles_et_modes",
        pays_fabrication: "France",
        composition: "100% coton bio",
        temps_livraison: "3 à 5 jours ouvrés",
        avis: []
    },
    {
        id: 45,
        nom: "Bob Classique",
        description: "Bob classique avec design épuré, parfait pour une tenue décontractée et estivale.",
        prix: 16,
        tailles: ["Unique"],
        couleurs: ["Noir", "Blanc"],
        couleur_image: { "Noir": "bob_noir.png", "Blanc": "bob_blanc.png" },
        stock: 60,
        image: "bob2.jpg",
        categorie: "textiles_et_modes",
        pays_fabrication: "Italie",
        composition: "Coton et polyester",
        temps_livraison: "4 à 6 jours ouvrés",
        avis: []
    },
    {
        id: 46,
        nom: "Bob Édition Limitée",
        description: "Bob en édition spéciale avec broderie du festival, pour un look unique.",
        prix: 18,
        tailles: ["Unique"],
        couleurs: ["Vert", "Rouge"],
        couleur_image: { "Vert": "bob_vert.png", "Rouge": "bob_rouge.png" },
        stock: 40,
        image: "bob3.jpg",
        categorie: "textiles_et_modes",
        pays_fabrication: "Espagne",
        composition: "100% coton avec broderie premium",
        temps_livraison: "4 à 7 jours ouvrés",
        avis: []
    },
    {
        id: 47,
        nom: "Bob Fantaisie",
        description: "Bob fantaisie pour un style original et coloré, parfait pour les festivals.",
        prix: 20,
        tailles: ["Unique"],
        couleurs: ["Jaune", "Multicolore"],
        couleur_image: { "Jaune": "bob_jaune.png", "Multicolore": "bob_multicolore.png" },
        stock: 50,
        image: "bob4.jpg",
        categorie: "textiles_et_modes",
        pays_fabrication: "Portugal",
        composition: "Coton et lin, impression écologique",
        temps_livraison: "5 à 7 jours ouvrés",
        avis: []
    },
    {
        id: 48,
        nom: "Écharpe Festival",
        description: "Écharpe chaude et stylée avec logo du festival, idéale pour l'hiver.",
        prix: 25,
        tailles: ["Unique"],
        couleurs: ["Rouge", "Blanc"],
        couleur_image: { "Rouge": "echarpe_rouge.png", "Blanc": "echarpe_blanche.png" },
        stock: 40,
        image: "echarpe.jpg",
        categorie: "textiles_et_modes",
        pays_fabrication: "France",
        composition: "Laine et cachemire",
        temps_livraison: "4 à 6 jours ouvrés",
        avis: []
    },
    {
        id: 49,
        nom: "Écharpe Hiver",
        description: "Écharpe en laine idéale pour l'hiver, élégante et confortable.",
        prix: 28,
        tailles: ["Unique"],
        couleurs: ["Gris", "Bleu"],
        couleur_image: { "Gris": "echarpe_grise.png", "Bleu": "echarpe_bleue.png" },
        stock: 35,
        image: "echarpe1.jpg",
        categorie: "textiles_et_modes",
        pays_fabrication: "Italie",
        composition: "100% laine mérinos",
        temps_livraison: "5 à 8 jours ouvrés",
        avis: []
    },
    {
        id: 50,
        nom: "Tote Bag Festival",
        description: "Sac écologique avec motif canard, parfait pour transporter vos affaires tout en respectant l’environnement.",
        prix: 12,
        tailles: ["Standard"],
        couleurs: ["Blanc", "Jaune"],
        couleur_image: { "Blanc": "tote_bag_blanc.png", "Jaune": "tote_bag_jaune.png" },
        stock: 80,
        image: "tote-bag.jpg",
        categorie: "textiles_et_modes",
        pays_fabrication: "Portugal",
        composition: "100% coton bio",
        temps_livraison: "3 à 5 jours ouvrés",
        avis: []
    },
    {
        id: 51,
        nom: "Tote Bag Classique",
        description: "Sac pratique et solide pour vos courses, avec un design simple et moderne.",
        prix: 14,
        tailles: ["Standard"],
        couleurs: ["Vert", "Noir"],
        couleur_image: { "Vert": "tote_bag_vert.png", "Noir": "tote_bag_noir.png" },
        stock: 60,
        image: "tote-bag1.jpg",
        categorie: "textiles_et_modes",
        pays_fabrication: "Espagne",
        composition: "Toile de coton épaisse",
        temps_livraison: "4 à 6 jours ouvrés",
        avis: []
    },
    {
        id: 52,
        nom: "Tote Bag Édition Limitée",
        description: "Sac en édition limitée, idéal pour les collectionneurs et les amateurs de mode.",
        prix: 16,
        tailles: ["Standard"],
        couleurs: ["Rouge", "Bleu"],
        couleur_image: { "Rouge": "tote_bag_rouge.png", "Bleu": "tote_bag_bleu.png" },
        stock: 40,
        image: "tote-bag2.jpg",
        categorie: "textiles_et_modes",
        pays_fabrication: "France",
        composition: "Coton bio avec broderie spéciale",
        temps_livraison: "4 à 7 jours ouvrés",
        avis: []
    }
];

module.exports = syncDatabase;