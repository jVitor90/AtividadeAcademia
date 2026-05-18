import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import Logger from './config/logger';
import routes from './routes'; // Importa as rotas centralizadas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares de Segurança ---
app.use(helmet());
app.use(cors());
app.use(express.json());

// --- Rate Limit ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo de 100 requisições por IP
  standardHeaders: true, // retorna info do rate limit nos headers `RateLimit-*`
  legacyHeaders: false,  // desativa os headers `X-RateLimit-*` antigos
  message: { error: 'Muitas requisições. Tente novamente em 15 minutos.' },
  handler: (req, res, next, options) => {
    Logger.warn(`Rate limit atingido para IP: ${req.ip}`);
    res.status(options.statusCode).json(options.message);
  },
});
app.use(limiter);

// --- Middleware de Logs (Morgan + Winston) ---
const stream = {
  write: (message: string) => Logger.http(message.trim()),
};
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream }));

// --- Rotas ---
app.use(routes);

// --- Inicialização ---
app.listen(PORT, () => {
  Logger.info(`🚀 Servidor a correr na porta ${PORT}`);
});