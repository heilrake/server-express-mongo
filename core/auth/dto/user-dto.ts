import { ObjectId } from "mongodb";
export interface UserDto {
  email: string;
  _id: ObjectId;
  isActivated: boolean;
}
