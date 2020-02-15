export default (app) => {

  // attack: Number(this.kitty.tokenId) % 102, -> should return a higher number
  // element: Number(this.kitty.tokenId) % 5, -> should return 0 - 4
  // speed: Number(this.kitty.tokenId) % 42, -> should return a middle number
  // crit: Number(this.kitty.tokenId) % 12 -> should return a low number

  function getKittyStats(tokenId)
  {

    return (
      {
        attack: Number(tokenId) % 102,
        element: Number(tokenId) % 5,
        speed: Number(tokenId) % 42,
        crit: Number(tokenId) % 12
      }
    )
  }


  app.get('/kitty/:id', (req, res) => {
    const {id} = req.params;
    return res.status(200).send(getKittyStats(id));
  });

  app.post('/kitty/:id', (req, res) => {
    const {id} = req.params;
    return res.status(200).send(getKittyStats(id));
  });


};
