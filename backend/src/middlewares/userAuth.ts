import * as jwt from 'jsonwebtoken';

export function userAuth(req: any, res: any, next: any) {
    try{
        let authHeader:string = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({
                details: 'Invalid Bearer token'
            });
        }

        let token: string = authHeader.split(' ')[1];
        let secretKey: string = process.env.SECRET_KEY as string;
        let decoded:any = jwt.verify(token, secretKey);
        if (decoded) {
            req.userId = decoded.email;
            next();
        } else {
            res.json({ details: 'Invalid Bearer token' });
        }
        
    } catch (err) {
        console.log(err);
        res.json({details: "Invalid Token"});
    }
}

