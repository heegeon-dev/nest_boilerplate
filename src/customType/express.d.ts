import { User } from 'src/models/entities'

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}