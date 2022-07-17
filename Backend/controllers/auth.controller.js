// IMPORTS
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { signUpErrors } = require('../utils/errors.utils');

// EXPORTS

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => {
                    const errors = signUpErrors(error);
                    res.status(200).json({ errors });
                })
        })
        .catch(error => {
            const errors = signUpErrors(error);
            res.status(200).json({ errors });
        })
};

exports.signIn = (req, res, next) => {

    /*let errors = { email: '', password: ''};
    if (err.message.includes("email")) errors.email = "Email inconnu";
    if (err.message.includes('password')) errors.password = "Le mot de passe ne correspond pas";*/

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(200).json({ errors : "Email ou mot de passe erroné"});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(200).json({ errors : "Email ou mot de passe erroné" });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id, isAdmin: user.isAdmin },
                            '${process.env.TOKEN}',
                            { expiresIn: '24h' }
                        ),
                        isAdmin: user.isAdmin,
                        email: user.email
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
