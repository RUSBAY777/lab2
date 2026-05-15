class GameRepository {
  constructor(db) {
    this.db = db;
  }

  async getAllWithGenre() {
    const sql = `
      SELECT
        g.id,
        g.title,
        g.release_year,
        gr.name AS genre_name
      FROM games g
      JOIN genres gr ON gr.id = g.genre_id
      ORDER BY g.title ASC
    `;
    const { rows } = await this.db.query(sql);
    return rows;
  }
}

module.exports = { GameRepository };
