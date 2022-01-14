import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class Inchirieri extends Sequelize.Model{}

    Inchirieri.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },
        perioada:{
            type:Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Perioada can not be null!'
                },
                notEmpty:{
                    msg:'Perioada can not be empty!'
                },
            },
        },

        total:{
            type:Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'Total can not be null!'
                },
                notEmpty:{
                    msg:'Total can not be empty!'
                },
            },
        }
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Inchirieri;
};