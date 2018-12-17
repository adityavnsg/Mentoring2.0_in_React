import React from 'react';
import axios from 'axios';
import btoa from 'btoa';

export const getData =
    function(username,password, url,self,callback){
        let encrypt =  btoa(username + ':' + password);
        axios.get(url,{
        headers: { 'Authorization': 'Basic '+ encrypt}
        })
        .then((res) => {
            callback(res,self);
        })
        .catch((err) => {
            callback(err,self);
        });          
        
    };

export const postData =
    function(username,password, url,transferObj,self,callback){
        let encrypt =  btoa(username + ':' + password);
        console.log(transferObj);
        axios.post(url,transferObj,{
        headers: { 'Authorization': 'Basic '+ encrypt}
        })
        .then((res) => {
            callback(res,self);
            })
        .catch((err) => {
            callback(err,self);
        });          
        
    };
