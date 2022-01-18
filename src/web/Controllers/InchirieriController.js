
import  express from "express";


export default class InchiriereController{

     constructor(InchiriereService,app){

         this.inchiriereService = InchiriereService;

         this.route = express.Router();

         app.use("/api/v1/rentals", this.route);

         this.getAll();
         this.getById();
         this.create();
         this.delete();
         this.update();
         this.joinAll();
         this.getRentalsByPersonId();
         
         this.catchErr();
     }


     getAll= async ()=>{

         this.route.get("/", async (req,res,next)=>{
             try{

                let rez = await this.inchiriereService.getAll();

                res.status(200).json(rez);

             }catch(e){
                 next(e);
             }
             
         });

    }

    getById= async()=>{
        this.route.get("/:id", async (req,res,next)=>{
            try{
                let {id}= req.params;

                let rez = await this.inchiriereService.getById(id);

                res.status(200).json(rez);

            }catch(e){
                next(e);
            }

         });
    }

    getRentalsByPersonId = async()=>{
        this.route.get("/by-person-id/:id", async (req,res,next)=>{
            try{
                let {id}= req.params;

                let rez = await this.inchiriereService.getRentalsByPersonId(id);

                res.status(200).json(rez);

            }catch(e){
                next(e);
            }

         });
    }

    joinAll= async()=>{
        this.route.get("/join/join", async (req,res,next)=>{
            try{

                let rez = await this.inchiriereService.join();

                res.status(200).json(rez);

            }catch(e){
                next(e);
            }

         });
    }

    create = async()=>{
        this.route.post("/",async(req,res,next)=>{
            try{
                let rez = req.body;

                await this.inchiriereService.create(rez);

                res.status(204).end();
            }catch(e){
                next(e);
            }
        });
    }

    delete = async()=>{
        this.route.delete("/:id", async(req,res,next)=>{
            try{
                let {id} = req.params;
                
                await this.inchiriereService.delete(id);

                res.status(204).end();

            }catch(e){
                next(e);
            }
        });
    }

    update = async()=>{
        this.route.put("/:id", async(req,res,next)=>{
            try{
                let {id} = req.params;
                let user = req.body;
                
                await this.inchiriereService.update(id,user);

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

