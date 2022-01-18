
export default class InchiriereService{
      
    constructor({Inchirieri},{sequelize}){
          this.inchiriere = Inchirieri;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let rez = await this.inchiriere.findAll();
     
        if(rez.length == 0){
            throw new Error("Nu exista Inchirieri in baza de date!");
        }
 
        return rez;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let rez = await this.inchiriere.findByPk(id);
        
        if(!rez){
            throw new Error("Nu exista Inchireire cu acest id!");
        }
        return rez;

    }
    
    getRentalsByPersonId = async(customerId)=>{

        let rez = await this.inchiriere.findAll({
            where:{
                persoana_id: customerId
            },
            include:{
                all:true
            },
            order:[['id','DESC']],
            limit:5
        });

        if(rez){
            return rez;
        }else{
            throw new Error("Nu s-au gasit inchirieri facute de acest customer!");
        }

    }

    join = async()=>{

        let rez = await  this.inchiriere.findAll({
            include: { 
                all: true,
            },
            order: [['id', 'DESC']],
        });

        if(rez){
            return rez;
        }else{
            throw new Error("Nu s-a putut face join-ul!");
        }


    }

    create= async(aux)=>{

        if(aux.perioada == null || aux.total == null || aux.persoana_id == null || aux.masina_id == null){
            throw new Error("Propietati invalide!");
        }
        if(!aux.perioada){
            throw new Error('Campul Perioada este gol!');
        }
        else if(!aux.total){
            throw new Error('Campul Total este gol!');
        }
        else if(!aux.persoana_id){
            throw new Error('Campul persoana_id este gol!');
        }
        else if(!aux.masina_id){
            throw new Error('Campul masina_id este gol!');
        }
        else{
            await this.inchiriere.create(aux);

        }

    }

    delete=async(id)=>{
        let rez = await this.getById(id);
                
        if(rez){
            await rez.destroy();
        }else{
            throw new Error("Nu s-a gasit Inchireire cu acest ID pentru a putea fii stearsa!");
        }
    }

    update= async(id, user)=>{
        let rez = await this.getById(id);
        
        if(user.perioada == '' && user.total=='' && user.persoana_id == '' && user.masina_id == ''){
            throw new Error("Nu exista propietati pentru update!");
        }else if(user.perioada == null || user.total == null || user.persoana_id == null || user.masina_id == null){
            throw new Error("Propietati invalide!");
        }

        if(rez){
            
            if(user.perioada){
                rez.perioada = user.perioada;
            }
            if(user.total){
                rez.total = user.total;
            }
            if(user.persoana_id){
                rez.persoana_id = user.persoana_id;
            }
            if(user.masina_id){
                rez.masina_id = user.masina_id;
            }

            await rez.save();

        }else{
            throw new Error("Nu s-a gasit Inchiriere cu acest ID pentru a putea face Update!");
        }
    }




}