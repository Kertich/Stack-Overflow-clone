// import { Request, Response } from "express";
// import { getUserById } from "../data/userRepository";
// import { User } from "../models/User";

// export const getUserProfile = async (req: Request, res: Response) => {
//   try {
//     const user = await getUserById(req.user.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const userProfile: User = {
//       id: user.id,
//       email: user.email,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       age: user.age,
//       gender: user.gender,
//       createdAt: user.createdAt,
//       updatedAt: user.updatedAt,
//     };

//     return res.json(userProfile);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
