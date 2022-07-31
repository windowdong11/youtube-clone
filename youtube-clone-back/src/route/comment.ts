import { Router } from 'express';
const commentRouter = Router();

// TODO : Impementation
// Create comment
commentRouter.post('/', (req, res) => {
  res.send('TODO : [Implement] create comment')
})

// TODO : Impementation
// Get comment list
commentRouter.get('/list', (req, res) => {
  res.send('TODO : [Implement] get comment list');
})

// TODO : Impementation
// View comment
commentRouter.get('/:id', (req, res) => {
  res.send(`TODO : [Implement] view comment(id:${req.params.id})`)
})

// TODO : Impementation
// Delete comment
commentRouter.delete('/:id', (req, res) => {
  res.send(`TODO : [Implement] delete comment(id:${req.params.id})`)
})

export default commentRouter;