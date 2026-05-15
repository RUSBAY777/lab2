class ReviewRepository {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const sql = `
      SELECT
        r.id,
        r.author_name,
        r.review_text,
        r.rating,
        r.created_at,
        g.id AS game_id,
        g.title AS game_title
      FROM reviews r
      JOIN games g ON g.id = r.game_id
      ORDER BY r.created_at DESC
    `;
    const { rows } = await this.db.query(sql);
    return rows;
  }

  async getById(id) {
    const { rows } = await this.db.query(
      `SELECT id, game_id, author_name, review_text, rating FROM reviews WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async create(payload) {
    const { gameId, authorName, reviewText, rating } = payload;
    await this.db.query(
      `INSERT INTO reviews (game_id, author_name, review_text, rating) VALUES ($1, $2, $3, $4)`,
      [gameId, authorName, reviewText, rating]
    );
  }

  async update(id, payload) {
    const { gameId, authorName, reviewText, rating } = payload;
    await this.db.query(
      `
      UPDATE reviews
      SET game_id = $1, author_name = $2, review_text = $3, rating = $4
      WHERE id = $5
      `,
      [gameId, authorName, reviewText, rating, id]
    );
  }

  async delete(id) {
    await this.db.query(`DELETE FROM reviews WHERE id = $1`, [id]);
  }
}

module.exports = { ReviewRepository };
