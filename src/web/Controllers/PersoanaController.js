
import  express from "express";


export default class PersoanaController{

     constructor(persoanaService,app){

         this.persoanaService = persoanaService;

         this.route = express.Router();

         app.use("/api/v1/persons", this.route);

         this.getAllPersons();
         this.getPersonById();
         this.createPerson();
         this.deletePerson();
         this.updatePerson();

         this.catchErr();
     }


     getAllPersons= async ()=>{

         this.route.get("/", async (req,res,next)=>{
             try{

                let pers = await this.persoanaService.getAll();

                res.status(200).json(pers);

             }catch(e){
                 next(e);
             }
             
         });

    }

    getPersonById= async()=>{
        this.route.get("/:id", async (req,res,next)=>{
            try{
                let {id}= req.params;

                let pers = await this.persoanaService.getById(id);

                res.status(200).json(pers);

            }catch(e){
                next(e);
            }

         });
    }

    createPerson = async()=>{
        this.route.post("/",async(req,res,next)=>{
            try{
                let pers = req.body;

                await this.persoanaService.createP(pers);

                res.status(204).end();
            }catch(e){
                next(e);
            }
        })
    }

    deletePerson = async()=>{
        this.route.delete("/:id", async(req,res,next)=>{
            try{
                let {id} = req.params;
                let per = await this.persoanaService.deleteP(id);

                res.status(204).end();

            }catch(e){
                next(e);
            }
        });
    }

    updatePerson = async()=>{
        this.route.put("/:id", async(req,res,next)=>{
            try{
                let {id} = req.params;
                let user = req.body;
                
                await this.persoanaService.updateP(id,user);

                res.status(204).end();
                
            }catch(e){
                next(e);
            }
        });
    }

    catchErr=async()=>{
        this.route.use((err,req,res,next)=>{
            res.status(err.status || 500);
    
            res.json({
               error:{
                   message:err.message
               }
            });
         });
    }

}

