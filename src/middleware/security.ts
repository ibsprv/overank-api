import cors from 'cors';
import { Application } from 'express';

export function initCors(app: Application): void {
    app.use(cors());
}
