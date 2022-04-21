const request=require('request')

const geoCode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoid29sZnNsIiwiYSI6ImNsMXdiMDhtazBldWgza3FjdnRxaGczYmwifQ.0In9bNZncfucrTSsnrnUKw&limit=1'


    request({url:url,json:true},(error,response)=>{

        if(error){

            callback('Unable to connect to location services!',undefined);
        }
        else if(response.body.features.length===0){

            callback('Location is not found! please try again.',undefined)
        }
        else{

            callback(undefined,{

                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name

            })

        }

    })
}

module.exports=geoCode