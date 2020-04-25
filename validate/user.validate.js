const db = require('../db')

module.exports.postCreate = (req,res,next) => {
  let errors = []
  
  if (!req.body.name) {
    errors.push("Name is required.");
  }
  
  if(req.body.name.length > 30){
    errors.push('Name must be less than 30 characters')
  }
  
//   if (!req.body.phone) {
//     errors.push("Phone is required.");
//   }
  
//   if(req.body.phone.length >= 11){
//     errors.push('Phone must be less than 11 characters')
//   }
  
  if(errors.length){
    res.render("users/index", {
      users: db.get("users").value(),
      errors: errors,
      values: req.body
    })
    return;
  }
  
  next();
}