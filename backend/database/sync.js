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


const syncDatabase = async () => {
    try {
        Utilisateur.hasMany(Prestataire, {foreignKey: 'id_utilisateur', as: 'prestataires', onDelete: 'CASCADE'});
        Prestataire.belongsTo(Utilisateur, {foreignKey: 'id_utilisateur', as: 'utilisateur', onDelete: 'CASCADE'});

        Prestataire.hasMany(Service, {foreignKey: 'id_prestataire', as: 'services', onDelete: 'CASCADE'});
        Service.belongsTo(Prestataire, {foreignKey: 'id_prestataire', as: 'prestataire', onDelete: 'CASCADE'});

        Prestataire.hasMany(Menu, {foreignKey: 'id_prestataire', as: 'menus', onDelete: 'CASCADE'});
        Menu.belongsTo(Prestataire, {foreignKey: 'id_prestataire', as: 'prestataire', onDelete: 'CASCADE'});

        Prestataire.hasMany(Avis, {foreignKey: 'id_prestataire', as: 'avis', onDelete: 'CASCADE'});
        Avis.belongsTo(Prestataire, {foreignKey: 'id_prestataire', as: 'prestataire', onDelete: 'CASCADE'});


        await sequelize.sync({force: true});

        // Insertion des utilisateurs
        await Utilisateur.bulkCreate([
            {
                nom_utilisateur: 'Alice Dupont',
                email_utilisateur: 'alice.dupont@example.com',
                mot_de_passe: '$2b$10$.9seAsiDiYFD.ytPORnvPeHKyzWZRee1CT3gXYY3gHOuBHIzbHbRy',
                adresse_utilisateur: '123 rue de Paris, 75001 Paris, France',
                telephone: '0123456789',
                date_inscription: '2024-01-01T00:00:00.000Z',
                role: 'utilisateur'
            },
            {
                nom_utilisateur: 'Bob Martin',
                email_utilisateur: 'bob.martin@example.com',
                mot_de_passe: '$2b$10$O4aTDFMXhFL7Z1BRvkFpUuhcu8Q7ReCA0zEFkfv9uMfETV74gQVFO',
                adresse_utilisateur: '456 avenue de Lyon, 69001 Lyon, France',
                telephone: '0987654321',
                date_inscription: '2024-01-05T00:00:00.000Z',
                role: 'prestataire'
            },
            {
                nom_utilisateur: 'Carole Durand',
                email_utilisateur: 'carole.durand@example.com',
                mot_de_passe: '$2b$10$osLQvsi/m97WV1DuebHXnOd1T.Aa8HTtnV9YsRGPw9SKa3f7l/ILO',
                adresse_utilisateur: '789 boulevard de Marseille, 13001 Marseille, France',
                telephone: '0147258390',
                date_inscription: '2024-02-10T00:00:00.000Z',
                role: 'admin'
            },
            {
                nom_utilisateur: 'David Lefevre',
                email_utilisateur: 'david.lefevre@example.com',
                mot_de_passe: '$2b$10$YbQxfIWONNBFVQe/e//o.OK0XAlaYXORn1HvbtRrhNvgq5xZXcq6m',
                adresse_utilisateur: '321 rue de Lille, 59800 Lille, France',
                telephone: '0758392045',
                date_inscription: '2024-03-15T00:00:00.000Z',
                role: 'utilisateur'
            },
            {
                nom_utilisateur: 'Emma Leroy',
                email_utilisateur: 'emma.leroy@example.com',
                mot_de_passe: '$2b$10$OjgFFhjjeVNma.XTyZ7IQuHmZN3KEWE3R3.ZiO36LNLDe4naztlBe',
                adresse_utilisateur: '654 avenue de Nice, 06000 Nice, France',
                telephone: '0612345678',
                date_inscription: '2024-04-20T00:00:00.000Z',
                role: 'prestataire'
            },
            {
                nom_utilisateur: 'Marc Bernard',
                email_utilisateur: 'marc.bernard@example.com',
                mot_de_passe: '$2b$10$MIu7eIl3f92QEvuJUvudIOFKZPV3xjnPHam3Nfp/wGPxt1FXNxFCK',
                adresse_utilisateur: '123 avenue Bordeaux, 33000 Bordeaux, France',
                telephone: '0600000001',
                date_inscription: '2024-06-01T00:00:00.000Z',
                role: 'prestataire'
            },
            {
                nom_utilisateur: 'Julie Vignon',
                email_utilisateur: 'julie.vignon@example.com',
                mot_de_passe: '$2b$10$uLUB8y5kU9ZqO3YABr7RE.qj4/b0KHH6vzQnuVcZAl3VM1DMMRoaC',
                adresse_utilisateur: '123 rue Strasbourg, 67000 Strasbourg, France',
                telephone: '0600000002',
                date_inscription: '2024-06-01T00:00:00.000Z',
                role: 'prestataire'
            },
            {
                nom_utilisateur: 'Thomas Girard',
                email_utilisateur: 'thomas.girard@example.com',
                mot_de_passe: '$2b$10$9Rb8OU7AE/Oid9D4DPHqL.RGcJyVbqtGsqE5N7TMWV46jofu4wY6S',
                adresse_utilisateur: '123 rue Rouen, 76000 Rouen, France',
                telephone: '0600000003',
                date_inscription: '2024-06-01T00:00:00.000Z',
                role: 'prestataire'
            },
            {
                nom_utilisateur: 'Sophie Marchand',
                email_utilisateur: 'sophie.marchand@example.com',
                mot_de_passe: '$2b$10$LIbJEE10Hn.KTsPRgIiRde2MuflEXheUTEIiUk45FfQDJuAUoi3pS',
                adresse_utilisateur: '123 rue Reims, 51100 Reims, France',
                telephone: '0600000004',
                date_inscription: '2024-06-01T00:00:00.000Z',
                role: 'prestataire'
            },
            {
                nom_utilisateur: 'Paul Dubois',
                email_utilisateur: 'paul.dubois@example.com',
                mot_de_passe: '$2b$10$r.lOV0yoiTUmTh89ssCQY.9UprXXAeolpjX5RMOl1AFH9QXJUt4Ci',
                adresse_utilisateur: '321 avenue Nancy, 54000 Nancy, France',
                telephone: '0600000005',
                date_inscription: '2024-06-02T00:00:00.000Z',
                role: 'prestataire'
            },
            {
                nom_utilisateur: 'Claire Fontaine',
                email_utilisateur: 'claire.fontaine@example.com',
                mot_de_passe: '$2b$10$1i9mT/CEaK3RDpucKrCevuQquWuuwE.0ug3EOEPeXQg4QJXXW6iL6',
                adresse_utilisateur: '654 avenue Metz, 57000 Metz, France',
                telephone: '0600000006',
                date_inscription: '2024-06-03T00:00:00.000Z',
                role: 'prestataire'
            }
        ]);
        await Emplacement.bulkCreate([
            {id: 1, coordinates: [47.6862, 6.8071], icon: 'evenement'},
            {id: 2, coordinates: [47.6865, 6.8085], icon: 'restaurant'},
            {id: 3, coordinates: [47.6861, 6.8089], icon: 'evenement'},
            {id: 4, coordinates: [47.6854, 6.8079], icon: 'stand'},
            {id: 5, coordinates: [47.6867, 6.8077], icon: 'restaurant'},
            {id: 6, coordinates: [47.6863, 6.8079], icon: 'restaurant'},
            {id: 7, coordinates: [47.6867, 6.8080], icon: 'peinture'},
            {id: 8, coordinates: [47.6860, 6.8077], icon: 'pedalo'}
        ]);


        // Insertion des prestataires
        await Prestataire.bulkCreate([
            {
                nom: 'Jeux et Divertissements',
                description: "Espace dédié aux jeux pour enfants et adultes avec diverses animations, telles que des ateliers créatifs, des jeux de société géants, et des parcours d'obstacles pour toute la famille. C'est l'endroit idéal pour se détendre et s'amuser, que vous soyez enfant ou adulte.",
                description_accueil: 'Jeux et animations pour tous.',
                categorie: 'Activité',
                id_emplacement: 1,
                id_evenement: 1,
                page_route: '/prestataire/1',
                image: 'jeu_divertissement.jpg',
                accepted: true,
                id_utilisateur: 2
            },
            {
                nom: 'Restaurant Le Gourmet',
                description: "Restaurant proposant une variété de plats traditionnels et internationaux, mettant en avant des ingrédients locaux et de saison. Profitez d'un menu diversifié avec des options pour tous les goûts, y compris des plats végétariens, végétaliens, et sans gluten. Le cadre chaleureux et accueillant rend chaque repas une expérience mémorable.",
                description_accueil: 'Cuisine variée et ingrédients locaux.',
                categorie: 'Gastronomie',
                id_emplacement: 2,
                id_evenement: 1,
                page_route: '/prestataire/2',
                image: 'restaurant.jpg',
                accepted: true,
                id_utilisateur: 5
            },
            {
                nom: 'Mascotte Festival',
                description: "Notre mascotte officielle anime le festival et pose pour des photos avec les visiteurs. En plus de cela, la mascotte participe à des parades et des spectacles tout au long de l'événement, apportant de la joie et de l'énergie aux petits et grands. Ne manquez pas les séances de dédicaces et les moments de partage avec notre mascotte emblématique.",
                description_accueil: 'Animations et photos avec la mascotte.',
                categorie: 'Mascotte',
                id_emplacement: 3,
                id_evenement: 1,
                page_route: '/prestataire/3',
                image: 'mascotte.jpg',
                accepted: true,
                id_utilisateur: 6
            },
            {
                nom: 'Stand Artisanat Local',
                description: "Découvrez et achetez des produits artisanaux locaux fabriqués par nos prestataires. Le stand propose une variété d'articles allant des bijoux faits main aux objets en céramique, en passant par des peintures et des œuvres d'art uniques. Participez à des ateliers de création pour apprendre les techniques artisanales et repartez avec vos propres créations.",
                description_accueil: 'Produits artisanaux uniques.',
                categorie: 'Activité',
                id_emplacement: 4,
                id_evenement: 1,
                page_route: '/prestataire/4',
                image: 'stand.jpg',
                accepted: true,
                id_utilisateur: 7
            },
            {
                nom: 'Dégustation de Canard',
                description: "Venez déguster une variété de plats à base de canard, préparés par des chefs renommés. Découvrez des recettes traditionnelles et innovantes, toutes mettant en vedette le canard sous ses meilleures formes.",
                description_accueil: 'Dégustation de plats à base de canard.',
                categorie: 'Gastronomie',
                id_emplacement: 5,
                id_evenement: 1,
                page_route: '/prestataire/5',
                image: 'degustation_canard.jpg',
                accepted: true,
                id_utilisateur: 8
            },
            {
                nom: 'Concours de Cuisine',
                description: "Participez ou assistez à un concours de cuisine où des chefs amateurs et professionnels se défient pour créer le meilleur plat à base de canard. Un jury de renom évaluera les créations et décernera des prix aux meilleurs chefs.",
                description_accueil: 'Concours de cuisine autour du canard.',
                categorie: 'Événement',
                id_emplacement: 6,
                id_evenement: 1,
                page_route: '/prestataire/6',
                image: 'concours_cuisine_canard.jpg',
                accepted: true,
                id_utilisateur: 9
            },
            {
                nom: 'Atelier Peinture',
                description: "Découvrez l'art de la peinture sur canard. Participez à cet atelier unique où des artistes locaux vous montreront comment créer des œuvres d'art étonnantes en utilisant des canards comme toile.",
                description_accueil: 'Atelier de peinture sur canard.',
                categorie: 'Activité',
                id_emplacement: 7,
                id_evenement: 1,
                page_route: '/prestataire/7',
                image: 'atelier_peinture_canard.jpg',
                accepted: true,
                id_utilisateur: 10
            },
            {
                nom: "Ped'ailo!",
                description: "Avec Ped'ailo, prenez vos ailes et flottez comme un canard sur les étangs du Malsaucy en famille, entre amis ou en canard solitaire !",
                description_accueil: 'Stand de pédalo sur les étangs',
                categorie: 'Activité',
                id_emplacement: 8,
                id_evenement: 1,
                page_route: '/prestataire/8',
                image: 'pedalo_canard.jpg',
                accepted: true,
                id_utilisateur: 11
            }
        ]);

        await Menu.bulkCreate([
            // Plats
            {
                nom: 'Confit de canard',
                type: "Plats",
                description: 'Confit de canard avec pommes de terre sautées.',
                prix: 18,
                image: 'confit_canard.jpg',
                categorie: 'plats',
                id_prestataire: 2
            },
            {
                nom: 'Magret de canard',
                type: "Plats",
                description: 'Magret de canard avec sauce au miel.',
                prix: 22,
                image: 'magret_canard.jpg',
                categorie: 'plats',
                id_prestataire: 2
            },
            {
                nom: 'Cuisse de canard à l\'orange',
                type: "Plats",
                description: 'Une cuisse de canard tendre servie avec une sauce à l\'orange.',
                prix: 20,
                image: 'cuisse_canard_orange.jpg',
                categorie: 'plats',
                id_prestataire: 2
            },
            {
                nom: 'Poulet rôti',
                type: "Plats",
                description: 'Poulet rôti aux herbes de Provence.',
                prix: 15,
                image: 'poulet_roti.jpg',
                categorie: 'plats',
                id_prestataire: 2
            },
            {
                nom: 'Steak frites',
                type: "Plats",
                description: 'Steak de bœuf grillé accompagné de frites maison.',
                prix: 17,
                image: 'steak_frites.jpg',
                categorie: 'plats',
                id_prestataire: 2
            },

            // Boissons
            {
                nom: 'Eau plate',
                type: "Boissons",
                description: 'Bouteille de 50 cl.',
                prix: 2,
                image: 'eau_plate.jpg',
                categorie: 'boissons',
                id_prestataire: 2
            },
            {
                nom: 'Eau pétillante',
                type: "Boissons",
                description: 'Bouteille de 50 cl.',
                prix: 2.5,
                image: 'eau_petillante.jpg',
                categorie: 'boissons',
                id_prestataire: 2
            },
            {
                nom: 'Coca-Cola',
                type: "Boissons",
                description: 'Canette de 33 cl.',
                prix: 3,
                image: 'coca_cola.jpg',
                categorie: 'boissons',
                id_prestataire: 2
            },

            // Desserts
            {
                nom: 'Tarte aux pommes',
                type: "Desserts",
                description: 'Tarte maison avec des pommes caramélisées.',
                prix: 6,
                image: 'tarte_pommes.jpg',
                categorie: 'desserts',
                id_prestataire: 2
            },
            {
                nom: 'Mousse au chocolat',
                type: "Desserts",
                description: 'Délicieuse mousse au chocolat noir.',
                prix: 5,
                image: 'mousse_chocolat.jpg',
                categorie: 'desserts',
                id_prestataire: 2
            },
            {
                nom: 'Crème brûlée',
                type: "Desserts",
                description: 'Crème vanille avec une croûte caramélisée.',
                prix: 6,
                image: 'creme_brulee.jpg',
                categorie: 'desserts',
                id_prestataire: 2
            },
            {
                nom: 'Fondant au chocolat',
                type: "Desserts",
                description: 'Fondant avec un cœur coulant au chocolat.',
                prix: 7,
                image: 'fondant_chocolat.jpg',
                categorie: 'desserts',
                id_prestataire: 2
            },
            {
                nom: 'Coupe glacée',
                type: "Desserts",
                description: 'Deux boules de glace avec des fruits frais.',
                prix: 5,
                image: 'coupe_glacee.jpg',
                categorie: 'desserts',
                id_prestataire: 2
            },

            // Menus Enfants
            {
                nom: 'Nuggets de poulet',
                type: "Menus Enfants",
                description: '5 nuggets avec frites et jus d\'orange.',
                prix: 8,
                image: 'nuggets_poulet.jpg',
                categorie: 'menusEnfants',
                id_prestataire: 2
            },
            {
                nom: 'Mini burger',
                type: "Menus Enfants",
                description: 'Petit burger avec steak haché et frites.',
                prix: 9,
                image: 'mini_burger.jpg',
                categorie: 'menusEnfants',
                id_prestataire: 2
            },
            {
                nom: 'Pâtes à la bolognaise',
                type: "Menus Enfants",
                description: 'Assiette de pâtes avec sauce tomate et viande hachée.',
                prix: 7,
                image: 'pates_bolognaise.jpg',
                categorie: 'menusEnfants',
                id_prestataire: 2
            }
        ]);


        await Service.bulkCreate([
            {nom: 'service1', description: 'description', lien: 'lien_service1', actif: true, id_prestataire: 1},
            {nom: 'service1', description: 'description', lien: 'lien_service1', actif: true, id_prestataire: 2},
            {nom: 'service1', description: 'description', lien: 'lien_service1', actif: true, id_prestataire: 3},
            {nom: 'service1', description: 'description', lien: 'lien_service1', actif: true, id_prestataire: 4},
            {nom: 'service1', description: 'description', lien: 'lien_service1', actif: true, id_prestataire: 5},
            {nom: 'service1', description: 'description', lien: 'lien_service1', actif: true, id_prestataire: 6},
            {nom: 'service1', description: 'description', lien: 'lien_service1', actif: true, id_prestataire: 7},
            {nom: 'service1', description: 'description', lien: 'lien_service1', actif: true, id_prestataire: 8}
        ]);

        await Sponsor.bulkCreate([
            {
                nom_sponsor: 'BirdLife International',
                description_accueil: 'Soutenir la protection des cannes sauvages...',
                description: 'BirdLife International est un leader mondial...',
                image: 'logo.png'
            },
            {
                nom_sponsor: 'Wild Ducks Conservation',
                description_accueil: 'Engagés pour un environnement sûr...',
                description: "Wild Ducks Conservation s'efforce de créer...",
                image: 'logo.png'
            },
            {
                nom_sponsor: 'Natural Habitat Safaris',
                description_accueil: 'Offrir des expériences écoresponsables...',
                description: 'Natural Habitat Safaris propose des voyages...',
                image: 'logo.png'
            },
            {
                nom_sponsor: 'Fondation des Marais Sauvages',
                description_accueil: 'Protège les habitats naturels des ansériformes.',
                description: 'La Fondation des Marais Sauvages est dédiée...',
                image: 'logo.png'
            },
            {
                nom_sponsor: 'Éco Nature Environnement',
                description_accueil: 'Un partenaire clé pour la sensibilisation...',
                description: 'Éco Nature Environnement organise des campagnes...',
                image: 'logo.png'
            }
        ]);
        await Avis.bulkCreate([
            {id_prestataire: 1, id_utilisateur: 1, texte: 'Je me suis trop méga amusée omg omg wouhouuu !!', note: 5},
            {
                id_prestataire: 1,
                id_utilisateur: 2,
                texte: "C'était trop bien, mais j'ai marché sur un caca de chien. Où sont les nettoyeurs ?",
                note: 4
            }
        ]);

        await Don.bulkCreate([
            {
                id_utilisateur: 2,
                id_prestataire: 2,
                message: 'Merci pour votre soutien!',
                montant: 300,
                date: '2024-11-15'
            }
        ]);

        await MapData.bulkCreate([
            {id: 1, name: 'emplacement1', fill_color: 'cyan', stroke_color: 'red', stroke_width: '2', opacity: '0'},
            {id: 2, name: 'emplacement2', fill_color: 'green', stroke_color: 'red', stroke_width: '2', opacity: '0'},
            {id: 3, name: 'emplacement3', fill_color: 'blue', stroke_color: 'red', stroke_width: '2', opacity: '0'}
        ]);

        await Point.bulkCreate([
            {map_id: 1, x_coord: '150', y_coord: '80'},
            {map_id: 1, x_coord: '175', y_coord: '115'},
            {map_id: 1, x_coord: '200', y_coord: '80'},
            {map_id: 2, x_coord: '180', y_coord: '50'},
            {map_id: 2, x_coord: '210', y_coord: '80'},
            {map_id: 3, x_coord: '240', y_coord: '100'},
            {map_id: 3, x_coord: '260', y_coord: '120'}
        ]);
        await Reservation.bulkCreate([
            {id_prestataire: 2, date: '2024-12-10', heure: '12:00', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-10', heure: '12:30', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-10', heure: '13:00', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-10', heure: '13:30', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-10', heure: '19:00', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-10', heure: '19:30', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-10', heure: '20:00', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-11', heure: '12:00', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-11', heure: '13:00', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-11', heure: '14:00', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-11', heure: '19:00', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-11', heure: '19:30', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-11', heure: '20:00', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-11', heure: '20:30', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-12', heure: '12:30', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-12', heure: '13:00', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-12', heure: '14:30', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-12', heure: '19:00', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-12', heure: '19:30', type_service: 'restaurant'},
            {id_prestataire: 2, date: '2024-12-12', heure: '21:00', type_service: 'restaurant'},
            {id_prestataire: 8, date: '2025-09-01', heure: '08:00', type_service: 'balade'},
            {id_prestataire: 8, date: '2025-09-01', heure: '08:30', type_service: 'balade'},
            {id_prestataire: 8, date: '2025-09-01', heure: '09:00', type_service: 'balade'},
            {id_prestataire: 8, date: '2025-09-01', heure: '09:30', type_service: 'balade'},
            {id_prestataire: 8, date: '2025-09-01', heure: '10:00', type_service: 'balade'},
            {id_prestataire: 8, date: '2025-09-01', heure: '10:30', type_service: 'balade'},
            {id_prestataire: 8, date: '2025-09-01', heure: '11:00', type_service: 'balade'},
            {id_prestataire: 8, date: '2025-09-01', heure: '12:00', type_service: 'balade'},
            {id_prestataire: 8, date: '2025-09-01', heure: '13:00', type_service: 'balade'},
            {id_prestataire: 8, date: '2025-09-01', heure: '14:00', type_service: 'balade'},
            {id_prestataire: 8, date: '2025-09-01', heure: '14:30', type_service: 'balade'},
            {id_prestataire: 8, date: '2025-09-01', heure: '15:00', type_service: 'balade'},
            {id_prestataire: 8, date: '2025-09-01', heure: '15:30', type_service: 'balade'},
            {id_prestataire: 8, date: '2025-09-01', heure: '16:00', type_service: 'balade'},
            {id_prestataire: 8, date: '2025-09-01', heure: '16:30', type_service: 'balade'}
        ]);

        console.log('Database & tables created!');

        const prestataire = await Prestataire.findOne({where: {id: 1}, include: 'utilisateur'});
        console.log('Utilisateur du prestataire:', prestataire.dataValues.utilisateur);

        const service = await Service.findOne({where: {id: 1}, include: 'prestataire'});
        console.log('Prestataire du service:', service.dataValues);

        const avis = await Avis.findOne({where: {id: 1}, include: 'prestataire'});
        console.log('Prestataire de l\'avis:', avis.dataValues.prestataire);

        const menus = await Menu.findAll({where: {id_prestataire: 2}});
        console.log('Menus pour le prestataire 2 :', menus.map(menu => menu.dataValues));


    } catch (error) {
        console.error('Error creating database & tables:', error);
    }
};

module.exports = syncDatabase;