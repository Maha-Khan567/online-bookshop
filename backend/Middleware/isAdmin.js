
function isAdmin(req, res, next) {
if(req.user.role==="admin")
{
    next();
}
else{
    return res.status(403).send("Access forbidden");
}
}
module.exports = isAdmin;
