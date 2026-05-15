class ReviewController {
  constructor(reviewRepository, gameRepository) {
    this.reviewRepository = reviewRepository;
    this.gameRepository = gameRepository;
  }

  async preparePageData(req) {
    const [games, reviews] = await Promise.all([
      this.gameRepository.getAllWithGenre(),
      this.reviewRepository.getAll()
    ]);

    let editingReview = null;
    if (req.params.id) {
      editingReview = await this.reviewRepository.getById(Number(req.params.id));
    }

    req.pageData = { games, reviews, editingReview };
  }

  async create(req, res, next) {
    try {
      await this.reviewRepository.create({
        gameId: Number(req.body.gameId),
        authorName: req.body.authorName,
        reviewText: req.body.reviewText,
        rating: Number(req.body.rating)
      });
      res.redirect("/reviews");
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      await this.reviewRepository.update(Number(req.params.id), {
        gameId: Number(req.body.gameId),
        authorName: req.body.authorName,
        reviewText: req.body.reviewText,
        rating: Number(req.body.rating)
      });
      res.redirect("/reviews");
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      await this.reviewRepository.delete(Number(req.params.id));
      res.redirect("/reviews");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ReviewController };
