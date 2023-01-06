
//export code
module.exports = {

//get request for home page
home: (req, res) => {
     res.render('prehome');
},

//get request for gesture page
gesture: (req, res) => {
    res.render('gesture');
},

//get request fot permission page
permission: (req, res) => {
    res.render('permission');
},


//get request for logout
logout: (req, res) => {
    if (req.session._id) {
      req.session.destroy((error)=>{
        if(error){
          console.log(error);
        }
        else{
          res.redirect("/");
        }
      })
    }
  }
}