const jwt = require("jsonwebtoken");

export function authenticateToken(token) {
    if (token == null) return null;

    return jwt.verify(
        token,
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET,
        (err, user) => {
            if (err) return null;
            return user;
        }
    );
}

export function generateAccessToken(user) {
    if (!user) {
        throw new Error("No user provided");
    }

    return jwt.sign(user, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET, {
        expiresIn: "30s",
    });
}

export function generateRefreshToken(user) {
    if (!user) {
        throw new Error("No user provided");
    }

    return jwt.sign(user, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET);
}
