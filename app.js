const express =require("express");
const app = express();
const ExpressError = require("./ExpressError");

//mioddleware -> response send
// app.use( (req,res, next)=>{
//     console.log("Hii i am 1st mideleware");
//     next();
// } );

// app.use((req,res,next)=>{
//     console.log("hii i am 2nd middleware");
//     next();
// });

//loger - mprgan
// app.use((req,res,next)=>{
//     req.time = (Date.now());
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// });


// app.use("/api", (req,res,next)=>{
//     let {token} = req.query;
//     if(token == "giveaccess"){
//         next();
//     }
//     res.send("Access Denide...!");
// });
// app.get("/api", (req,res)=>{
//     res.send("data");
// });

const CheckToken = (req,res,next)=>{
    let {token} = req.query;
    if(token == "giveaccess"){
        next();
    }
    throw new ExpressError(401, "Access Denide...!");
};

app.get("/api", CheckToken, (req,res)=>{
    res.send("data");
});

app.get("/",(req,res)=>{
    res.send("Hii I am a root");
});

app.get("/random",(req,res)=>{
    res.send("This is a ramdom page");
});

app.get("/err",(req,res)=>{
    abc=abcd;
});

app.get("/admin", (req,res)=>{
    throw new ExpressError(403,"Access to admin is Forbidden");
});

app.use((err,req,res,next)=>{
    let{ status = 500,message = "Some Error"} = err;
    res.status(status).send(message);
});

// app.use((err,req,res,next)=>{
//     console.log("-----ERROR2 MIDDLEWARE-------");
//     next(err);
// });

//404 error -->error handling mioddleware
app.use((req,res,)=>{
    res.status(404).send("Page Not Found...!");
});

app.listen(8080,()=>{
    console.log("server is listing on port no 8080");
});
