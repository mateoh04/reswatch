import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
export default defineConfig({base:process.env.GITHUB_ACTIONS ? '/reswatch/' : '/',server:{host:'0.0.0.0',allowedHosts:true},plugins:[{name:'original-obj',generateBundle(){this.emitFile({type:'asset',fileName:'base.obj',source:readFileSync(new URL('./base.obj',import.meta.url))});}}],build:{rollupOptions:{output:{manualChunks:{three:['three','three/addons/loaders/OBJLoader.js','three/addons/controls/OrbitControls.js','three/addons/environments/RoomEnvironment.js']}}}}});
