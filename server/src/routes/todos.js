const router = require('express').Router();
const db = require('../models/index');

// All todos
router.get('/', async (req, res) => {
  await db.todos.findAll()
    .then(data => {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).send(data);
    })
    .catch(error => {
      res.status(500).send({
        message:
          error.message || "Can not retrieve todos"
      });
    });
});

// Add todo
router.post('/', async (req, res) => {
  const {id, description, completed} = req.body;
  console.log('ADD TODO', {id, description, completed});

  await db.todos.create({id, description, completed})
    .then(data => {
      console.log('DATA: ', data)
      res.set('Access-Control-Allow-Origin', '*');
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message:
          error.message || "Can not create a todo"
      });
    });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
    await db.todos.destroy({
      where: { id: id }
    })
    .then(data => {
      // TODO - send message with name of the Todo
      if(data == 1) {
        console.log('data 1')
        res.status(200).send({
          message: `The Todo with id ${id} was deleted succesfuly` 
        });
      } else {
        res.send({
          message: `Cannot delete Todo with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
});

// router.patch('/todos/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { completed } = req.body;
//     const todo = await Todo.findByPk(id);
//     await todo.update({ completed })
//     res.sendStatus(201);
//   } catch (error) {
//     res.status(500).send(error.message)
//   }
// });

module.exports = router;
