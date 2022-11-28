import Medicamento from '../models/medicamento'
import LDatabase from './ldatabase'
import React, {Component} from 'react';

export default class Database{
    constructor(){
        this.table_name = 'tb_medicamentos'
        this.db = new LDatabase('tcc2.db', (db) => {
            db.executeQuery(`CREATE TABLE IF NOT EXISTS ${this.table_name}( id integer PRIMARY KEY AUTOINCREMENT, nome text, horario TEXT, data_inicial TEXT, qtde integer, qtde_dias integer, ativo boolean);`, () => {}, (error) => {console.log(error)})
        console.log("Banco de dados iniciado")
        })
    }
    getAllMedicine(){
        return new Promise(resolve => {
            console.log('teste')
            var query = `SELECT * FROM ${this.table_name}`;
            console.log(query)
            this.db.executeQuery(query, (_, res) => {
                console.log(res.rows._array);
                resolve(res.rows._array)
            }, (e)=>console.log(e))
        })
    } 
    
    getAllMedicineById(id){
        return new Promise(resolve => {
            this.db.executeQuery(`SELECT * FROM ${this.table_name} WHERE id = ${id}`, (_, res) => {
                resolve(res.rows._array)
            }, (e)=>console.log(e))
        })
    }

    insertNewMedicine(medicamento=new Medicamento()){
        return new Promise(resolve => {
            console.log(medicamento);
            if(medicamento){
                const query = `INSERT INTO ${this.table_name} (nome, horario, data_inicial, qtde, qtde_dias, ativo) VALUES ('${medicamento.nome}', '${medicamento.horario}', '${medicamento.data_inicial}', ${medicamento.qtde}, ${medicamento.qtde_dias}, ${medicamento.ativo});`
                console.log(query)
                this.db.executeQuery(query, ()=>resolve(true), (_)=>{console.log(_); resolve(false)})
            }else resolve(false)
        })
    }

    deleteMedicineById(id){
        return new Promise(resolve => {
            if(id != null && id != 0){
                console.log('entrou')
                const query = `DELETE FROM ${this.table_name} WHERE id = ${id};`
                this.db.executeQuery(query, ()=>resolve(true), (_)=>{console.log(_); resolve(false)})
            }else resolve(false)
            
        })
    }

}
