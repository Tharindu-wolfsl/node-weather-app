

console.log("Weather site is online!")



const form=document.querySelector('form')
const input=document.querySelector('input')
const msg1=document.querySelector('#message-1')
const msg2=document.querySelector('#message-2')


msg1.textContent=''
msg2.textContent=''

form.addEventListener('submit',(e)=>{
   msg1.textContent='loading...'

   //e=event
   //to prevent default refresh of page on form submit
   e.preventDefault()
   fetch('http://localhost:3000/weather?address='+input.value).then((response)=>{

    response.json().then((data)=>{
       if(data.error){
            msg1.textContent=''
            msg2.textContent=data.error
         }
       else{
        msg1.textContent=data.location
        msg2.textContent=data.forecast
       }
     
    })
})
})


