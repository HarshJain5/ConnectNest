const express=require('express')
const cors = require('cors');
const app=express()
require('dotenv').config()
require('./dbconfiguration/dbconfiguration')
require("./jobs/remiderJobs");

app.use(cors({origin: process.env.FRONTEND_URL || "http://localhost:3000"}));
app.use(express.json()); // To parse JSON request body

// Routers
const authRouter = require('./routers/AuthRouter');
const paymentRouter = require('./routers/PaymentRouter')
const adminRouter = require('./routers/AdminRouter');
const residentRouter = require('./routers/ResidentRouter');
const superAdminRouter = require('./routers/SuperAdminRouter');

// Route Prefixes
app.use('/api/auth', authRouter);             // register, login
app.use('/api/payment', paymentRouter)
app.use('/api/admin', adminRouter);           // admin dashboard, add user
app.use('/api/resident', residentRouter);     // user actions
app.use('/api/super-admin', superAdminRouter); // approve/reject admins





const path = require("path");

// Serve React build
app.use(express.static(path.join(__dirname, "client", "build")));

// Catch-all route (SPA support)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT,()=>{console.log(`server is running on port ${process.env.PORT}`)})

