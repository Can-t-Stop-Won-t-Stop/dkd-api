export default (app) => {

  // attack: Number(this.kitty.tokenId) % 102, -> should return a higher number
  // element: Number(this.kitty.tokenId) % 5, -> should return 0 - 4
  // speed: Number(this.kitty.tokenId) % 42, -> should return a middle number
  // crit: Number(this.kitty.tokenId) % 12 -> should return a low number

  function getKittyStats(tokenId)
  {

    return (
      {
        tokenId: tokenId,
        attack: Number(tokenId) % 102,
        element: Number(tokenId) % 5,
        speed: Number(tokenId) % 42,
        crit: Number(tokenId) % 12
      }
    )
  }

  function getKittyDamage(kittyInfo)
  {
    return {
      ...kittyInfo,
      damage: Number(kittyInfo.tokenId)
    }
  }

  function getBossInfo(bossId)
  {

    // get boss stats
    var bossStats = {
      element: 4,
      type: 5,
      skinThickness: 100
    }

    // get tokenIds of all kitties killed by boss
    var killList = [20, 30, 5, 60, 80];

    // get detailed data for each kitty
    var kittyInfo = killList.map(getKittyStats);

    // compute damage by each Kitty
    var ripKitties = kittyInfo.map(getKittyDamage);

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
