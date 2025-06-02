export const parseFilename = (filename) => {
    const name = filename.split('.')[0]; // apellidos_nombres
    const [apellido, nombre] = name.split('_');
    return { apellido, nombre };
};
