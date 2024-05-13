import express from 'express'
import { createAdmin, getAdminByNombreDocumento } from '../controllers/adminController.js'






const adminRouter = express.Router()





adminRouter.post('/api/createAdmin',createAdmin)
adminRouter.post('/api/loginAdmin',getAdminByNombreDocumento)




export {adminRouter}
