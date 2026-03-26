CREATE TABLE IF NOT EXISTS songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  album VARCHAR(255),
  year SMALLINT,
  songsterr_id INT,
  source ENUM('songsterr', 'ai', 'manual') DEFAULT 'songsterr',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY idx_artist_title (artist, title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS instruments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  song_id INT NOT NULL,
  role VARCHAR(50) NOT NULL,
  tuning_name VARCHAR(50) NOT NULL,
  tuning_midi JSON NOT NULL,
  string_count TINYINT DEFAULT 6,
  capo_fret TINYINT DEFAULT 0,
  FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_songs_search ON songs(artist, title);
