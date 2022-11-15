const PERSISTENCE_TYPES = {
    TYPE_MEM: 'MEMORY', //  con esta es igual que file
    TYPE_FILE: 'FILE SYSTEM', // con esta funciona agregar y borrar 
    TYPE_MONGODB: 'MONGODB',
};

const config = {
    PORT: 8080,
    PERSISTENCE_TYPE: PERSISTENCE_TYPES.TYPE_MONGODB,
    //MONGODB_CONNECTION_STR: 'mongodb://localhost/ecommerce',
    MONGODB_CONNECTION_STR: 'mongodb+srv://delamano:delamano@cluster0.lmdpl6m.mongodb.net/jugueteriacosmica?retryWrites=true&w=majority',  
                          //'mongodb+srv://juanromeroclases:HolaHola123@cluster0.5wxsavc.mongodb.net/ecommerce?retryWrites=true&w=majority',

    MONGODB_TIMEOUT: 2000   // Valor bajo para testing.
};

export {PERSISTENCE_TYPES, config as default};
