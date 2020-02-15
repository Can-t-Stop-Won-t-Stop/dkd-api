export default (app) => {

  // attack: Number(this.kitty.tokenId) % 102, -> should return a higher number
  // element: Number(this.kitty.tokenId) % 5, -> should return 0 - 4
  // speed: Number(this.kitty.tokenId) % 42, -> should return a middle number
  // crit: Number(this.kitty.tokenId) % 12 -> should return a low number
  const SPEED_CAP = 42;

  function getKittyStats(tokenId)
  {

    return (
      {
        tokenId: tokenId,
        attack: Number(tokenId) % 102,
        element: Number(tokenId) % 5,
        speed: Number(tokenId) % SPEED_CAP,
        crit: Number(tokenId) % 12
      }
    )
  }

  function getKittiesKilled(bossId)
  {
    return [20, 30, 5, 60, 80];
  }

  function getBossStats(bossId)
  {
    var bossStats =
    {
      element: 4,
      type: 5,
      skinThickness: 100
    };

    return bossStats;
  }

  function computeDamage(kitty, bossStats)
  {

    // get elements
    var bossElement = bossStats.element;
    var kittyElement = kitty.element;
    var kittyBaseDamage = kitty.attack;

    // get element damage mulitplier
    var elementMultiplier = computeElementMultiplier(bossElement, kittyElement);

    // get total attack damage
    var totalAttackDamage = kittyBaseDamage * elementMultiplier * (SPEED_CAP  - kitty.speed);

    return totalAttackDamage;
  }

  function computeElementMultiplier(bossElement, kittyElement)
  {
    const elementTable =
    [
      [1,   2,    1,    1,    0.5], // 0 - kitty
      [0.5, 1,    2,    1,    1],
      [3,   0.5,  1,    2,    1],
      [1,   1,    0.5,  1,    2],
      [2,   1,    1,    0.5,  1]
    ]

    return elementTable[kittyElement][bossElement];
  }

  function getBossInfo(bossId)
  {
    // get boss stats
    var bossStats = getBossStats(bossId);

    // get tokenIds of all kitties killed by boss
    var killList = getKittiesKilled(bossId);

    // get detailed data for each kitty
    var kittyInfo = killList.map(getKittyStats);

    console.log(bossStats);

    // compute damage by each Kitty then add onto KittyInfo as ripKitties
    var ripKitties = kittyInfo.map(kitty =>
    {
      return {
        ...kitty,
        damage: computeDamage(kitty, bossStats)
      }
    })

    return (
      {
        ...bossStats,
        ripKitties: ripKitties
      }
    )

  }


  app.all('/kitty/:id', (req, res) => {
    const {id} = req.params;
    return res.status(200).send(getKittyStats(id));
  });

  app.all('/boss/:id', (req, res) => {
    const {id} = req.params;
    return res.status(200).send(getBossInfo(id));
  });


};
