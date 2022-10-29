import { Request, Response } from 'express';
import { createUser, deleteUser, findAndUpdate, findUser } from '../service/user.service';

interface student {
    name: string;
    dept: string;
}

const create_user = async (req: Request, res: Response) => {
    try {
        const { name, dept } = req.body;

        const newUser: student = {
            name,
            dept
        };

        const user = await createUser(newUser);

        return res.status(201).send({
            message: 'A new Student has been recorded',
            data: user
        });
    } catch (error) {
        res.status(400).send({
            message: error
        });
    }
};

const update_user = async (req: Request, res: Response) => {
    try {
        const { name, dept }: student = req.body;

        const user = await findAndUpdate({ name }, { dept }, { new: true });
        return res.status(200).send({
            message: 'User details has been updated',
            data: user
        });
    } catch (error) {
        res.status(400).send({
            message: error
        });
    }
};

const find_user = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        const user = await findUser({ _id: id });
        return res.status(200).send({
            message: 'Here are the details of this User',
            data: user
        });
    } catch (error) {
        res.status(400).send({
            message: error
        });
    }
};

const delete_user = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        const user = await deleteUser({ _id: id });
        return res.status(200).send({
            status: 'SUCCESS',
            message: 'User details has been deleted'
        });
    } catch (error) {
        res.status(400).send({
            message: error
        });
    }
};
export { create_user, update_user, find_user, delete_user };
