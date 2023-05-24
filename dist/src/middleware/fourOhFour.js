"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fourOhFour = (_, res) => {
    return res.status(404).json({ message: 'not found' });
};
exports.default = fourOhFour;
