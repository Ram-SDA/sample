/**
 * Created by devbinu on 30/06/18.
 */


var express = require('express');
var mysql = require('mysql');

var nodemailer = require('nodemailer');
var Promise = require("bluebird");

var router = express.Router();

var myDsConfig = require("./dsconfig");



var connectionParams = myDsConfig.MYSQL;

var toEmails = "agilavasu@dartexon.com,binu@dronasys.com";

function dsPaginate(queryObj,callBack)
{


    console.dir(connectionParams);
    var con = mysql.createConnection(connectionParams);
    // con.on('error', function(err) {
    //     console.log("[mysql error]",err);
    // });


    con.connect(function(err)  {
        if (err) {
            console.log("MYSQL ERROR "+err);
            callBack(err,"","");
        }
        console.log("Connected!");

        //get count

        var query = queryObj.query + " limit ? OFFSET ?";
        queryObj.queryParams.push(queryObj.limit,queryObj.offset);

        query = mysql.format(query, queryObj.queryParams);



        var finalQuery = queryObj.countQuery + "; " + query;
        console.log(finalQuery);

        con.query(finalQuery, function (err, result, fields) {
            if (err) {
                callBack(err,result, fields);
                return;
            }


            callBack(err,result,fields);
        });

    });
}


function dsSendmail(subject,message) {
    // binu@dronasys.com
    // when using gmail, reduce the security level, to allow less secure apps
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount(function(err, account) {
        // create reusable transporter object using the default SMTP transport

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'noreplydartexon@gmail.com',
                pass: 'Crude123#'
            }
        });

        transporter.sendMail({
            from: 'noreplydartexon@gmail.com',
            to: toEmails,
            subject: subject,
            html: message,
        }, function(err, info)  {
            console.log("ERROR "+err);
            console.log(info.envelope);
            console.log(info.messageId);
            // res.send('Mail sent');
            return;
        });
    });

}



/* GET users listing. */
router.get('/', function(req, res, next) {



    var paginatedRes = {
        limit:10,
        page:1,
        total:0,
        offset:0,
        result:[],
    }

    var type = '';
    if (typeof req.query.type !== "undefined") type = req.query.type;

    if (typeof req.query.page !== "undefined") paginatedRes.page = req.query.page;
    paginatedRes.offset = (paginatedRes.page-1)*paginatedRes.limit;

    var queryObj = {
        countQuery: "SELECT count(*) as total FROM scm where `transstatus` = 'Open' AND `etastatusabbr` = '"+ type +"'",
        query:"SELECT * FROM scm where `transstatus` = 'Open' AND `etastatusabbr` = '"+ type +"'",
        queryParams:[],
        limit:paginatedRes.limit,
        offset:paginatedRes.offset
    }



    dsPaginate(queryObj,function (err, result, fields){
        if (err) { res.status(500).send( "Server Error");return;  }
        //console.log(result);
       // res.send(result);

        paginatedRes.total = result[0][0]['total'];
        paginatedRes.result = result[1];

        console.log(paginatedRes);
        res.send(paginatedRes);
    })



});



router.get('/metrics', function(req, res, next) {

    var myResult = {
        open: 0,
        completedOnTime: 0,
        completedLate: 0,
        openOnTime: 0,
        openLate: 0,
        openTooLate: 0,
    };

    var con = mysql.createConnection(connectionParams);

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        con.query(
            "SELECT count(*) as 'open' FROM scm where `transstatus` = 'Open';" +
            "SELECT count(status) AS 'completedOnTime' FROM scm where `transstatus` = 'Closed' AND `etastatusabbr` = 'onTime';" +
            "SELECT count(status) AS 'completedLate' FROM scm where `transstatus` = 'Closed' AND (`etastatusabbr` = 'late' OR `etastatusabbr` = 'TooLate');" +

            "SELECT count(*) as 'openOnTime' FROM scm where `transstatus` = 'Open' AND `etastatusabbr` = 'onTime';" +
            "SELECT count(*) as 'openLate' FROM scm where `transstatus` = 'Open' AND `etastatusabbr` = 'late';" +
            "SELECT count(*) as 'openTooLate' FROM scm where `transstatus` = 'Open' AND `etastatusabbr` = 'TooLate';", function (err, result, fields) {

                if (err) { res.send(500, "Server Error"); return; }
                console.log(result[0][0]['onTime']);


                myResult.open = result[0][0]['open'] ;
                myResult.completedOnTime = result[1][0]['completedOnTime'];
                myResult.completedLate = result[2][0]['completedLate'] ;

                myResult.openOnTime = result[3][0]['openOnTime'] ;
                myResult.openLate = result[4][0]['openLate'] ;
                myResult.openTooLate = result[5][0]['openTooLate'];

                console.log(myResult);
                res.send(myResult);
        });


    });

});


router.get('/sendmail', function(req, res, next) {

    var caseIds = [];
    if (typeof req.query.caseIds !== "undefined") caseIds = req.query.caseIds.split(',');

    console.dir(caseIds);

    const doStuff = Promise.coroutine(function*(){
        caseIds.forEach(function(item){
            console.log('Working on item '+item);

            var subject = "Regarding progress of Case Id: "+item;
            var message = "<html><body><p>Hi</p>" +
                "<p>Case Id:<strong>"+item+"</strong>  is pending with you and it has crossed the average turn around time. We request you to take action as early as possible.</p>" +
                "<p>Regards, </p>" +
                "<p>Order Processing team</p>";
            "</body></html>";

            dsSendmail(subject,message);
        });

    });

    doStuff(); // do all the above, assumes promisification

    console.log('sendmail');
    console.log(caseIds);
    res.send({success:1});


});




module.exports = router;