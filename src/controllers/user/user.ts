import * as Bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { User } from "../../models/User";

const db = mongoose.connection;

export const getUser = async (req: any, res: any) => {
    const userId = req.session.userId;
    const user: any = await User.findOne({ _id: userId }).exec();
    if (user) {
        delete user.password;
        res.json({ success: true, user });
        return;
    }
    res.status(401).json({ success: false, err: "Not authenticated" });
};

export const signUp = async (req: any, res: any) => {
    try {
        const user = req.body;
        user.password = Bcrypt.hashSync(user.password);
        const created = await User.create(user);
        res.json({ success: true, created });
    } catch (err) {
        res.status(400).json({ success: false, err: err.errmsg || err });
    }
};

export const signIn = async (req: any, res: any) => {
    try {
        const user: any = await User.findOne({ email: req.body.email }).exec();
        if (user) {
            const cmp = await Bcrypt.compareSync(req.body.password, user.password);
            req.session.userId = user._id;
            res.json({ success: true, session: req.session });
            return;
        }
    } catch (err) {
        // noop()
    }
    res.status(400).json({ success: false, err: "Invalid email / password combination!" });
};

export const signOut = async (req: any, res: any) => {
    await req.session.destroy();
    res.json({ success: true });
};
