CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre_id INT NOT NULL REFERENCES genres(id) ON DELETE RESTRICT,
    release_year INT NOT NULL CHECK (release_year BETWEEN 1970 AND 2100)
);

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    game_id INT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    author_name VARCHAR(120) NOT NULL,
    review_text TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO genres (name) VALUES
    ('RPG'),
    ('Action'),
    ('Adventure')
ON CONFLICT (name) DO NOTHING;

INSERT INTO games (title, genre_id, release_year)
SELECT 'Cyberpunk 2077', g.id, 2020 FROM genres g WHERE g.name = 'RPG'
UNION ALL
SELECT 'The Witcher 3', g.id, 2015 FROM genres g WHERE g.name = 'RPG'
UNION ALL
SELECT 'Elden Ring', g.id, 2022 FROM genres g WHERE g.name = 'Action'
ON CONFLICT DO NOTHING;
