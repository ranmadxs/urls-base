import { Router, Request, Response } from 'express';
import urlshortenerController from './UrlshortenerController';
import Joi from 'joi';
import { Logger } from "tslog";
const logger: Logger = new Logger();

const router = Router();
//const urlshortenerController = UrlshortenerController.getInstance();

router.get('/list/:owner', async (req: Request, res: Response) => {
  try {
    const { params: {owner} } = req;
    const responseCtrl = await urlshortenerController.list(owner);
    res.status(200).json(responseCtrl);
  } catch (err: unknown) {
    logger.error(err);
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
    res.status(500).json({ err });    
  }
});

router.put('/:shorturl/:status', async (req: Request, res: Response) => {
  try {

    const { params: {shorturl, status} } = req;    

    const newStatus = urlshortenerController.setStatus(shorturl, (status.toLowerCase() === 'true'));
    res.status(200).json({ shorturl: shorturl, status: newStatus });
  } catch (error: unknown) {
    if (error instanceof Joi.ValidationError && error.isJoi) {
      res.status(422).json({ error: error.details });
    } else {
      res.status(500).json({ error });
    }
  }
});

router.post('/', async (req: Request, res: Response) => {
    try {
      const schemaValidateBody = Joi.object({
        url: Joi.string().required(),
        owner: Joi.string().required(),
      });
      const datosBody = await schemaValidateBody.validateAsync(req.body);
      const responseCtrl = await urlshortenerController.create(datosBody);
      res.status(200).json(responseCtrl);
    } catch (err: unknown) {
      logger.error(err);
      if (err instanceof Joi.ValidationError && err.isJoi) {
        res.status(422).json({ error: err.details });
      } else if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      }
      res.status(500).json({ err });
    }
  });

export default router;  