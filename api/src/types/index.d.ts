import * as express from 'express';
import { UserResponseDTO, SessionResponseDTO } from '../resources/database/_types';

declare global {
  namespace Express {
    interface Request {
      user?: UserResponseDTO;
      session?: SessionResponseDTO;
    }
  }
}
