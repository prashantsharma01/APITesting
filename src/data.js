const supertest = require('supertest');
const value = require('../src/files');
const result = require('../src/api');
const { expect } = require('chai');


class data{   
    details1 = {
        "external_id" : "DEMO_TEST001",
        "name" : "Team Demo Test Station 001",
        "latitude" : 33.33,
        "lngitude" : -122.43,
        "altitude" : 222
    }

    details2 = {
        "external_id" : "DEMO_TEST002",
        "name" : "Team Demo Test Station 001",
        "latitude" : 44.44,
        "lngitude" : -122.44,
        "altitude" : 111
    }

    errorMessage = {
        cod: 401,
        message: 'Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.'
      }

     async withoutAPIKey(){
        const request = supertest(value.urlPath)
        const path = value.path
        const res = await request
             .post(`${path}?appid=${value.key}`)
             .set({
                'Content-Type': 'application/json',
            })
            .send(this.details1)
         if (JSON.stringify(res.body) == JSON.stringify(this.errorMessage)) {
            console.log("**************** SCENARIO 1 ***********************"); 
            console.log(res.body);
            console.log("*******************************************************"); 
         } else {
            console.log("**************** SCENARIO 1 ***********************");
            console.log("somthing went wrong");
            console.log("*******************************************************"); 
         }       
    }

    async registerData1(responseCode){
        const request = supertest(value.urlPath)
        const path = value.path
        const res = await request
            .post(`${path}?appid=${value.key}`)
            .set({
                'Content-Type': 'application/json',
            })
            .send(this.details1)
        if (res.statusCode == responseCode) {
            console.log("**************** SCENARIO 2 ***********************");
            console.log("first data saved successfully");
            const data = JSON.stringify(res.body)
            let id1 = data.substring(7, 31);
            result.result1 = id1
            
        }
        else {
            console.log("**************** SCENARIO 2 ***********************");
            console.log("error in saving first data");
            console.log(res.statusCode);
            console.log(result.result1);
        }
    
    }
    async registerData2(responseCode){
        const request = supertest(value.urlPath)
        const path = value.path
        const res = await request
            .post(`${path}?appid=${value.key}`)
            .set({
                'Content-Type': 'application/json',
            })
            .send(this.details2);
        if (res.statusCode == responseCode) {
            console.log("second data saved successfully");
            const data = JSON.stringify(res.body)
            let id2 = data.substring(7, 31);
            result.result2 = id2
            console.log("*******************************************************"); 
        }
        else {
            console.log("error in second saving data");
            console.log(res.statusCode);
            console.log(result.result2);
            console.log("*******************************************************"); 
        }
        
    }

    async verifyData1(){

        const request = supertest(value.urlPath)
        const path = value.path
        const res = await request
            .get(`${path}/${result.result1}?appid=${value.key}`)
            if((res.statusCode == 401) || (res.statusCode == 404)){
                console.log("**************** SCENARIO 3 ***********************");
                console.log(`first data was not stored in DB and error code is ${res.statusCode}`) 
            }else{
                console.log("**************** SCENARIO 3 ***********************");
                console.log("first data was stored successfully in DB");
            }
                    
    }

    async verifyData2(){

        const request = supertest(value.urlPath)
        const path = value.path
        const res = await request
            .get(`${path}/${result.result2}?appid=${value.key}`)
            if((res.statusCode == 401) || (res.statusCode == 404)){
                console.log(`Second data was not stored in DB and error code is ${res.statusCode}`)
                console.log("*******************************************************");  
            }else{
                console.log("Second data was stored successfully in DB");
                console.log("*******************************************************"); 
            }
    }
  
}
module.exports = new data();