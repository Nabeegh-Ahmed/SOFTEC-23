

import { Router } from 'express'
import userAuthRouter from './user.route'

const router = Router()

router.use("/users", userAuthRouter);

export default router