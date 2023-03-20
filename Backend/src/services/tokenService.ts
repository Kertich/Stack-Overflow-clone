import jwt from 'jsonwebtoken';

interface TokenPayload {
    userId: number;
    email: string;
  }
  
  interface DecodedToken extends TokenPayload {
    iat: number;
    exp: number;
  }
  
  export function createToken(payload: TokenPayload): string {
    // implementation goes here
    const token = jwt.sign(payload, 'mysecretkey', { expiresIn: '1h' });
    return token;
  }
  
  export function verifyToken(token: string): DecodedToken {
    // implementation goes here
    const decodedToken = jwt.verify(token, 'mysecretkey') as DecodedToken;
    return decodedToken;
  }
  
  export function decodeToken(token: string): TokenPayload {
    // implementation goes here
    const decodedPayload = jwt.decode(token) as TokenPayload;
    return decodedPayload;
  }
  