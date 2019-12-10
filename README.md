需求：设想有一个戏剧演出团，演员们经常要去各种场合表演戏剧。通常客户（customer）会指定几出剧目，而剧团则根据观众（audience）人数及剧目类型来向客户收费。该团目前出演两种戏剧：悲剧（tragedy）和喜剧（comedy）。给客户发出账单时，剧团还会根据到场观众的数量给出“观众量积分”（volume credit）优惠，下次客户再请剧团表演时可以使用积分获得折扣—你可以把它看作一种提升客户忠诚度的方式。

评价：
1:代码组织不甚清晰，但这还在可忍受的限度内。
2: 不会太难理解。如果这段代码身处于一个更大规模—也许是几百行—的程序中，把所有代码放到一个函数里就很难理解了。

需求变更：
1:新增加历史剧、田园剧、田园喜剧、田园史剧、历史悲剧、历史田园悲喜剧，
2: 还没有决定试哪种以及何时试演。
3: 场次的计费方式、积分的计算方式都会被影响。
