import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  try {
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];
    if (!token) next(new Error('Token not found!'));
    const decoded_token = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded_token) next(new Error('Invalid token!'));
    req.token = decoded_token;
    next();
  }
  catch (err) {
    next(err)
  }

} 