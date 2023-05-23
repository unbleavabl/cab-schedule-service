import { RequestHandler } from 'express'

const fourOhFour: RequestHandler = (_, res) => {
    return res.status(404).json({ message: 'not found' })
}

export default fourOhFour
