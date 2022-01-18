
import { QueryTypes } from "sequelize";

export default class MasinaService{
      
    constructor({Masina},sequelize){
          this.masina = Masina;
          this.sequelize = sequelize;
    }
    getAll= async ()=>{
          
      try{
        let rez = await this.masina.findAll();
     
        if(rez.length == 0){
            throw new Error("Nu exista Masina in baza de date!");
        }
 
        return rez;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let rez = await this.masina.findByPk(id);
        
        if(!rez){
            throw new Error("Nu exista Masina cu acest id!");
        }
        return rez;

    }

    sort = async(id)=>{
        let sortare = 'DESC';

        if(id == 'populare'){
            console.log('INTRA');
            let cars = await this.sequelize.query(`
            select *,  count(masina_id) as popularitate from tema_2ass.masinas
            inner join inchirieris i on masinas.id = i.masina_id
            group by masina_id
            order by popularitate desc;`, { 
                type: QueryTypes.SELECT 
            });

            if(cars){
                return cars;
            }else{
    
                throw new Error("Nu s-au gasit Masini Populare!");
            }

        }else{
            if(id =='marca'){
                sortare = 'ASC';
            }
    
            let cars = await this.masina.findAll({order: [[id, sortare]]});
    
            if(cars.length >0){
                return cars;
            }else{
    
                throw new Error("Nu s-au gasit Masini Sortate!");
            }
        }

    }

    create= async(aux)=>{

        if(aux.img == null || aux.marca == null || aux.model == null || aux.an == null || aux.pret == null){
            throw new Error("Propietati invalide!");
        }
        if(!aux.img){
            throw new Error('Campul Img este gol!');
        }
        else if(!aux.marca){
            throw new Error('Campul Marca este gol!');
        }
        else if(!aux.model){
            throw new Error('Campul Model este gol!');
        }
        else if(!aux.an){
            throw new Error('Campul An este gol!');
        }
        else if(!aux.pret){
            throw new Error('Campul Pret este gol!');
        }
        else{
            await this.masina.create(aux);

        }

    }

    delete=async(id)=>{
        let rez = await this.getById(id);
                
        if(rez){
            await rez.destroy();
        }else{
            throw new Error("Nu s-a gasit Masina cu acest ID pentru a putea fii stearsa!");
        }
    }

    update= async(id, user)=>{
        let rez = await this.getById(id);
        
        if(user.img == '' && user.marca=='' && user.model == '' && user.an == '' && user.pret == ''){
            throw new Error("Nu exista propietati pentru update!");
        }else if(user.img == null || user.marca == null || user.model == null || user.an == null || user.pret == null){
            throw new Error("Propietati invalide!");
        }

        if(rez){
            
            if(user.img){
                rez.img = user.img;
            }
            if(user.marca){
                rez.marca = user.marca;
            }
            if(user.model){
                rez.model = user.model;
            }
            if(user.an){
                rez.an = user.an;
            }
            if(user.pret){
                rez.pret = user.pret;
            }

            await rez.save();

        }else{
            throw new Error("Nu s-a gasit Masina cu acest ID pentru a putea face Update!");
        }
    }




}