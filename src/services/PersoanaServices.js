
export default class PersoanaService{
      
    constructor({Persoana},{sequelize}){
          this.persoana = Persoana;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let pers = await this.persoana.findAll();
     
        if(pers.length == 0){
            throw new Error("Nu exista persoane in baza de date!(get)");
        }
 
        return pers;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let pers = await this.persoana.findByPk(id);
        
        if(!pers){
            throw new Error("Nu exista Persoana cu acest id!");
        }
        return pers;

    }

    createP= async(per)=>{
        
        let allPersons = await this.persoana.findAll();

        if(per.name == null || per.email == null || per.password == null || per.phone == null){
            throw new Error("Propietati invalide!");
        }
        if(!per.name){
            throw new Error('Campul Nume este gol!');
        }
        else if(!per.email){
            throw new Error('Campul Email este gol!');
        }
        else if(!per.password){
            throw new Error('Campul Password este gol!');
        }
        else if(!per.phone){
            throw new Error('Campul Phone este gol!');
        }
        else{
            if(allPersons){
                for(let p of allPersons){
                    if(p.name == per.name){
                        throw new Error("Acest nume exista deja in baza de date!");
                    }
                }
            }

            await this.persoana.create(per);

        }

    }

    deleteP=async(id)=>{
        let per = await this.getById(id);
                
        if(per){
            await per.destroy();
        }else{
            throw new Error("Nu s-a gasit Persoana cu acest ID pentru a putea fii stearsa!");
        }
    }

    updateP= async(id, user)=>{
        let per = await this.getById(id);
        
        if(user.name == '' && user.email=='' && user.password == '' && user.phone == ''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(per){
            
            if(user.name){
                per.name = user.name;
            }
            if(user.email){
                per.email = user.email;
            }
            if(user.password){
                per.password = user.password;
            }
            if(user.phone){
                per.phone = user.phone;
            }

            await per.save();

        }else{
            throw new Error("Nu s-a gasit Persoana cu acest ID pentru a putea face Update!");
        }
    }




}