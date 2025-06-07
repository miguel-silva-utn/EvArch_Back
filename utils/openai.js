import 'dotenv/config';
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const evaluateCodeWithOpenAI = async (prompt, studentCode) => {
    const fullPrompt = `
Eres un profesor experto en programación.
Dado el siguiente enunciado del examen:

"${prompt}"

Y el siguiente código del estudiante:

${studentCode}

Evalúalo con base en:
- Correctitud del código.
- Funcionalidad completa.
- Claridad y estilo.
- Uso de estructuras adecuadas.
- Si en el código del estudiante solo está el código de ayuda incluído en el enunciado, poner de nota 1.
- Si en el enunciado está escrito parte del código como ayuda, guía o plantilla, no se considera en la puntuación, solo se considerará el código que escribió el estudiante.
- Será considerado aprobado (6) si cumplió mínimo con el 60% del código pedido (sin contar co el código que haya sido proporcionado en el código), es decir, si se piden 4 funciones, por lo menos 3 deben estar bien escritas y desarrolladas.
- Si alguna función o pregunta está parcial o mal constestada, no se considerará en la nota, es decir, si de 10 preguntas o funciones constetó todas, pero solo 2 funcionan correctamente, el estudiante estará desaprobado con 2.
- Analiza bien el ingreso de datos y su validación, por ejemplo si debe ingresar algún dato a una variable o a un arreglo.
- Debes ser muy estricto con estas reglas.
- Si el archivo está vacio, mostrar el mensaje: Archivo vacio. Luego poner 1 de nota.
- Si hay muchos errores, equivalente al 50% o más del código, poner de nota 2 o menos.
- Nunca considerar el código de ayuda que se incluya en el enunciado del examen para la nota, por más que compile bien, eso no es esfuerzo del alumno.

Devuelve un JSON con esta estructura:

{
    "score": número entero entre 1 y 10,
    "comments": "Comentario corto, conciso y breve sobre los criterios y la nota asignada"
}
    `;

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: fullPrompt }],
        temperature: 0.3
    });

    const jsonString = response.choices[0].message.content;
    return JSON.parse(jsonString);
};
