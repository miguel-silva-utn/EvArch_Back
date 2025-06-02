import fs from 'fs';
import path from 'path';
import { parseFilename } from '../utils/parser.js';
import { evaluateCodeWithOpenAI } from '../utils/openai.js';

export const evaluateFiles = async (req, res) => {
    const files = req.files;
    const prompt = req.body.prompt;

    const results = [];

    for (const file of files) {
        try {
            const content = fs.readFileSync(file.path, 'utf-8');
            const { apellido, nombre } = parseFilename(file.originalname);

            const evaluation = await evaluateCodeWithOpenAI(prompt, content);

            results.push({
                apellido,
                nombre,
                calificacion: evaluation.score,
                comentarios: evaluation.comments
            });
        } catch (error) {
            console.error(`Error evaluando el archivo ${file.originalname}:`, error);

            const { apellido, nombre } = parseFilename(file.originalname);

            results.push({
                apellido,
                nombre,
                calificacion: 0,
                comentarios: 'Error al evaluar este archivo. Intenta nuevamente.'
            });
        } finally {
            // Siempre eliminar el archivo temporal, aunque haya error
            fs.unlinkSync(file.path);
        }
    }

    res.json(results);
};
