const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://kashishsolanki229_db_user:1dpxUXlnYp3L6XTm@cluster0.nruv35j.mongodb.net/quizdb?appName=Cluster0")
.then(()=>{
    console.log("Connected to mongodb")
})
.catch((e)=>{
    console.log("Couldn't connect to mongodb", e)
})
const questionSchema=mongoose.Schema({
    question:String,
    options:[String],
    answer:Number
})
const Question=mongoose.model("Question", questionSchema)

const scoreSchema=mongoose.Schema({
    username:String,
    score:Number,
    total:Number,
    date:{
        type:Date,
        default:Date.now
    }
})

const Score=mongoose.model("Score", scoreSchema)

app.get("/questions", async(req, res)=>{
    const questions=await Question.find()
    res.json(questions)
})

app.post("/questions", async(req, res)=>{
    const newQ=req.body
    await Question.insertOne(newQ)
    res.json({message:"Question added successfully"})
})

app.put("/questions/:id", async(req, res)=>{
    const {id}=req.params
    const {question, options, answer}=req.body
    await Question.findByIdAndUpdate(id, {question, options, answer})
    res.json("Updated successfully")
})

app.delete("/questions/:id", async(req, res)=>{
    const {id}=req.params
    await Question.findByIdAndDelete(id)
    res.json("Deleted successfully")
})

app.post("/scores", async(req, res)=>{
    const newScore=req.body
    await Score.insertOne(newScore)
    res.json({message:"Score added successfully"})
})

app.get("/scores/:username", async(req, res)=>{
    const {username}=req.params
    const scores=await Score.find({username}).sort({date:-1})
    res.json(scores)
})


app.listen(4000, ()=>{
    console.log("Server is running on port 4000")
})