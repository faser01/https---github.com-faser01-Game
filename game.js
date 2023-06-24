class Creature {
    static number = 0;
    constructor(name, healthPoints, damage){
      this.id = ++Creature.number;
      this.name = name;
      this.healthPoints = healthPoints;
      this.damage = damage;
    }
    get getId(){
      return this.id;
    }
    defeat(){
      console.log(`${this.name} Терпит поражение`);
    }
  }

  class Player extends Creature {
    #lvl = 1;
    get getLvl(){
      return this.#lvl*10; // умножаем на 10 для лучшей видимости движения
    }
    attack(other){
      other.healthPoints = other.healthPoints - this.damage;
      console.log(`Атаки ${this.name} нанесли ${other.name} - ${this.damage} урона`);
      if(other.healthPoints <= 0){
        other.defeat();
        this.#lvl++;
        console.log(`${this.name} Достиг уровня ${this.#lvl}`);
        return true;
      }
      return false;
    }
  }

  class Enemy extends Creature {
    attack(other){
      other.healthPoints = other.healthPoints - this.damage;
      console.log(`Атаки  ${this.name} нанесли ${other.name} - ${this.damage} урона`);
      if(other.healthPoints <= 0){
        other.defeat();
        return true;
      }
      return false;
    }
  }

  const player = new Player("Player", 800, 10);
  const enemy = new Enemy("Enemy", 500, 5);

  let winner = null;
  let speed = 20;
  let leftBound = (window.innerWidth - 50) / 2 - 100;
  let rightBound = (window.innerWidth - 50) / 2 + 100;

  document.getElementById("player").style.left = (window.innerWidth - 50) / 2 - 100 + "px";
  document.getElementById("enemy").style.left = (window.innerWidth - 50) / 2 + 100 + "px";

  function moveObjects() 
  {
      let playerPos = parseInt(document.getElementById("player").style.left) || 0;
      let enemyPos = parseInt(document.getElementById("enemy").style.left) || rightBound;
      
      if (playerPos <= leftBound || playerPos >= rightBound) {
          speed = -speed;
      }
      playerPos += speed;
      document.getElementById("player").style.left = playerPos + "px";
      
      if (enemyPos <= leftBound || enemyPos >= rightBound) {
          speed = -speed;
      }
      enemyPos -= speed;
      document.getElementById("enemy").style.left = enemyPos + "px";
      
      if (!winner) {
          if (player.attack(enemy)) {
              winner = player;
          } else if (enemy.attack(player)) {
              winner = enemy;
          }
          setTimeout(moveObjects, 200);
      } else {
          document.getElementById("winner").textContent = `Победитель ${winner.name}!`;
      }
  }