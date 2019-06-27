import app from './app';

require('dotenv').config();


app.listen(process.env.PORT, () => {
    console.log(`Corriendo en el puerto: ${process.env.PORT}`);
})

export default app;
