import { UserProfile } from "./user-profile";

export interface Post {
    title: string;
    content: string;
    user: string | UserProfile;
}