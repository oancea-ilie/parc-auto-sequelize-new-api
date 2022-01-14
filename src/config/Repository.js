
import fs from "fs"
import path from "path";

import { Sequelize } from "sequelize";
import Persoana from "../model/persoana.js"
import Inchirieri from "../model/inchirieri.js"
import Masina from "../model/masina.js"


export default  class Repository {

        config =()=>  new Promise((resolve,reject)=>{
                fs.readFile(path.normalize("src\\config\\config.json"),'utf8',(err,data)=>{
                    if(err){
                        reject(err);
                    }else{
                        const {development}=JSON.parse(data);
                        resolve(development);
                    }
                });
            });


        createDb= async()=>{
            try{
               let development = await this.config();
      
               let sequelize = new Sequelize(development.database, development.username, development.password, {
                  host: development.host,
                     dialect: development.dialect
                }

               );
  
              let db={
                models:{}
              }

              db.sequelize = sequelize;
              db.Sequelize = Sequelize;
              db.models.Persoana = Persoana(sequelize);
              db.models.Masina = Masina(sequelize);
              db.models.Inchirieri = Inchirieri(sequelize);

              // ASSOCIATII!!! 

              // o persoana poate aparea in mai multe inchirieri.
              db.models.Persoana.hasMany(db.models.Inchirieri,{
                  onDelete: 'CASCADE',
                  as:'fk_persoana_id',
                  foreignKey:{
                    fieldName:'persoana_id',
                    allowNull:false
                  },
              });

              // o inchiriere poate avea o singura persoana, persoana_id
              db.models.Inchirieri.belongsTo(db.models.Persoana,{
                as:'fk_persoana_id',
                foreignKey:{
                  fieldName:'persoana_id',
                  allowNull:false
                },
              });

              // o masina, poate aparea in mai multe inchirieri sub forma de 
              //masina_id.
              db.models.Masina.hasMany(db.models.Inchirieri,{
                onDelete: 'CASCADE',
                as:'fk_masina_id',
                foreignKey:{
                  fieldName:'masina_id',
                  allowNull:false
                },
              });

              // o inchiriere poate avea o singura masina ca si masina_id
              db.models.Inchirieri.belongsTo(db.models.Masina,{
                as:'fk_masina_id',
                foreignKey:{
                  fieldName:'masina_id',
                  allowNull:false
                },
              });

              return db;
              
            }catch(e){
              throw new  Error(e);

      
            }
        }

};