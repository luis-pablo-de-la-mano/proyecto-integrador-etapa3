import express from 'express';
import routerProducts from './router/products.js';
// import ProductModelMongoDB from './model/products-mongodb.js';
import config from './config.js';
import multer from 'multer'; //descomento multer para ver sis gue funcionando desde aca
//import routerImages from './router/images.js';
//import path from 'path';

// ProductModelMongoDB.connectDB();
// await ProductModelMongoDB.connectDB();
// ProductModelMongoDB.connectDB();

const app = express();

//app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public', { extensions: ['html', 'htm'] }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Caso de uso Products
app.use('/api/products', routerProducts);
//app.use('./router/images', routerImages); // esto lo comento para ver si sifue funcionando en server

//******************************************/
// app para imprimir en consola el carrito  /
//***************************************** /

app.post('/cart', (req, res)=>{
    console.log(req.body);
    res.redirect('./#/inicio')
})

//********************************* */
// Funciones para subir las imagenes /
//******************************** * /
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        const error = null;
        cb(error, './public/images');
    },
    filename: function (req, file, cb) {
        // console.log(file);
        const error = null;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(error, `${uniqueSuffix}-${file.originalname.toLowerCase().replaceAll(' ', '-')}`);
    }
});
//
const fileFilter = (req, file, cb) => {
    const validaMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    const mimeTypeIsOk = validaMimeTypes.includes(file.mimetype);
    cb(null, mimeTypeIsOk);
};
//
const upload = multer({ storage, fileFilter});


app.post('/alta', upload.single('archivo'), function (req, res, next) {  // aca antes era /upload
    if (req.file) {
        console.log(req.file);
        res.redirect('./#/alta') // res.send('<h1>¡Gracias!</h1><p>Archivo subido con éxito.</p>');    //esto no estaba comentado o lo comentaba para q no redireccione
        // res.send({status: 'ok'});
    } else {
        res.status(415).send('<h1>Se produjo un error.</h1>');
        // res.status(415).send({ error: 'Se produjo un error.' });
    }
});

//************************************* */

const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}.`));
server.on('error', error => console.log('Error al iniciar el servidor Express: ' + error.message));
