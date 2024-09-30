import { Router } from 'express';

import { generaJWT, passportCall } from '../utils.js';
import { home, loginView, perfil, registroView } from '../controller/views.controller.js';
import { isAuthenticated, isGuest } from '../middleware/auth.js';

export const router=Router()

router.get("/", home)

router.get('/registro',registroView);
router.get('/login', isGuest, loginView );

router.get('/current', passportCall("current"),  perfil);

