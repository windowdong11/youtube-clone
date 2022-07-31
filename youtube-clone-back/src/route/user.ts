import { Router } from 'express';
const userRouter = Router();

// TODO : Impementation
// Create user
userRouter.post('/', (req, res) => {
  res.send('TODO : [Implement] create user');
})

// TODO : Impementation
// Delete user
userRouter.delete('/', (req, res) => {
  res.send('TODO : [Implement] delete user');
})

// TODO : Impementation
// Update user
userRouter.put('/', (req, res) => {
  res.send('TODO : [Implement] update user')
})

export default userRouter;