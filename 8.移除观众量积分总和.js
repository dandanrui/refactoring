// TODO: 拆分循环：身兼多职的循环，虽然可以减少循环，但是每当修改循环时，就得多理解几件事情，
// 一次拆分一个循环只做一件事情有利于理解和修改，并且是每个循环更利于使用，如果一个循环只干计算一个值，那么直接返回该值即可，
// 但一个循环干几件事情，就得定义局部变量，返回结构型数据
// 循环很少成为性能的瓶颈， 即使存在，也应该先优化，再优化性能

// next: 拆分循环
function statement(invoice) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    // print line for this order
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += amountFor(perf);
  }
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf.audience);
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;

  // ...
}

// next: 移动语句：让存在关联的语句出现在一起，使代码更容易理解
function statement(invoice) {
  let totalAmount = 0;
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    // print line for this order
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += amountFor(perf);
  }
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf.audience);
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;

  // ...
}

// next: 提炼获取volumeCredits的函数， 测试
function statement(invoice) {
  let totalAmount = 0;
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    // print line for this order
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += amountFor(perf);
  }
  // let volumeCredits = 0;
  // for (let perf of invoice.performances) {
  //   volumeCredits += volumeCreditsFor(perf.audience);
  // }
  let volumeCredits = totalVolumeCredits();
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf.audience);
    }
    return volumeCredits;
  }

  // ...
}

// next: 使用内联变量内联volumeCredits的函数， 测试
function statement(invoice) {
  let totalAmount = 0;
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    // print line for this order
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += amountFor(perf);
  }
  // let volumeCredits = totalVolumeCredits();
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  // result += `You earned ${volumeCredits} credits\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf.audience);
    }
    return volumeCredits;
  }

  // ...
}

/* 总结如上步骤：
1: 使用拆分循环，分离处累加过程
2: 使用移动语句将累加变量的声明和累加过程集中在一起
3: 使用提炼函数提炼处计算总数的函数
4: 使用内联变量完全移除中间变量
*/

//TODO: 提炼totalAmount 循环， 使用移动语句将累加变量的声明和累加过程集中在一起
function statement(invoice) {
  // let totalAmount = 0;
  let result = `Statement for ${invoice.customer}\n`;
  let totalAmount = 0;
  for (let perf of invoice.performances) {
    // print line for this order
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += amountFor(perf);
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  // ...
}

// next: 使用提炼函数提炼处计算总数的函数
function statement(invoice) {
  let result = `Statement for ${invoice.customer}\n`;
  // let totalAmount = 0;
  for (let perf of invoice.performances) {
    // print line for this order
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
    // totalAmount += amountFor(perf);
  }
  let totalAmount = appleSauce();
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  function appleSauce() {
    let totalAmount = 0;
    for (let perf of invoice.performances) {
      totalAmount += amountFor(perf);
    }
    return totalAmount;
  }
  // ...
}

// next: 使用内联变量完全移除中间变量 将appleSauce 修改回名称totalAmount, 去掉多余注释
function statement(invoice) {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
  }
  // let totalAmount = appleSauce();
  // result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  function totalAmount() {
    let totalAmount = 0;
    for (let perf of invoice.performances) {
      totalAmount += amountFor(perf);
    }
    return totalAmount;
  }

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf.audience);
    }
    return volumeCredits;
  }

  // ...
}

// next: 给totalAmount totalVolumeCredits 函数内部变量名改名
function statement(invoice) {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
  }
  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf.audience);
    }
    return result;
  }

  // ...
}
