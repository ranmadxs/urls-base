import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

export const Database: MongoConnectionOptions = {
  type: 'mongodb',
  url: process.env.URL_DB,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
