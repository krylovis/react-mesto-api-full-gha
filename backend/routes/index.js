const router = require('express').Router();
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { requestLogger, errorLogger } = require('../middlewares/logger');
// const { corsSettings } = require('../middlewares/corsSettings');
const NotFoundError = require('../custom-errors/NotFoundError');

const { PAGE_NOT_FOUND } = require('../utils/constants');
const usersRoutes = require('./usersRoutes');
const cardsRoutes = require('./cardsRoutes');
const authRoutes = require('./authRoutes');

const allowedCors = [
  'http://mesto.krylovis.students.nomoredomains.xyz',
  'https://mesto.krylovis.students.nomoredomains.xyz',
  'http://api.krylovis.students.nomoredomains.xyz',
  'https://api.krylovis.students.nomoredomains.xyz',
  'localhost:3000',
];

router.use(requestLogger);

router.use(cookieParser());
router.options('*', cors({
  origin: allowedCors,
  credentials: true,
}));
router.use(cors({
  origin: allowedCors,
  credentials: true,
}));
// router.use(corsSettings);
router.use('/', authRoutes);
router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);

router.use(errorLogger);
router.use(errors());
router.use('*', (req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND)));

module.exports = router;
