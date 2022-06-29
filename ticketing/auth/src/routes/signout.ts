import express from 'express';
const router = express.Router();
router.get('/api/users/signout',(req, res) =>{
   //@ts-ignore
    req.session=null;
    res.send({})
  })
  export{router as signoutRouter}