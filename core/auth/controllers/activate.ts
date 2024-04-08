// import { userService } from '../services/user';
// import express from 'express';

// export const activateHandler = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   try {
//     const activationLink = req.params.link;
//     await userService.activate(activationLink);
//     return res.redirect(process.env.CLIENT_URL || '');
//   } catch (error) {
//     return next(error);
//   }
// };
