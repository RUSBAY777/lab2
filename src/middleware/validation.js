const { body, validationResult } = require("express-validator");
const { renderPage } = require("../utils/renderPage");

const reviewValidationRules = [
  body("gameId").isInt({ min: 1 }).withMessage("Выберите игру"),
  body("authorName")
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage("Имя автора должно быть от 2 до 120 символов")
    .escape(),
  body("reviewText")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Текст отзыва должен быть от 10 до 1000 символов")
    .escape(),
  body("rating").isInt({ min: 1, max: 5 }).withMessage("Рейтинг должен быть от 1 до 5")
];

async function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  try {
    await renderPage(
      res,
      "pages/reviews",
      {
        pageTitle: "Обзоры",
        games: req.pageData.games,
        reviews: req.pageData.reviews,
        formData: req.body,
        editingReview: req.pageData.editingReview || null,
        errors: result.array().map((item) => item.msg),
        dbUnavailable: false
      },
      400
    );
  } catch (err) {
    next(err);
  }
}

module.exports = { reviewValidationRules, validate };
