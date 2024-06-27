import { app } from "./app.js";
import { PORT } from "./constant.js";
import { dbConnect } from "./db/index.js";



dbConnect()

app.listen(PORT, ()=>{
    console.log("server is run")
})