/**
 * Created by devbinu on 06/07/18.
 */
/*
binu@dronasys.com
for externalising configs
do not change
 */
var express = require('express');

var DSCONFIG = {}

///// local server
DSCONFIG.CLIENTDOMAIN = 'http://localhost:4200';
DSCONFIG.MYSQL = {

        host: "localhost",
        user: "root",
        password: "singapore",
        database: "dartexon",
        multipleStatements: true
    }


// production server
// DSCONFIG.CLIENTDOMAIN = 'http://35.154.17.69:4200';
// DSCONFIG.MYSQL = {
//
//     host: "dartexondb.cb2zkuyew7cg.ap-south-1.rds.amazonaws.com",
//     user: "dsadmin",
//     password: "plioMANee",
//     database: "dartexon",
//     multipleStatements: true
// }



DSCONFIG.USERS = [
    {id:'1',name:'Admin',email:'admin@dartexon.com',password:'admin'},
    {id:'2',name:'Agilavasu',email:'vasu@dartexon.com',password:'admin'},
    {id:'3',name:'Thiru',email:'thiru@dartexon.com',password:'admin'},
    {id:'3',name:'Ram',email:'ram@dartexon.com',password:'admin'}
];




module.exports = DSCONFIG;