import app from "../app/app.js";
import cluster from "cluster";
import {cpus} from "os";

const cores = cpus().length;
const port = process.env.PORT || 8080;

if(cluster.isPrimary){
    console.log("Master cluster stated at PID",process.pid);
    for(let i=0;i<cores;i++){
        cluster.fork();
    }
    cluster.on("exit",(worker,code,signal)=>{
        console.log(`Worker ${worker.process.pid} died, code ${code} & signal ${signal}`);
    });
}else{
    const server = app.listen(port,()=>{
        console.log("Server up at localhost:",port);
    });
    server.on("error",(error)=>{
        console.log(`Error in server, pid:${process.pid}, error ${error}`);
    });
}