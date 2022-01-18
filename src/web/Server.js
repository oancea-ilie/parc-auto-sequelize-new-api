import express from "express";
import cors from "cors";
import Repository from "../config/Repository.js";
import PersoanaService from "../services/PersoanaServices.js";
import PersoanaController from "./Controllers/PersoanaController.js";
import MasinaService from "../services/MasinaServices.js";
import MasinaController from "./Controllers/MasinaController.js";
import InchiriereService from "../services/Inchiriere.Service.js";
import InchiriereController from "./Controllers/InchirieriController.js";

export default  class Server{

    constructor( ){
        this.app=express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(cors());

        this.repo = new Repository();

        this.app.get('/', (req, res) => {
            res.json({
                message: 'Welcome to the REST API project!',
            });
        });
        
      }

      run= async()=>{

        let db = await this.repo.createDb();

        db.sequelize.sync()
        .then( () => {
               this.app.listen(5000,async () => {
               console.log(`Express server is listening on port 5000`);
            });
        }).then(()=>{
              let personsService =  new PersoanaService(db.models,db.sequelize);
              let personsController = new PersoanaController(personsService,this.app);
              let carsService =  new MasinaService(db.models,db.sequelize);
              let carsController = new MasinaController(carsService,this.app);
              let rentalsService =  new InchiriereService(db.models,db.sequelize);
              let rentalsController = new InchiriereController(rentalsService,this.app);
        });


      }
}