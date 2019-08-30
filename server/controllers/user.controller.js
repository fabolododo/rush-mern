const User = require("../models/user.model.js");
const passwordHash = require("password-hash");

async function signup(req, res) {
  console.log("je rentre dans signup");
  const { password, email, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  // Création d'un objet user, dans lequel on hash le mot de passe
  const user = {
    name,
    email,
    password: passwordHash.generate(password)
  };


  // On check en base si l'utilisateur existe déjà
  try {
    const findUser = await User.findOne({ $or: [{ name: name },{
      email: email
    }]});
    console.log("findUser : ", findUser);
    
    if (findUser) {
      if (findUser.email === email) {
        return res.status(400).json({
          text: "Email already exists"
        });
      }
      if (findUser.name === name) {
        return res.status(400).json({
          text: "Name already exists"
        });
      }
    }
  } catch (error) {
    console.log("ca a crash", error);
    
    return res.status(500).json({ error });
  }
  try {
    // Sauvegarde de l'utilisateur en base
    const userData = new User(user);
    console.log("avant le save, userData :", userData);
    const userObject = await userData.save();
    console.log("apres le save");
    console.log("user object :", userObject);
    return res.status(200).json({
      text: "Succès",
      token: userObject.getToken()
    });
  } catch (error) {
    console.log("non ca a crash");
    
    return res.status(500).json({ error });
  }
}

async function login(req, res) {
  const { password, name } = req.body;
  if (!name) {
    //Le cas où le name ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Name must be required"
    });
  }
  if (!password ) {
    //Le cas où l'name ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Password must be required"
    });
  }
  try {
    // On check si l'utilisateur existe en base
    const findUser = await User.findOne({ name });
    if (!findUser)
      return res.status(401).json({
        text: "L'utilisateur n'existe pas"
      });
    if (!findUser.authenticate(password))
      return res.status(401).json({
        text: "Mot de passe incorrect"
      });
    return res.status(200).json({
      token: findUser.getToken(),
      text: "Authentification réussi"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}


async function listUser(req, res) {

  User.find({},function (err, users){
    if(err){
      res.send('Something went wrong');
      next();
    }
    res.json(users);
  
  });
  
} 

async function UpdateUser(req, res) {

  User.findByIdAndUpdate(req.params.id, { $set : req.body } , function(err, users){
    if(err){
   res.status(400);
   res.send(err);
   return;
  }
  res.send({users});
  });
};

async function DeleteUser(req, res) {

  User.findByIdAndRemove(req.params.id,function(err, users){
    if(!users)
    res.status(404).send('data not found');
    else
    
    users.delete().then( users => {
      res.json('User deleted');
    })
  });
}


async function DetailsUser(req, res) {

  User.findById(req.params.id, function(err, users){
    console.log(req.params.id);
    
    if(err){
      res.send('Something went wrong');
      return;
    }
    res.json(users);
  
  });

  }



//On exporte nos deux fonctions

exports.login = login;
exports.signup = signup;
exports.listUser = listUser;
exports.UpdateUser = UpdateUser;
exports.DeleteUser = DeleteUser;
exports.DetailsUser = DetailsUser;