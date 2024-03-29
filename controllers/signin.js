const handleSignin = (db,bcrypt)=> (req,res) => {
    let a = new Date();
    const {email, password} = req.body;

    if (!email || !password){
        return res.status(400).json('incorrect form submission')
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash)
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                        let b = new Date();
                        console.log("DURATION ---->", b-a)
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong password or email')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))



}

module.exports = {handleSignin: handleSignin}
