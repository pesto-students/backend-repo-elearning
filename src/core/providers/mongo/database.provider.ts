export const mongoDbProvider = [
    MongooseModule.forRootAsync({
        useFactory: () => ({
            uri: process.env.MONGODB_URI,
        }),
    }),
];