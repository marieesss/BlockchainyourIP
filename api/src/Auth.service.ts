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

      

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
      
    }
  }
 }

 @Injectable()
 export class AdminGuard implements CanActivate {
  constructor(private configService:ConfigService) {}
  canActivate(context: ExecutionContext): boolean {
     const request = context.switchToHttp().getRequest();
 
     // Vérification de la présence du header Authorization
     const authorizationHeader = request.headers?.token;
     if (!authorizationHeader){
      throw new UnauthorizedException('no token');

     }
     const token = authorizationHeader.replace('Bearer ', '');
 
     try {
       // Vérification de la validité du token en utilisant une clé secrète
       const decodedToken = jwt.verify(token, this.configService.get('JWT_SECRET')) as JwtPayload;
 
       return decodedToken.isAdmin
     } catch (error) {
       throw new UnauthorizedException('Invalid token');
       
     }
   }
  }

  @Injectable()
  export class UserGuard implements CanActivate {
    constructor(private configService: ConfigService) {}
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const id = Number(request.params.id);
    
      // Vérification de la présence du header Authorization
      const authorizationHeader = request.headers?.token;
      const token = authorizationHeader.replace('Bearer ', '');
    
      try {
        // Vérification de la validité du token en utilisant une clé secrète
        const decodedToken = jwt.verify(token, this.configService.get('JWT_SECRET')) as JwtPayload;
        const decodedId = decodedToken.id;
      console.log(id)
      console.log(typeof id); // Affiche "string"
      console.log(decodedId)
      console.log(typeof decodedId); // Affiche "string"

      
      return decodedId===id

      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
  