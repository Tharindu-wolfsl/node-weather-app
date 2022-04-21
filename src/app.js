const express=require('express')
const path=require('path')
const hbs=require('hbs')
const { request } = require('http')
const geoCode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')


//path to runnig file folder
//console.log(__dirname)

//path to the running file
//console.log(__filename)

//define path to the index.html
const pathToPublic=path.join(__dirname,'../public')

//create custom path to views directory
const viewsPath=path.join(__dirname,'../templates/views')

//create partials path
const partialPath=path.join(__dirname,'../templates/partials')

const app=express()

const port=process.env.PORT || 3000

//define views path
app.set('views',viewsPath)

app.set('view engine','hbs')


hbs.registerPartials(partialPath)

//load content of index.html path to root route
app.use(express.static(pathToPublic))


app.get('',(req,res)=>{

    res.render('index',{
        title:'Weather',
        text:'Weather text',
        name:'Tharindu'
    })

})

app.get('/help',(req,res)=>{

  res.render('help',{

    title:'Help',
    text:'Help text',
    name:'Tharindu'

  })

})

app.get('/about',(req,res)=>{

    // res.send('<h3 style="color:red;">This is about page</h3>')

    res.render('about',{
        title:'About',
        text:'About text',
        name:'Tharindu'
    })

})
app.get('/weather',(req,res)=>{

    if(!req.query.address){

        return res.send({

            error:'Please provide address!'

        })

    }
    
geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{

    if(error){
        return res.send({error})
    }

    forecast(latitude,longitude,(error,{location,weather,temperature,wind}={})=>{

        if(error){

            return res.send({error})

        }
        
    res.send({

        address:req.query.address,
        location:location,
        forecast:'it is currently '+temperature.temp+' degrees out. There can be '+weather.main+' and have '+wind.speed+' wind speed today.',
 

    })
        // console.log(chalk.blue.inverse("location:",data.location))
        // console.log(chalk.green.inverse("it is currently "+foreCastData.temperature.temp+" degrees out. There can be "+foreCastData.weather.main+" today."));
    })
})
})



//404 error message

// app.get('/help/*',(req,res)=>{

//     res.send("error 404! help page not found")
// })

// app.get('*',(req,res)=>{

//     res.send("error 404 ! page not found")

// })

//404 error using handle bars

app.get('/help/*',(req,res)=>{

    res.render('404error',{

        title:'error 404',
        error:'help page not found',
        name:'tharindu'

    })

})

app.get('*',(req,res)=>{

res.render('404error',{
    title:'error 404',
    error:'page not found !',
    name:'tharindu'
})

})

//create server

//https://wolfsl-weather-app.herokuapp.com/
app.listen(port,()=>{
    console.log("Server is online on port: "+port)
})
