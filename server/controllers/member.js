const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { save, findByEmail, findById } = require('../dao/member');

exports.register = async (req, res, next) => {
    const { email, username, password } = req.body;
    const member = await findByEmail(email);
    if (member.name !== undefined) {
        return res.status(409).json({
            message: "already exists email"
        });
    }

    const hash = await bcrypt.hash(password, 12);
    save(email, username, hash);
    return res.status(201).json();
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const member = await findByEmail(email);
    if (!member) {
        return res.status(404).json({
            message: "member not found"
        });
    }

    if (!bcrypt.compareSync(password, member.password)) {
        return res.status(401).json({
            message: "password incorrect"
        });
    }

    return res.status(200).json({
        token: jwt.sign({
            id: member.id,
        }, process.env.JWT_SECRET, {
            expiresIn: '60m',
            issuer: 'oneul_halu'
        })
    });
};

