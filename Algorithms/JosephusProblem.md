![image](https://user-gold-cdn.xitu.io/2019/4/22/16a4370e8f058b21?w=1200&h=510&f=jpeg&s=126591)
> 图片来源于百度

> 据说著名犹太历史学家 Josephus 有过以下的故事:
  在罗马人占领乔塔帕特后，39 个犹太人与 Josephus 及他的朋友躲到一个洞中，39 个犹太人决定宁愿死也不要被敌人抓到，于是决定了一个自杀方式，
  41 个人排成一个圆圈，由第 1 个人开始报数，每报数到第 3 人，该人就必须自杀，然后再由下一个重新报数，直到所有人都自杀身亡为止。
  然而 Josephus 和他的朋友并不想遵从，他将朋友与自己安排在第 16 个与第 31 个位置，于是逃过了这场死亡游戏。


##### 常规方法 使用数组递归
```js
  class JosephusProblem {

    constructor(num, rule) {
      this.num = num
      this.rule = rule
    }

    startGame() {
      const soldiers = this.generateSoldiers()
      const survivor = this.startKill()(soldiers, this.rule)
      return survivor
    }

    generateSoldiers() {
      const soldiers = []
      for (let i = 0; i < this.num; i++) {
        const soldiersMess = {
          name: `solier-${i+1}`,
          isAlive: true,
        }
        soldiers.push(soldiersMess)
      }
      return soldiers
    }

    startKill() {
      let count = 0
      const kill = (soldiers, rule) => {
        for (let i = 0; i < soldiers.length; i++) {
          const soldier = soldiers[i]
          const { isAlive, name } = soldier
          if (isAlive) {
            count += 1
            if (count === rule) {
              soldier.isAlive = false
              count = 0
              console.log(`${name} has been suicide`)
            }
          }
          const survivor = soldiers.filter(soldier => soldier.isAlive)
          if (survivor.length === 2) {
            return survivor
          }
          if (i === soldiers.length - 1) {
            i = 0
            return kill(soldiers, rule)
          }
        }
      }
      return kill
    }

  }

  const p = new JosephusProblem(41, 3)
  const survivor = p.startGame()
```


##### 链表方法  [关于链表以及链表的实现](./LinkedList.md)


```js

  class JosephusProblem {
    constructor(num, rule) {
      this.num = num
      this.rule = rule
    }

    generateSoldiers() {
      const link = new LinkedList()
      for (let i = 0; i < this.num; i++) {
        if (i === 0) {
          link.insert(`soldier-${i + 1}`, 'head')
        } else {
          link.insert(`soldier-${i + 1}`, `soldier-${i}`)
        }
      }
      return link
    }

    startKill(soldiers) {
      while (soldiers.length() !== 2) {
        soldiers.movePointer(this.rule)
        soldiers.remove(soldiers.pointer.data)
      }
      return soldiers
    }

    startGame() {
      const soldiers = this.generateSoldiers()
      const survivor = this.startKill(soldiers)
      return survivor
    }
  }


  const p = new JosephusProblem(41, 3)
  const survivor = p.startGame()

```