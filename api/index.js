import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import evaluateRoutes from './routes/evaluateRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/evaluate', evaluateRoutes);

app.get('/', (req, res) => {
    res.send('Servidor activo ✅');
});

// Exporta como función para Vercel:
export default app;

// Verifica que el servidor responde en server.js:
app.get('/api/ping', (req, res) => {
    res.send('Servidor activo desde Vercel');
});
