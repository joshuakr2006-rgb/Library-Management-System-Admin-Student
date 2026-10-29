const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Member = require('../models/Member');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = (req,res,next) => { const errors=validationResult(req); if(!errors.isEmpty()) return res.status(400).json({message:errors.array()[0].msg}); next(); };
router.post('/login', [body('username').trim().notEmpty().withMessage('Username is required.'), body('password').notEmpty().withMessage('Password is required.')], validate, async (req,res,next) => {
  try {
    const user = await User.findOne({ username: req.body.username.toLowerCase() });
    if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) return res.status(401).json({ message: 'Invalid username or password.' });
    const token = jwt.sign({ id: user._id.toString(), username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch(err) { next(err); }
});
router.post('/students', auth, requireRole('admin'), [
  body('username').trim().isLength({min:3,max:30}).matches(/^[a-zA-Z0-9_]+$/).withMessage('Username must be 3–30 letters, numbers, or underscores.'),
  body('password').isLength({min:8}).withMessage('Password must contain at least 8 characters.'),
  body('name').trim().notEmpty().withMessage('Student name is required.'),
  body('email').optional({values:'falsy'}).isEmail().withMessage('Enter a valid email address.')
], validate, async(req,res,next)=>{
  let user;
  try {
    const username=req.body.username.toLowerCase();
    if(await User.findOne({username})) return res.status(409).json({message:'Username already exists.'});
    if(req.body.email && await Member.findOne({email:req.body.email.toLowerCase()})) return res.status(409).json({message:'Email already belongs to a member.'});
    user=await User.create({username,passwordHash:await bcrypt.hash(req.body.password,12),role:'student'});
    const member=await Member.create({name:req.body.name,email:req.body.email||undefined,department:req.body.department||'CSE',user:user._id});
    res.status(201).json({message:'Student account created.',student:{id:user._id,username:user.username,role:user.role,memberId:member._id,name:member.name}});
  } catch(err) { if(user) await User.deleteOne({_id:user._id}).catch(()=>{}); next(err); }
});
module.exports=router;
