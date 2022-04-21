const request=require('request');


const forecast=(latitude,longitude,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=f8c337cedd66783d38dbe4576b3fdc46&units=metric'
    //in here response is destructured
    request({url,json:true},(error,{body})=>{

        if(error){
            callback('Unable to connect to the weather services!',undefined);
        }
        else if(!body.main){

            callback('Unable to find the location! please try again',undefined);
        }
        else{

            callback(undefined,{
                location:body.name,
                weather:body.weather[0],
                temperature:body.main,
                wind:body.wind

            })
        }
    })
}


module.exports=forecast