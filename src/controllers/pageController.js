const { renderPage } = require("../utils/renderPage");

function mapReviewToFormData(review) {
  if (!review) {
    return {};
  }
  return {
    gameId: review.game_id,
    authorName: review.author_name,
    reviewText: review.review_text,
    rating: review.rating
  };
}

class PageController {
  constructor(gameRepository, reviewRepository) {
    this.gameRepository = gameRepository;
    this.reviewRepository = reviewRepository;
  }

  home(req, res) {
    res.render("pages/home", { pageTitle: "Главная" });
  }

  news(req, res) {
    res.render("pages/news", { pageTitle: "Новости" });
  }

  guides(req, res) {
    res.render("pages/guides", { pageTitle: "Гайды" });
  }

  industry(req, res) {
    res.render("pages/industry", { pageTitle: "Индустрия" });
  }

  sales(req, res) {
    res.render("pages/sales", { pageTitle: "Скидки" });
  }

  async reviews(req, res, next) {
    const fallbackLocals = {
      pageTitle: "Обзоры",
      games: [],
      reviews: [],
      editingReview: null,
      formData: {},
      errors: [
        "База данных недоступна или не успела ответить. Убедитесь, что PostgreSQL запущен (или выполните docker compose up), и что в .env указан верный хост (часто 127.0.0.1 вместо localhost на Windows)."
      ],
      dbUnavailable: true
    };

    try {
      const [games, reviews] = await Promise.all([
        this.gameRepository.getAllWithGenre(),
        this.reviewRepository.getAll()
      ]);

      const editingReview = req.query.edit ? await this.reviewRepository.getById(Number(req.query.edit)) : null;

      await renderPage(res, "pages/reviews", {
        pageTitle: "Обзоры",
        games,
        reviews,
        editingReview,
        formData: mapReviewToFormData(editingReview),
        errors: [],
        dbUnavailable: false
      });
    } catch (error) {
      try {
        await renderPage(res, "pages/reviews", fallbackLocals, 200);
      } catch {
        res.status(500).type("html").send("<p>Не удалось открыть страницу «Обзоры».</p>");
      }
    }
  }
}

module.exports = { PageController };
