//===================
// Puerto
//==================
process.env.PORT = process.env.PORT || 3000;

//===================
// Entorno
//==================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//===================
// DB
//==================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://mmarin:i4UoTcbV4Xk2a6vn@cluster0-bcx9f.azure.mongodb.net/cafe';
}

process.env.URLDB = urlDB;