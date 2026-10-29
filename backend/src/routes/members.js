const router=require('express').Router();const Member=require('../models/Member');const auth=require('../middleware/auth');const requireRole=require('../middleware/requireRole');
router.use(auth,requireRole('admin'));
router.get('/',async(req,res,next)=>{try{res.json(await Member.find().populate('user','username role').sort({name:1}));}catch(e){next(e);}});
router.delete('/:id',async(req,res,next)=>{try{const Transaction=require('../models/Transaction');if(await Transaction.exists({member:req.params.id,status:'issued'}))return res.status(409).json({message:'Cannot delete a member with books currently issued.'});const m=await Member.findByIdAndDelete(req.params.id);if(!m)return res.status(404).json({message:'Member not found.'});if(m.user)await require('../models/User').deleteOne({_id:m.user});res.json({message:'Member/student account deleted.'});}catch(e){next(e);}});
module.exports=router;
