const User = require("../models/usermodel");

const deleteUser = async(req, res) => {
  try {
    let {id}= req.params
    await User.findByIdAndDelete(id)

    return res.json({
         success : true,
         userDeletedId : id,
         msg:"User Deleted SuccessFully"

    })
  } catch (error) {
    return res.json({
        success : false,
        msg:"Something Went Wrong!"
    })
  }
};

module.exports = deleteUser;
