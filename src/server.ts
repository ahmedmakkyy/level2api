/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose from "mongoose";
import app from "./app";
import config from "./config";


async function main() {
  try {
    await mongoose.connect(config.db_url as string);
  
   
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${process.env.PORT}`)
    })
  }
  catch (err) {
    console.log(err);
  } 
  }

main()  
/* eslint-disable @typescript-eslint/no-var-requires */  