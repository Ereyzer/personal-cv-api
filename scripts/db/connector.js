import { mongoose } from "mongoose";

import { getEnv } from "../config/getEnv.js";
import { AboutCollection } from "../../app/src/db/models/about.ts";
// ${mongo}${user}:${pwd}@${url}/${db}?arg=value&arg=value

export class ConnectorDB {
    #varsEnv = {
        MONGODB: 'MONGODB',
        MONGODB_USER: 'MONGODB_USER',
        MONGODB_PASSWORD: 'MONGODB_PASSWORD',
        MONGODB_PORT: 'MONGODB_PORT',
        MONGODB_DB: 'MONGODB_DB',
        APP_HOST: 'APP_HOST'

    }
    constructor() {
        this.mongo = this.getVar(this.getvarsEnv().MONGODB);
        this.host = this.getVar(this.getvarsEnv().APP_HOST);
        this.port = this.getVar(this.getvarsEnv().MONGODB_PORT);
        this.user = this.getVar(this.getvarsEnv().MONGODB_USER);
        this.pwd = this.getVar(this.getvarsEnv().MONGODB_PASSWORD);
        this.db = this.getVar(this.getvarsEnv().MONGODB_DB);

        this.mongoUrl = `${this.mongo}${this.host}:${this.port}/${this.db}`;
    }

    getvarsEnv() {
        return this.#varsEnv;
    }

    getVar(name, defaultValue = undefined) {
        const value = process.env[name];

        if (value) return value;
        if (defaultValue) return defaultValue;
        throw new Error(`Missing process.env.${name}`);
    }

    connectMongoDB = async () => {
        try {
            this.connection = await mongoose.connect(this.mongoUrl);
            // await mongoose.connect('mongodb://localhost:27017');

            console.log('Mongo connection successfully established!');
        } catch (e) {
            console.log('Error while setting up mongo connection', e);
        }
    }

    disconnectMongoDB = async () => {
        try {
            await mongoose.connection.close();
            console.log('Mongo disconnected successfully');

        } catch (e) {
            console.log(`Error disconection ${e}`);

        }
    }

    // addAbout = async () => {
    //     // console.log(this.connection);

    //     const about = await AboutCollection.find();
    //     console.log(about);

    // }

    innitDB = async () => {
        try {
            await this.connectMongoDB();
            // await this.newDB()
            console.log('new DB created');

        } catch (e) {
            console.log('Error creation new DB', e);

        }
    }

}