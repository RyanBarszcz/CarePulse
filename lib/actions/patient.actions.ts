'use server';

import { ID, Models, Query } from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils"

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );
        console.log({newUser})

        return parseStringify(newUser);
    } catch (error: any) {
        if(error && error?.code == 409) {
            const existingUser = await users.list([
                Query.equal('email', [user.email])
            ]);

            return existingUser.users[0];
        }
        console.error("An error occurred while creating a new user:", error);
    }
};

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);
    } catch (error) {
        console.log(error)
    }
}