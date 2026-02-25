const mongoose=require('mongoose')

mongoose.connect(`${process.env.DBURL}/${process.env.DBNAME}`)
.then(()=>{
    console.log(`Successfully Connected to DB ${process.env.DBNAME}`)
})
.catch((error)=>{
    console.log(error.message)
})