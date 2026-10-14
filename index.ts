import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

interface Task {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
}

let tasks: Task[] = [];
let currentId = 1;

// GET /tasks
app.get('/tasks', (_req: Request, res: Response) => {
  res.json(tasks);
});

app.post('/new-task', (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Le titre est obligatoire.' });
  }

  const newTask: Task = {
    id: currentId++,
    title,
    description: description || '',
    isDone: false
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

app.put('/update-task/:id', (req: Request, res: Response) => {
  const idParam = req.params.id;
  if (!idParam) {
    return res.status(400).json({ error: 'ID manquant.' });
  }

  const taskId = parseInt(String(idParam), 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tâche non trouvée.' });
  }

  const taskToUpdate = tasks[taskIndex];
  if (!taskToUpdate) {
    return res.status(404).json({ error: 'Tâche non trouvée.' });
  }

  const { title, description, isDone } = req.body;

  if (title !== undefined) taskToUpdate.title = title;
  if (description !== undefined) taskToUpdate.description = description;
  if (isDone !== undefined) taskToUpdate.isDone = isDone;

  return res.json(taskToUpdate);
});

app.delete('/delete-task/:id', (req: Request, res: Response) => {
  const idParam = req.params.id;
  if (!idParam) {
    return res.status(400).json({ error: 'ID manquant.' });
  }

  const taskId = parseInt(String(idParam), 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tâche non trouvée.' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  return res.json({ message: 'Tâche supprimée avec succès', task: deletedTask });
});

app.delete('/delete-task/:id', (req: Request, res: Response) => {
  const idParam = req.params.id;
  if (!idParam) {
    return res.status(400).json({ error: 'ID manquant.' });
  }

  const taskId = parseInt(String(idParam), 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tâche non trouvée.' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  return res.json({ message: 'Tâche supprimée avec succès', task: deletedTask });
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Serveur prêt sur http://127.0.0.1:${port}`);
});