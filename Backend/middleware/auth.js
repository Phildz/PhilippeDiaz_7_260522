
// IMPORTS
const jwt = require('jsonwebtoken');

// EXPORT middleware
module.exports = (req, res, next) => {    
  try {       
    const token = req.headers.authorization.split(' ')[1];    
    const decodedToken = jwt.verify(token, '${process.env.TOKEN}');    
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;

    req.isAdmin = isAdmin;
    req.userId = userId;
    if (isAdmin || userId) {
      next();         
    }else{
      return res.status(403).send("Vous devez avoir les droits Administrateur")
    }

  } 
  catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};