export default function authentication(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null)
        return res.setHeader('Content-Type', 'application/json').sendStatus(401).json({message: "problem with your credentials, Please re-signIn"});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err)
        return res.setHeader('Content-Type', 'application/json').sendStatus(401).json({message: "non authorized, re-signIn required"});
      req.user = user;
      next();
    })
}