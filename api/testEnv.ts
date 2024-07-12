    import dotenv from 'dotenv';
    import path from 'path'; // Add this line to import the 'path' module

    // Load environment variables from .env file
    // dotenv.config();



    // console.log('Loaded environment variables:', process.env.MONGO_URI);


    // Load environment variables from .env file
    dotenv.config({ path: path.resolve(__dirname, '../.env') });

    console.log('Loaded environment variables UserName:', process.env.UserName);
    console.log('Loaded environment variables MONGO_URI:', process.env.MONGO_URI);
