process.env.PORT = process.env.PORT || 3000; // Esto garantiza de que al hacer deploy no exista problemas con el puerto. Ya que el proveedor asignara la que tiene destinada. La asigna a esa variable de entorno y si es local trabajamos sobre el puerto 3000.

// Caducidad del token ↓
// Leer documentacion de jwt, esto es un token para 30 dias ↓
process.env.CAD_TOKEN = '12h';//60 * 60 * 24 * 30;

//Semilla de desarrollo ↓
process.env.SEED = process.env.SEED || 'SecretSeed'; // El de produccion debe ser totalmente diferente. Y se guarda como variable de entorno...