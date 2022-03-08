'use strict';

export default class API_connector{

    static api_base_url             = "https://api.leavers.ru/api"
    static api_base_dev_url         = "##"
    static api_url                  = API_connector.api_base_url

    //static token                    = localStorage.getItem("user-token");
    static token                    = "nea";
    static public_token             = "fcef778d93abb393e648033462ebebe012c2492d9eef237d9619806712820ad3b9745cb09d7cbfa840758d3f77d8b2e7ba1dc8c4130b57af8121616747d8f974fca0d1b2f312f8324afed3b7c2f76b400a07b52e381d35f1b5dd9da23068bc75dc5404ca9c01a5f31e75a9d918a47437aceba94b8ec7d1ca8c7e1062c7284b2a";


    hello(){
        console.log('api hello');
    }


    async post(url, data, json=true, isPublicQuery = false){

        //let tk = localStorage.getItem("user-token");

        let headers = {
            'Authorization': 'Bearer '+ API_connector.token,
            'Content-Type': 'application/json'
        }

        // общий запрос, не от какого-либо театра, без токена
        if (isPublicQuery){

            data.global.key = API_connector.public_token;

            headers = {
                'Content-Type': 'application/json'
            }
        }

        let jj = JSON.stringify(data);
        console.log(jj);

        let r = await fetch(API_connector.api_url + url,
            {
                method: "POST",
                body: jj,
                headers: headers
            })

        //console.log(r);

        if (json){
            //console.log(r.json);
            return r.json();

        }
        else{
            return r.text();
        }
    }


    async put(url, data){

        //let tk = localStorage.getItem("user-token");

        let headers = {
            'Authorization': 'Bearer '+ API_connector.token,
            'Content-Type': 'application/json'
        }

        let jj = JSON.stringify(data);
        console.log(jj);

        let r = await fetch(API_connector.api_url + url,
            {
                method: "PUT",
                body: jj,
                headers: headers
            })

        //console.log(r);
        return r.json();

    }

    async delete(url){

        //let tk = localStorage.getItem("user-token");

        let headers = {
            'Authorization': 'Bearer '+ API_connector.token,
            'Content-Type': 'application/json'
        }

        let r = await fetch(API_connector.api_url + url,
            {
                method: "DELETE",
                headers: headers
            })
        return r.json();

    }

    async get(url, json=true){

       // let tk = localStorage.getItem("user-token");
        //console.log(tk);

        let r = await fetch(API_connector.api_url + url,
            {
                method: "GET",
                headers: {
                    //'Authorization': 'Bearer '+ API_connector.token,
                    'Authorization': 'Bearer '+ API_connector.public_token,
                    'Content-Type': 'application/json'
                }
            })

        if (json){
            return r.json();
        }
        else{
            return r.text();
        }

    }

    async loadCompanyList(i = 1){

        const qs = require('qs');

        let query = qs.stringify({
            pagination: {
                page: i,
                pageSize: 100,
            },
        }, {
            encodeValuesOnly: true,
        });

        console.log('11');
        let t = await this.get('/companies?'+query);
        return t

    }

    async loadPlayhouses(){

        const post_data = {

            global:{
                action:"find",
                module:"common"
            },
            data:{
                mode:{
                    target:"general",
                    part:"playhouse",
                    act:"list"
                }
            }
        };

        let t = await this.post('/common', post_data, true, true);
        return t.data;

    }

    async addPeople(data){

        const post_data = {

            global:{
                format:"raw",
                action:"add",
                module:"people",
                version:2,
            },

            data: data

        }

        let t = await this.post('/people', post_data);
        return t.data
    }

    async loadLayout_SP(layout){

        let t = await this.get('/layout/'+layout+'/sp');
        return t.data
    }


    async addCompany(data){
        let t = await this.post('/companies', data);
        return t.data
    }

    async updateCompany(data, id){
        let t = await this.put('/companies/'+id, data);
        return t.data
    }

    async deleteCompany(id){
        let t = await this.delete('/companies/'+id);
        return t.data
    }









}

