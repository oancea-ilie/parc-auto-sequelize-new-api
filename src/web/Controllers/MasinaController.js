
import  express from "express";


export default class MasinaController{

     constructor(MasinaService,app){

         this.masinaService = MasinaService;

         this.route = express.Router();

         app.use("/api/v1/cars", this.route);

         this.getAll();
         this.getById();
         this.create();
         this.delete();
         this.update();
         this.sort();
         
         this.catchErr();
     }


     getAll= async ()=>{

         this.route.get("/", async (req,res,next)=>{
             try{

                let rez = await this.masinaService.getAll();

                res.status(200).json(rez);

             }catch(e){
                 next(e);
             }
             
         });

    }

    sort = async ()=>{
        this.route.get("/sort/:id", async (req,res,next)=>{
            try{
                let {id} = req.params;
               let rez = await this.masinaService.sort(id);

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

                let rez = await this.masinaService.getById(id);

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

                await this.masinaService.create(rez);

                res.status(204).end();
            }catch(e){
                next(e);
            }
        })
    }

    delete = async()=>{
        this.route.delete("/:id", async(req,res,next)=>{
            try{
                let {id} = req.params;
                
                await this.masinaService.delete(id);

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
                
                await this.masinaService.update(id,user);

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

