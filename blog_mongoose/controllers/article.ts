import { type Request, type Response, Router } from "express";
import Article from "../models/article.ts";
import Comment from "../models/comment.ts";

const router: Router = Router();

router.post('/article', async (req: Request, res: Response) => {
  const data = new Article({
      header: req.body.header,
      content: req.body.content
  })

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({message: error})
  }
})

router.get('/article', async (req: Request, res: Response) => {
    try {
        const data = await Article.find();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});

router.get('/article/:id', async (req: Request, res: Response) => {
    try {
        const data = await Article.findById(req.params.id);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
});

router.delete('/article/:id', async (req: Request, res: Response) => {
  try{
    await Article.findByIdAndDelete(req.params.id);
    // const data = await Article.find();
    res.send(await Article.find());
  }
  catch(error){
    res.status(500).json({message: error})
  }
});

router.put('/article/:id', async (req: Request, res: Response) => {
  try{
    const result = await Article.findByIdAndUpdate(
        req.params.id, req.body, { new: true }
    )

    res.send(result)
  }
  catch(error){
    res.status(500).json({message: error})
  }
});

router.post('/article/:id/comment', async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    const options = { new: true }; 
    
    const data = new Comment({
      date: new Date(),
      content: req.body.content,
      article: id
    })

    const savedComment = await data.save();

    const result = await Article.findByIdAndUpdate(
      id,
      { $push: { comments: savedComment._id } },
      options
    );

    res.send(result);
  }
  catch(error){
    res.status(500).json({message: error})
  }
});

router.get('/article/:id/comment', async (req: Request, res: Response) => {
  try{
    const id = req.params.id;

    const result = await Article.findById(id).populate("comments");

    res.send(result);
  }
  catch(error){
    res.status(500).json({message: error})
  }
});

export default router;