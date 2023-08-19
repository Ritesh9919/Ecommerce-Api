module.exports.register = (req, res) => {
    return res.send('Register User');
}

module.exports.login = (req, res) => {
    return res.send('Log in user');
}


module.exports.logout = (req, res) => {
    return res.send('Log out user');
}