import * as jwt from 'jsonwebtoken';

export function userAuth(req: any, res: any, next: any) {
    try{
        let authHeader:string = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({
                details: 'Invalid Bearer token'
            });
        }
        console.log(jwt);
        
        let token: string = authHeader.split(' ')[1];
        let secretKey: string = process.env.SECRET_KEY as string;
        let decoded:any = jwt.verify(token, secretKey);
        if (!decoded.isAdmin) {
            req.userId = decoded.userId;
            req.email = decoded.email;
            next();
        } else {
            return res.json({details: "Invalid User"});
        }
        
    } catch (err) {
        console.log(err);
        res.json({details: "Invalid Token"});
    }
}

