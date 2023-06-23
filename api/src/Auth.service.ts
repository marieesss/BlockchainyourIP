import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
    id: number;
    isAdmin: boolean;
  }

@Injectable()
export class AuthGuard implements CanActivate {
 constructor(private reflector: Reflector, private configService:ConfigService) {}
 canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Vérification de la présence du header Authorization
    const authorizationHeader = request.headers?.token;
    if (!authorizationHeader) {
      throw new UnauthorizedException('Unauthorized');
    }

    // Extraction du token du header Authorization
    const token = authorizationHeader.replace('Bearer ', '');

    try {
      // Vérification de la validité du token en utilisant une clé secrète
      const decodedToken = jwt.verify(token, this.configService.get('JWT_SECRET')) as JwtPayload;

      
    console.log(decodedToken)

      return true;
    } catch (error) {
        console.log(error)
      throw new UnauthorizedException('Invalid token');
      
    }
  }
 }

 @Injectable()
 export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector, private configService:ConfigService) {}
  canActivate(context: ExecutionContext): boolean {
     const request = context.switchToHttp().getRequest();
 
     // Vérification de la présence du header Authorization
     const authorizationHeader = request.headers?.token;
     const token = authorizationHeader.replace('Bearer ', '');
 
     try {
       // Vérification de la validité du token en utilisant une clé secrète
       const decodedToken = jwt.verify(token, this.configService.get('JWT_SECRET')) as JwtPayload;
 
       console.log(decodedToken.isAdmin) 
       return decodedToken.isAdmin
     } catch (error) {
         console.log(error)
       throw new UnauthorizedException('Invalid token');
       
     }
   }
  }


