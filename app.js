const heros = [{
  name: 'wizard',
  type: '🧙‍♂️',
  hp: 200,
  dam: 5,
  alive: true
},
{
  name: 'fairy',
  type: '🧚‍♀️',
  hp: 200,
  dam: 5,
  alive: true
},
{
  name: 'ninja',
  type: '🥷',
  hp: 200,
  dam: 5,
  alive: true
},
{
  name: 'king',
  type: '🤴',
  hp: 200,
  dam: 5,
  alive: true
}
]

let gold = 0

const boss = {
  names: ['wooly', 'dodo'],
  name: 'wooly',
  hp: 100,
  maxHp: 100,
  dam: 5,
  lvl: 0
}

function health(heroName) {
  console.log(heroName);
  if (gold >= 5) {
    let camp = heros.find(hero => hero.name == heroName)
    // @ts-ignore
    if (camp.alive) {
      // @ts-ignore
      camp.hp += 5
      gold--
      // @ts-ignore
      if (camp.hp >= 200) {
        // @ts-ignore
        camp.hp = 200
        gold++
      }
    } else {
      // @ts-ignore
      camp.hp = 0
    }
  }
  drawHeros()
}

function attack() {
  let presHeros = heros.filter(hero => hero.alive)
  presHeros.forEach(hero => boss.hp -= hero.dam)
  checkBoss()
  drawBoss()
}


function bossAttack() {
  let aliveHeros = heros.filter(hero => hero.alive)
  if (aliveHeros.length == 0) {
    drawHeros()
    return
  }
  // console.log(aliveHeros)
  let randomindex = Math.floor(Math.random() * aliveHeros.length)
  aliveHeros[randomindex].hp -= boss.dam
  aliveHeros.forEach(hero => {
    if (hero.hp <= 0) {
      hero.alive = false
      hero.hp = 0
    }
  })
  drawHeros()
}

function checkBoss() {
  if (boss.hp <= 0) {
    let randomindex = Math.floor(Math.random() * boss.names.length)
    boss.name = boss.names[randomindex]
    boss.lvl++
    boss.maxHp = 134 * boss.lvl
    boss.dam = 5 * boss.lvl
    boss.hp = boss.maxHp
    gold += boss.lvl + 5
  }
}

function drawBoss() {
  let bossElement = document.getElementById('boss')
  // @ts-ignore
  let bossHp = document.getElementById('health-bar')
  // @ts-ignore
  let bossImg = bossElement.querySelector('.big')
  // @ts-ignore
  let bossName = bossElement.querySelector('.boss-name')
  // @ts-ignore
  let bosslvl = bossElement.querySelector('i')


  // @ts-ignore
  bossHp.setAttribute(`style`, `background-color: lightblue; width: ${(boss.hp / boss.maxHp * 100).toFixed(0)}%;`)
  switch (boss.name) {
    case 'wooly':
      // @ts-ignore
      bossImg.innerText = '🦣'
      break;
    case 'dodo':
      // @ts-ignore
      bossImg.innerText = '🦤'
  }
  // @ts-ignore
  bossName.innerText = boss.name
  // @ts-ignore
  bosslvl.innerText = `defeated Bosses/lvl: ${boss.lvl.toString()}`
  drawGold()
}

function drawHeros() {
  heros.forEach(hero => {
    let heroElement = document.getElementById(hero.name)
    // @ts-ignore
    let faceElement = heroElement.querySelector('#face')
    // @ts-ignore
    let heroHp = heroElement.querySelector('.hp')
    // @ts-ignore
    let heroName = heroElement.querySelector('p')

    // @ts-ignore
    heroHp.innerText = hero.hp.toString()
    // @ts-ignore
    faceElement.innerText = hero.type
    if (!hero.alive) {
      // @ts-ignore
      heroName.innerText = 'died'
    } else {
      // @ts-ignore
      heroName.innerText = hero.name
    }
  })
  drawGold()
}

function drawGold() {
  let theGold = document.getElementById('gold')
  // @ts-ignore
  theGold.innerText = `Gold: ${gold.toString()}`
}

drawBoss()
drawHeros()
setInterval(bossAttack, 5000)

addEventListener("keydown", (event) => { if (event.key == '1') { health(heros[0].name) } });
addEventListener("keydown", (event) => { if (event.key == '2') { health(heros[1].name) } });
addEventListener("keydown", (event) => { if (event.key == '3') { health(heros[2].name) } });
addEventListener("keydown", (event) => { if (event.key == '4') { health(heros[3].name) } });

addEventListener("keydown", (event) => { if (event.key == ' ') { attack() } });
