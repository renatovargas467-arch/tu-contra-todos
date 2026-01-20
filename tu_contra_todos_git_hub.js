// Carpeta lista para GitHub Pages: tu-contra-todos

/* =====================================
   index.html
===================================== */
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tu Contra Todos - Versión Épica</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<h1>Tu Contra Todos - Versión Épica</h1>
<div id="device">
<h2>¿En qué dispositivo juegas?</h2>
<button onclick="setDevice('pc')">PC</button>
<button onclick="setDevice('mobile')">Móvil</button>
</div>
<div id="menu" style="display:none">
<h2>Menú Principal</h2>
<button onclick="startGame('survival')">Jugar</button>
<button onclick="showMissions()">Misiones</button>
<button onclick="showShop()">Tienda</button>
</div>
<div id="missions" style="display:none">
<h2>Misiones</h2>
<p id="m1">Matar 5 enemigos (0/5) → +50 monedas</p>
<p id="m2">Recolectar 20 monedas (0/20) → +1 skin</p>
<p id="m3">Abrir 3 cofres (0/3) → Arma especial</p>
<button onclick="backMenu()">Volver</button>
</div>
<div id="shop" style="display:none">
<h2>Tienda</h2>
<p>Pistola rápida (100 monedas)</p>
<button onclick="buyGun()">Comprar</button>
<p>Skin roja (150 monedas)</p>
<button onclick="buySkin()">Comprar</button>
<p>Arma especial (300 monedas)</p>
<button onclick="buySpecialGun()">Comprar</button>
<button onclick="backMenu()">Volver</button>
</div>
<div id="screen" style="display:none">
<div id="game"></div>
<div id="hud">❤️ Vida: <span id="life">100</span> | ⚡ Energía: <span id="energy">100</span> | 🪙 Monedas: <span id="coins">0</span> | Kills: <span id="kills">0</span></div>
<button onclick="backMenu()">⬅ Menú</button>
</div>
<div id="gameover" style="display:none">
<h2>💀 GAME OVER 💀</h2>
<button onclick="backMenu()">Volver al menú</button>
</div>
<div id="joystick"><div id="stick"></div></div>
<script src="script.js"></script>
</body>
</html>

/* =====================================
   style.css
===================================== */
body{margin:0;font-family:Arial;background:#0b1a2a;color:#fff;text-align:center}
button{padding:10px 20px;margin:8px;border:none;border-radius:10px;background:#1e90ff;color:#000;font-weight:bold}
#game{width:90vw;max-width:700px;height:60vh;max-height:450px;margin:auto;position:relative;background:#3a9;border-radius:16px;overflow:hidden}
#player{width:40px;height:60px;background:#1e90ff;position:absolute;border-radius:10px}
.enemy{width:40px;height:60px;background:#ff3b3b;position:absolute;border-radius:10px}
.bullet{width:8px;height:8px;background:#fff;position:absolute;border-radius:50%}
.coin{width:16px;height:16px;background:gold;position:absolute;border-radius:50%}
.chest{width:30px;height:30px;background:orange;position:absolute;border-radius:8px}
#hud{margin:10px}
#joystick{display:none;position:fixed;bottom:40px;left:40px;width:100px;height:100px;background:rgba(255,255,255,0.2);border-radius:50%}
#stick{width:40px;height:40px;background:#1e90ff;border-radius:50%;position:absolute;left:30px;top:30px}

/* =====================================
   script.js
===================================== */
let device='pc',mode='',life=100,energy=100,coins=0,kills=0;
let px=300,py=200,bullets=[],enemies=[],coinsOnMap=[],chestsOnMap=[];
let enemyInterval,coinInterval,chestInterval;
let lastHitTime=0,HIT_COOLDOWN=800,ENEMY_DAMAGE=50;
const game=document.getElementById('game');
const coinsEl=document.getElementById('coins');
const killsEl=document.getElementById('kills');
const lifeEl=document.getElementById('life');
const energyEl=document.getElementById('energy');
coinsEl.textContent=coins; energyEl.textContent=energy;

function setDevice(d){device=d;document.getElementById('device').style.display='none';document.getElementById('menu').style.display='block';if(d==='mobile'){document.getElementById('joystick').style.display='block';}}
function startGame(m){mode=m;life=100;energy=100;kills=0;px=300;py=200;bullets=[];enemies=[];coinsOnMap=[];chestsOnMap=[];game.innerHTML='';lifeEl.textContent=life;killsEl.textContent=kills;energyEl.textContent=energy;document.getElementById('menu').style.display='none';document.getElementById('screen').style.display='block';clearInterval(enemyInterval);clearInterval(coinInterval);clearInterval(chestInterval);enemyInterval=setInterval(spawnEnemy,2500);coinInterval=setInterval(spawnCoin,3000);chestInterval=setInterval(spawnChest,10000);loop();}
function backMenu(){clearInterval(enemyInterval);clearInterval(coinInterval);clearInterval(chestInterval);document.getElementById('screen').style.display='none';document.getElementById('missions').style.display='none';document.getElementById('shop').style.display='none';document.getElementById('gameover').style.display='none';document.getElementById('menu').style.display='block';localStorage.setItem('coins',coins);}
function showMissions(){document.getElementById('menu').style.display='none';document.getElementById('missions').style.display='block';}
function showShop(){document.getElementById('menu').style.display='none';document.getElementById('shop').style.display='block';}
function spawnPlayer(){const p=document.createElement('div');p.id='player';game.appendChild(p);updatePlayer();}
function updatePlayer(){const p=document.getElementById('player');if(!p)return;p.style.left=px+'px';p.style.top=py+'px';}
function spawnEnemy(){const e=document.createElement('div');e.className='enemy';e.x=Math.random()*600;e.y=Math.random()*350;e.style.left=e.x+'px';e.style.top=e.y+'px';game.appendChild(e);enemies.push(e);}
function spawnCoin(){const c=document.createElement('div');c.className='coin';c.x=Math.random()*640;c.y=Math.random()*390;c.style.left=c.x+'px';c.style.top=c.y+'px';game.appendChild(c);coinsOnMap.push(c);}
function spawnChest(){const c=document.createElement('div');c.className='chest';c.x=Math.random()*650;c.y=Math.random()*400;c.style.left=c.x+'px';c.style.top=c.y+'px';game.appendChild(c);chestsOnMap.push(c);}
function shoot(x,y,tx,ty){const b=document.createElement('div');b.className='bullet';b.x=x;b.y=y;const dx=tx-x,dy=ty-y,d=Math.hypot(dx,dy)||1;b.vx=dx/d*7;b.vy=dy/d*7;b.style.left=b.x+'px';b.style.top=b.y+'px';game.appendChild(b);bullets.push(b);}
document.addEventListener('click',e=>{if(mode==='')return;const r=game.getBoundingClientRect();shoot(px+20,py+30,e.clientX-r.left,e.clientY-r.top);});
let keys={};document.addEventListener('keydown',e=>keys[e.key.toLowerCase()]=true);document.addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
function loop(){if(life<=0){endGame();return;}if(keys['w'])py-=4;if(keys['s'])py+=4;if(keys['a'])px-=4;if(keys['d'])px+=4;px=Math.max(0,Math.min(650,px));py=Math.max(0,Math.min(390,py));updatePlayer();
bullets.forEach((b,bi)=>{b.x+=b.vx;b.y+=b.vy;b.style.left=b.x+'px';b.style.top=b.y+'px';enemies.forEach((e,ei)=>{if(Math.abs(b.x-e.x)<20&&Math.abs(b.y-e.y)<30){e.remove();b.remove();enemies.splice(ei,1);bullets.splice(bi,1);kills++;coins+=10;killsEl.textContent=kills;coinsEl.textContent=coins;}});});
const now=Date.now();enemies.forEach(e=>{const dx=px-e.x,dy=py-e.y,d=Math.hypot(dx,dy)||1;e.x+=dx/d*1.5;e.y+=dy/d*1.5;e.style.left=e.x+'px';e.style.top=e.y+'px';if(Math.abs(e.x-px)<30&&Math.abs(e.y-py)<40){if(now-lastHitTime>HIT_COOLDOWN){life-=ENEMY_DAMAGE;lastHitTime=now;lifeEl.textContent=life;}}});
coinsOnMap.forEach((c,ci)=>{if(Math.abs(c.x-px)<30&&Math.abs(c.y-py)<40){c.remove();coinsOnMap.splice(ci,1);coins+=5;coinsEl.textContent=coins;}});
chestsOnMap.forEach((c,ci)=>{if(Math.abs(c.x-px)<30&&Math.abs(c.y-py)<40){c.remove();chestsOnMap.splice(ci,1);coins+=20;coinsEl.textContent=coins;alert('¡Cofre abierto! +20 monedas');}});
requestAnimationFrame(loop);}
function endGame(){document.getElementById('screen').style.display='none';document.getElementById('gameover').style.display='block';}
function buyGun(){if(coins>=100){coins-=100;alert('Pistola rápida equipada');coinsEl.textContent=coins;}}
function buySkin(){if(coins>=150){coins-=150;const p=document.getElementById('player');if(p)p.style.background='red';alert('Skin equipada');coinsEl.textContent=coins;}}
function buySpecialGun(){if(coins>=300){coins-=300;alert('Arma especial equipada');coinsEl.textContent=coins;}}