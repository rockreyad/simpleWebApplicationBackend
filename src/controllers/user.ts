import { Request, Response } from 'express';

import { createUser, findOneUser, findUser } from '../service/user.service';

function getErrorStatus(error: any) {
    return error.status;
}

const create_account = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: 'First Name , Last Name, Email and Password'
            });
        }

        const userInfo = {
            firstName,
            lastName,
            email,
            password,
            role: 'user'
        };

        const user = await createUser(userInfo);
        return res.status(201).send({
            message: 'Registered successfully!',
            status: 201,
            data: user
        });
    } catch (error: unknown) {
        let status: number = getErrorStatus(error);

        res.status(status || 500).json({
            status: 'FAILED',
            message: error
        });
    }
};

const login_user = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are Required field'
        });
    }
    try {
        const userInfo = {
            email,
            password
        };

        const find_user = await findOneUser({ email });
        if (!find_user) {
            throw {
                message: 'Not found!'
            };
        } else {
            if (find_user.password !== userInfo.password) {
                throw {
                    message: 'Password is incorrect'
                };
            }
        }

        return res.status(200).send({
            message: 'Login successfully!',
            status: 'SUCCESS',
            data: find_user.role
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
};

const all_user = async (req: Request, res: Response) => {
    const filter = {};
    const user = await findUser({ filter });

    const allUser = user.map((user) => user);
    return res.status(200).send({
        message: 'All User Fetched successfully',
        data: allUser
    });
};

export { create_account, login_user, all_user };
