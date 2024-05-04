import express from 'express'

import {createUser,updateUser,deleteUser,getUserById,getAllUsers,getUserByNombreDocumento} from '../controllers/employesController.js'




const employeesRouter = express.Router()




employeesRouter.get('/api/employees',getAllUsers)
employeesRouter.post('/api/createEmployee',createUser)
employeesRouter.get('/api/getUserbyId/:id',getUserById)
employeesRouter.post('/api/login',getUserByNombreDocumento)
employeesRouter.patch('/api/updateEmployee/:id',updateUser)
employeesRouter.delete('/api/deleteEmployee/:id',deleteUser)



export {employeesRouter}
