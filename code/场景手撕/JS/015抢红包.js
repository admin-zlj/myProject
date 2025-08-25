function getRandomByRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class RedPackage {
  allMoney = 0; // 总金额（元）
  curMoneyCent = 0; // 剩余金额（分）
  count = 0; // 总个数
  minMoney = 1; //单个红包最小金额 1分

  constructor(allMoney, count) {
    if (!allMoney || !count || allMoney <= 0 || count <= 0) {
      throw new Error('allMoney or count is not valid');
    }
    if (this.minMoney * count > allMoney * 100) {
      throw new Error('allMoney is not enough');
    }
    this.allMoney = allMoney;
    this.curMoneyCent = allMoney * 100;
    this.count = count;
  }

  openRedPackage() {
    if (this.count <= 0) {
      console.log('红包已抢光');
      return 0;
    }
    // 随机生成当前红包的金额(分)
    let randomMoney = 0;
    if (this.count === 1) {
      // 只有一个红包
      randomMoney = this.curMoneyCent;
    } else {
      const min = this.minMoney;
      const max = this.curMoneyCent - min * (this.count - 1);
      randomMoney = getRandomByRange(min, max);
    }

    this.count--; // 减少红包个数
    this.curMoneyCent -= randomMoney; // 减去抢到的红包金额
    console.log(`抢到的红包金额: ${randomMoney / 100}`);
    return randomMoney / 100; // 返回抢到的红包金额
  }
}

const redPackage = new RedPackage(100, 5);
redPackage.openRedPackage(); // 随机输出一个金额，例如：20
redPackage.openRedPackage(); // 随机输出一个金额，例如：15
redPackage.openRedPackage(); // 随机输出一个金额，例如：10
redPackage.openRedPackage(); // 随机输出一个金额，例如：5
redPackage.openRedPackage(); // 随机输出一个金额，例如：50
redPackage.openRedPackage(); // 输出: "红包已抢光"
