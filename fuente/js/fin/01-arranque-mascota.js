import { mascotGreet, mascotInit, mascotMount } from "../02-progreso-xp-racha-mascota.js";
import { profilesInit } from "../03-perfiles.js";
import { cuentaInicializar } from "../11-cuentas.js";
mascotInit(); profilesInit(); mascotMount(); mascotGreet();

try { cuentaInicializar(); } catch(e){}
