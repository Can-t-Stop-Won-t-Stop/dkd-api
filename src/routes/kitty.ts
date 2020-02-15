export default (app) => {

  app.get('/kitty/:id', (req, res) => {
    var kittyStats = {
      attack: 50,
      speed: 20,
      fire: 2
    }
    return res.status(200).send(kittyStats);
  });

  app.post('/kitty/:id', (req, res) => {
    var kittyStats = {
      attack: 50,
      speed: 20,
      fire: 2
    }
    return res.status(200).send(kittyStats);
  });


};
