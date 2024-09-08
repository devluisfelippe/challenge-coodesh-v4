import { MongoClient } from "mongodb";

//POR SE TRATAR DE UM DESAFIO, ESTOU DEIXANDO A URL DO BANCO DIRETAMENTE NO CÓDIGO, MAS EM UM CENÁRIO REAL ESTARIA NO .ENV
const mongoClient = new MongoClient('mongodb+srv://admin:admin@api-challenger-coodesh.zessy.mongodb.net/?retryWrites=true&w=majority&appName=api-challenger-coodesh');
const dbConnect = async () => {
    try {
        await mongoClient.connect();
    } catch (error) {
        throw new Error(error.message);
    }
};

const databaseConnected = async (): Promise<{ dbConnection: string }> => {
    try {
        const dbConnected = await db.admin().ping();
        if (dbConnected.ok !== 1) {
            throw new Error('Falha ao tentar se comunicar com banco de dados!');
        }
        return { dbConnection: 'OK' };
    } catch (error) {
        return { dbConnection: error.message };
    }
};

dbConnect();
const db = mongoClient.db('api-challenger-coodesh');

export { db, databaseConnected };
