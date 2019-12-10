// 分解statement函数
// 首先，我需要检查一下，如果我将这块代码提炼到自己的一个函数里，
// 有哪些变量会离开原本的作用域。
// 在此示例中，是perf、play和thisAmount这3个变量。
// 前两个变量会被提炼后的函数使用，但不会被修改，那么我就可以将它们以参数方式传递进来。
// 那些会被修改的变量。这里只有唯一一个—thisAmount，
// 因此可以将它从函数中直接返回。我还可以将其初始化放到提炼后的函数里。
// 修改后的代码如下所示：

// 现在原statement函数可以直接调用这个新函数来初始化thisAmount。
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play);
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
    // print line for this order
    result += ` ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;

  function amountFor(perf, play) {
    let thisAmount = 0;
    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    return thisAmount;
  }
}

// 马上编译并执行一遍测试，看看有无破坏了其他东西

// 完成提炼函数（106）手法后，我会看看提炼出来的函数，看是否能进一步提升其表达能力
// 第一件事就是给一些变量改名，使它们更简洁
// 比如将thisAmount重命名为result。
