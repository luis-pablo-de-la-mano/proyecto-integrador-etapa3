import express from 'express';
import multer from 'multer';

const app = express();
const routerImages = express.Router();
//********************************* */

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

const fileFilter = (req, file, cb) => {
    const validaMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    const mimeTypeIsOk = validaMimeTypes.includes(file.mimetype);
    cb(null, mimeTypeIsOk);
};

const upload = multer({ storage, fileFilter});

//const app = express();
app.use(express.static('public', { extensions: ['html', 'htm'] }));


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


//const storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//        // console.log(file);
//        const error = null;
//        cb(error, './public/images');
//    },
//    filename: function (req, file, cb) {
//        // console.log(file);
//        const error = null;
//        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//        cb(error, `${uniqueSuffix}-${file.originalname.toLowerCase().replaceAll(' ', '-')}`);
//    }
//});
//
//const fileFilter = (req, file, cb) => {
//    const validaMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
//    const mimeTypeIsOk = validaMimeTypes.includes(file.mimetype);
//    cb(null, mimeTypeIsOk);
//};
//
//const upload = multer({ storage, fileFilter});
//
//routerImages.post('/alta', upload.single('archivo'), function (req, res, next) {  // aca antes era /upload
//    if (req.file) {
//        console.log(req.file);
//        //res.redirect('./#/alta') // res.send('<h1>¡Gracias!</h1><p>Archivo subido con éxito.</p>');    //esto no estaba comentado o lo comentaba para q no redireccione
//        // res.send({status: 'ok'});
//        res.send('<h1>¡Gracias!</h1><p>Archivo subido con éxito.</p>');
//    } else {
//        res.status(415).send('<h1>Se produjo un error.</h1>');
//        // res.status(415).send({ error: 'Se produjo un error.' });
//    }
//});




//export default routerImages;