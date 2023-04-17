const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

exports.apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    handler(req, res) {
        res.status(this.statusCode).json({
            code: this.statusCode,
            message: '1분에 열 번만 요청할 수 있습니다.'
        });
    }
});

exports.corsWhenDomainMatches = async (req, res, next) => {
    cors({
        origin: req.get('origin'),
        credentials: true
    })(req, res, next);
};

exports.verifyToken = (req, res, next) => {
    try {
        res.locals.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(419).json({
                code: 419,
                message: "토큰이 만료되었습니다."
            });
        }
        return res.status(401).json({
            code: 401,
            message: "유효하지 않은 토큰입니다."
        });
    }
};
