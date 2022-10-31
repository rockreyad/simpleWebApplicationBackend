import { Request, Response } from 'express';
import { createDepartment, deleteDepartment, findAndUpdate, findDepartment, findOneDepartment } from '../service/department.service';

function getErrorStatus(error: any) {
    return error.status;
}

const create_department = async (req: Request, res: Response) => {
    try {
        const { name, code } = req.body;

        if (!name || !code) {
            return res.status(400).json({
                message: 'Name & short Code Required field'
            });
        }

        const departmentInfo = {
            name,
            short: code
        };

        const find_department = await findDepartment({ short: departmentInfo.short });

        if (find_department.length > 0) {
            throw {
                status: 409,
                message: 'Duplicated'
            };

            // return res.status(409).json({ message: 'Duplicated course' });
        }

        const department = await createDepartment(departmentInfo);
        return res.status(201).send({
            message: 'Department added successfully!',
            data: department
        });
    } catch (error: unknown) {
        let status: number = getErrorStatus(error);

        res.status(status || 500).json({
            status: 'FAILED',
            message: error
        });
    }
};

const update_department = async (req: Request, res: Response) => {
    const { name, code } = req.body;

    if (!code || !name) {
        return res.status(400).json({
            message: 'Department Code and name is Required field'
        });
    }
    try {
        const departmentInfo = {
            name,
            short: code
        };

        const find_department = await findDepartment({ short: departmentInfo.short });
        if (!find_department) {
            throw {
                message: 'Not found!, Department course name or course code'
            };
        }

        await findAndUpdate({ short: departmentInfo.short }, { name: name }, { lean: true });
        return res.status(200).send({
            message: 'Department updated successfully!'
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
};

const all_department = async (req: Request, res: Response) => {
    const filter = {};
    const department = await findDepartment({ filter });

    const allDepartment = department.map((department) => department.short);
    return res.status(200).send({
        message: 'Department updated successfully!',
        data: allDepartment
    });
};

const delete_department = async (req: Request, res: Response) => {
    const { name, code } = req.body;

    if (!(code || name)) {
        return res.status(400).json({
            message: 'Department Code or name is Required field'
        });
    }
    try {
        const departmentInfo = {
            name,
            short: code
        };
        const find_department = await findOneDepartment({ short: departmentInfo.short } || { name: departmentInfo.name });
        if (!find_department) {
            throw {
                message: 'Not found!, Correct department name or code'
            };
        }

        await deleteDepartment({ _id: find_department._id });
        return res.status(200).send({
            status: 'SUCCESS',
            message: 'Department deleted successfully!'
        });
    } catch (error: unknown) {
        res.status(500).json({
            message: error
        });
    }
};

export { create_department, update_department, delete_department, all_department };
