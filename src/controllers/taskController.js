const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTasks = async (req, res) => {
  const tasks = await prisma.task.findMany({ where: { userId: req.userId } });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId: req.userId,
    },
  });

  res.json({ message: 'Task added successfully', task });
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id: Number(id) } });
  res.json({ message: 'Task deleted' });
};
