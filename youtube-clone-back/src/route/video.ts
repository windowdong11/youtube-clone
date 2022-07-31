import { Router } from 'express';
const videoRouter = Router();

// TODO : Impementation
// Create video
videoRouter.post('/', (req, res) => {
  res.send('TODO : [Implement] create video')
})

// TODO : Impementation
// Get video list
videoRouter.get('/list', (req, res) => {
  res.send('TODO : [Implement] get video list');
})

videoRouter.route('/:id')
  // TODO : Impementation
  // View video
  .get((req, res) => {
    res.send(`TODO : [Implement] view video(id:${req.params.id})`)
  })
  // TODO : Impementation
  // Delete video
  .delete((req, res) => {
    res.send(`TODO : [Implement] delete video(id:${req.params.id})`)
  })

export default videoRouter;