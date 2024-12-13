DROP TABLE IF EXISTS notif, MOTS_DE_PASSE_UTILISATEURS,reservations,associations, points, map_data,dons, avis, billetterie, sponsors, services, prestataires, utilisateurs;
-- Création des tables

CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    nom_utilisateur VARCHAR(255),
    email_utilisateur VARCHAR(255) UNIQUE,
    mot_de_passe VARCHAR(255),
    adresse_utilisateur VARCHAR(255),
    telephone VARCHAR(20),
    date_inscription TIMESTAMP,
    role VARCHAR(50)
);

CREATE TABLE prestataires (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    description TEXT,
    description_accueil VARCHAR(255),
    categorie VARCHAR(100),
    id_emplacement INT,
    id_evenement INT,
    page_route VARCHAR(255),
    image VARCHAR(255),
    id_utilisateur INT REFERENCES utilisateurs(id)
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    id_service VARCHAR(255),
    nom_service VARCHAR(255),
    description_service TEXT,
    lien_service VARCHAR(255),
    statut_service VARCHAR(50),
    id_prestataire INT REFERENCES prestataires(id)
);

CREATE TABLE sponsors (
    id SERIAL PRIMARY KEY,
    id_sponsor VARCHAR(255),
    nom_sponsor VARCHAR(255),
    description_accueil TEXT,
    description TEXT,
    image VARCHAR(255)
);

CREATE TABLE billetterie (
    id SERIAL PRIMARY KEY,
    nombre_billets INTEGER,
    prix_total INTEGER,
    date_achat DATE,
    email VARCHAR(255)
);


CREATE TABLE avis (
    id SERIAL PRIMARY KEY,
    id_prestataire INT REFERENCES prestataires(id),
    id_utilisateur INT REFERENCES utilisateurs(id),
    texte TEXT,
    note INT
);

CREATE TABLE dons (
    id SERIAL PRIMARY KEY,
    id_utilisateur INT REFERENCES utilisateurs(id),
    id_prestataire INT REFERENCES prestataires(id),
    message TEXT,
    montant DECIMAL(10, 2),
    date DATE
);

CREATE TABLE map_data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    fill_color VARCHAR(50),
    stroke_color VARCHAR(50),
    stroke_width VARCHAR(10),
    opacity VARCHAR(10)
);

CREATE TABLE points (
    id SERIAL PRIMARY KEY,
    map_id INT REFERENCES map_data(id),
    x_coord VARCHAR(10),
    y_coord VARCHAR(10)
);

CREATE TABLE associations (
    id SERIAL PRIMARY KEY,
    nom_association VARCHAR(999),
    description_accueil VARCHAR(999),
    description VARCHAR(999),
    image VARCHAR(255)
);

CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    id_prestataire INT NOT NULL REFERENCES prestataires(id),
    date DATE NOT NULL,
    heure TIME NOT NULL,
    type_service VARCHAR(50) NOT NULL CHECK (type_service IN ('balade', 'restaurant')),
    reserved_user_id INT REFERENCES utilisateurs(id) DEFAULT NULL
);

CREATE TABLE MOTS_DE_PASSE_UTILISATEURS(
    id SERIAL PRIMARY KEY ,
    user_Id INT REFERENCES utilisateurs(id),
    date_Created DATE,
    password VARCHAR(255)
);

CREATE TABLE notif (
    id SERIAL PRIMARY KEY ,
    id_user INT REFERENCES utilisateurs(id),
    message VARCHAR(999)
);

-- Insertion des données
-- Insertion des utilisateurs
INSERT INTO utilisateurs (nom_utilisateur, email_utilisateur, mot_de_passe, adresse_utilisateur, telephone, date_inscription, role) VALUES
( 'Alice Dupont', 'alice.dupont@example.com', '$2b$10$.9seAsiDiYFD.ytPORnvPeHKyzWZRee1CT3gXYY3gHOuBHIzbHbRy', '123 rue de Paris, 75001 Paris, France', '0123456789', '2024-01-01T00:00:00.000Z', 'utilisateur'),
( 'Bob Martin', 'bob.martin@example.com', '$2b$10$O4aTDFMXhFL7Z1BRvkFpUuhcu8Q7ReCA0zEFkfv9uMfETV74gQVFO', '456 avenue de Lyon, 69001 Lyon, France', '0987654321', '2024-01-05T00:00:00.000Z', 'prestataire'),
('Carole Durand', 'carole.durand@example.com', '$2b$10$osLQvsi/m97WV1DuebHXnOd1T.Aa8HTtnV9YsRGPw9SKa3f7l/ILO', '789 boulevard de Marseille, 13001 Marseille, France', '0147258390', '2024-02-10T00:00:00.000Z', 'admin'),
( 'David Lefevre', 'david.lefevre@example.com', '$2b$10$YbQxfIWONNBFVQe/e//o.OK0XAlaYXORn1HvbtRrhNvgq5xZXcq6m', '321 rue de Lille, 59800 Lille, France', '0758392045', '2024-03-15T00:00:00.000Z', 'utilisateur'),
( 'Emma Leroy', 'emma.leroy@example.com', '$2b$10$OjgFFhjjeVNma.XTyZ7IQuHmZN3KEWE3R3.ZiO36LNLDe4naztlBe', '654 avenue de Nice, 06000 Nice, France', '0612345678', '2024-04-20T00:00:00.000Z', 'prestataire'),
( 'Marc Bernard', 'marc.bernard@example.com', '$2b$10$MIu7eIl3f92QEvuJUvudIOFKZPV3xjnPHam3Nfp/wGPxt1FXNxFCK', '123 avenue Bordeaux, 33000 Bordeaux, France', '0600000001', '2024-06-01T00:00:00.000Z', 'prestataire'),
( 'Julie Vignon', 'julie.vignon@example.com', '$2b$10$uLUB8y5kU9ZqO3YABr7RE.qj4/b0KHH6vzQnuVcZAl3VM1DMMRoaC', '123 rue Strasbourg, 67000 Strasbourg, France', '0600000002', '2024-06-01T00:00:00.000Z', 'prestataire'),
( 'Thomas Girard', 'thomas.girard@example.com', '$2b$10$9Rb8OU7AE/Oid9D4DPHqL.RGcJyVbqtGsqE5N7TMWV46jofu4wY6S', '123 rue Rouen, 76000 Rouen, France', '0600000003', '2024-06-01T00:00:00.000Z', 'prestataire'),
( 'Sophie Marchand', 'sophie.marchand@example.com', '$2b$10$LIbJEE10Hn.KTsPRgIiRde2MuflEXheUTEIiUk45FfQDJuAUoi3pS', '123 rue Reims, 51100 Reims, France', '0600000004', '2024-06-01T00:00:00.000Z', 'prestataire'),
( 'Paul Dubois', 'paul.dubois@example.com', '$2b$10$r.lOV0yoiTUmTh89ssCQY.9UprXXAeolpjX5RMOl1AFH9QXJUt4Ci', '321 avenue Nancy, 54000 Nancy, France', '0600000005', '2024-06-02T00:00:00.000Z', 'prestataire'),
( 'Claire Fontaine', 'claire.fontaine@example.com', '$2b$10$1i9mT/CEaK3RDpucKrCevuQquWuuwE.0ug3EOEPeXQg4QJXXW6iL6', '654 avenue Metz, 57000 Metz, France', '0600000006', '2024-06-03T00:00:00.000Z', 'prestataire');

-- Insertion des prestataires
INSERT INTO prestataires (id, nom, description, description_accueil, categorie, id_emplacement, id_evenement, page_route, image, id_utilisateur) VALUES
(1, 'Jeux et Divertissements', 'Espace dédié aux jeux pour enfants et adultes avec diverses animations, telles que des ateliers créatifs, des jeux de société géants, et des parcours d''obstacles pour toute la famille. C''est l''endroit idéal pour se détendre et s''amuser, que vous soyez enfant ou adulte.', 'Jeux et animations pour tous.', 'Activité', 1, 1, '/prestataire/1', 'jeu_divertissement.jpg', 2),
(2, 'Restaurant Le Gourmet', 'Restaurant proposant une variété de plats traditionnels et internationaux, mettant en avant des ingrédients locaux et de saison. Profitez d''un menu diversifié avec des options pour tous les goûts, y compris des plats végétariens, végétaliens, et sans gluten. Le cadre chaleureux et accueillant rend chaque repas une expérience mémorable.', 'Cuisine variée et ingrédients locaux.', 'Gastronomie', 2, 1, '/prestataire/2', 'restaurant.jpg', 5),
(3, 'Mascotte Festival', 'Notre mascotte officielle anime le festival et pose pour des photos avec les visiteurs. En plus de cela, la mascotte participe à des parades et des spectacles tout au long de l''événement, apportant de la joie et de l''énergie aux petits et grands. Ne manquez pas les séances de dédicaces et les moments de partage avec notre mascotte emblématique.', 'Animations et photos avec la mascotte.', 'Mascotte', 3, 1, '/prestataire/3', 'mascotte.jpg', 6),
(4, 'Stand Artisanat Local', 'Découvrez et achetez des produits artisanaux locaux fabriqués par nos prestataires. Le stand propose une variété d''articles allant des bijoux faits main aux objets en céramique, en passant par des peintures et des œuvres d''art uniques. Participez à des ateliers de création pour apprendre les techniques artisanales et repartez avec vos propres créations.', 'Produits artisanaux uniques.', 'Activité', 4, 1, '/prestataire/4', 'stand.jpg', 7),
(5, 'Dégustation de Canard', 'Venez déguster une variété de plats à base de canard, préparés par des chefs renommés. Découvrez des recettes traditionnelles et innovantes, toutes mettant en vedette le canard sous ses meilleures formes.', 'Dégustation de plats à base de canard.', 'Gastronomie', 5, 1, '/prestataire/5', 'degustation_canard.jpg', 8),
(6, 'Concours de Cuisine ', 'Participez ou assistez à un concours de cuisine où des chefs amateurs et professionnels se défient pour créer le meilleur plat à base de canard. Un jury de renom évaluera les créations et décernera des prix aux meilleurs chefs.', 'Concours de cuisine autour du canard.', 'Événement', 6, 1, '/prestataire/6', 'concours_cuisine_canard.jpg', 9),
(7, 'Atelier Peinture ', 'Découvrez l''art de la peinture sur canard. Participez à cet atelier unique où des artistes locaux vous montreront comment créer des œuvres d''art étonnantes en utilisant des canards comme toile.', 'Atelier de peinture sur canard.', 'Activité', 7, 1, '/prestataire/7', 'atelier_peinture_canard.jpg', 10),
(8, 'Ped''ailo!', 'Avec Ped''ailo, prenez vos ailes et flottez comme un canard sur les étangs du Malsaucy en famille, entre amis ou en canard solitaire !', 'Stand de pédalo sur les étangs', 'Activité', 8, 1, '/prestataire/8', 'pedalo_canard.jpg', 11);

-- Table services
INSERT INTO services (id_service, nom_service, description_service, lien_service, statut_service, id_prestataire) VALUES
('1', 'service1', 'description', 'lien_service1', 'actif', 1),
('1', 'service1', 'description', 'lien_service1', 'actif', 2),
('1', 'service1', 'description', 'lien_service1', 'actif', 3),
('1', 'service1', 'description', 'lien_service1', 'actif', 4),
('1', 'service1', 'description', 'lien_service1', 'actif', 5),
('1', 'service1', 'description', 'lien_service1', 'actif', 6),
('1', 'service1', 'description', 'lien_service1', 'actif', 7),
('1', 'service1', 'description', 'lien_service1', 'actif', 8);

-- Table sponsors
INSERT INTO sponsors (id_sponsor, nom_sponsor, description_accueil, description, image) VALUES
('1', 'BirdLife International', 'Soutenir la protection des cannes sauvages...', 'BirdLife International est un leader mondial...', 'logo.png'),
('2', 'Wild Ducks Conservation', 'Engagés pour un environnement sûr...', 'Wild Ducks Conservation s''efforce de créer...', 'logo.png'),
('3', 'Natural Habitat Safaris', 'Offrir des expériences écoresponsables...', 'Natural Habitat Safaris propose des voyages...', 'logo.png'),
('4', 'Fondation des Marais Sauvages', 'Protège les habitats naturels des ansériformes.', 'La Fondation des Marais Sauvages est dédiée...', 'logo.png'),
('5', 'Éco Nature Environnement', 'Un partenaire clé pour la sensibilisation...', 'Éco Nature Environnement organise des campagnes...', 'logo.png');


-- Table avis
INSERT INTO avis (id_prestataire, id_utilisateur, texte, note) VALUES
( 1, 1, 'Je me suis trop méga amusée omg omg wouhouuu !!', 5),
( 1, 2, 'C''était trop bien, mais j''ai marché sur un caca de chien. Où sont les nettoyeurs ?', 4);

-- Table dons
INSERT INTO dons (id_utilisateur, id_prestataire, message, montant, date) VALUES
(1, 1, 'Pour vous soutenir les bébous!', 500, '2024-10-28');

-- Table map_data
INSERT INTO map_data (id, name, fill_color, stroke_color, stroke_width, opacity) VALUES
(1, 'emplacement1', 'cyan', 'red', '2', '0'),
(2, 'emplacement2', 'green', 'red', '2', '0'),
(3, 'emplacement3', 'blue', 'red', '2', '0');

-- Table points
INSERT INTO points (map_id, x_coord, y_coord) VALUES
(1, '150', '80'),
(1, '175', '115'),
(1, '200', '80'),
(2, '180', '50'),
(2, '210', '80'),
(3, '240', '100'),
(3, '260', '120');

-- Insertion des disponibilités de restaurant
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-10', '12:00', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-10', '12:30', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-10', '13:00', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-10', '13:30', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-10', '19:00', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-10', '19:30', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-10', '20:00', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-11', '12:00', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-11', '13:00', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-11', '14:00', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-11', '19:00', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-11', '19:30', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-11', '20:00', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-11', '20:30', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-12', '12:30', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-12', '13:00', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-12', '14:30', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-12', '19:00', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-12', '19:30', 'restaurant');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (2, '2024-12-12', '21:00', 'restaurant');
-- ... (D'autres lignes pour les disponibilités de restaurant)

-- Insertion des balades
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '08:00', 'balade');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '08:30', 'balade');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '09:00', 'balade');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '09:30', 'balade');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '10:00', 'balade');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '10:30', 'balade');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '11:00', 'balade');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '12:00', 'balade');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '13:00', 'balade');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '14:00', 'balade');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '14:30', 'balade');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '15:00', 'balade');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '15:30', 'balade');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '16:00', 'balade');
INSERT INTO reservations (id_prestataire, date, heure, type_service) VALUES (8, '2025-09-01', '16:30', 'balade');

-- Ajoutez plus d'enregistrements selon vos données.



DELETE FROM avis
WHERE id = 3;

SELECT * FROM avis WHERE id_prestataire = 1;


