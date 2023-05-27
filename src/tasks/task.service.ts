import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  // mock data
  private _tasks: Task[] = [
    {
      id: 1,
      title: 'buy dog food',
      isChecked: true,
    },
    {
      id: 2,
      title: 'read the book',
      isChecked: false,
    },
  ];

  create(createTaskDto: CreateTaskDto) {
    const task = {
      id: (this._tasks[this._tasks.length - 1]?.id ?? 0) + 1,
      ...createTaskDto,
      isChecked: false,
    };
    this._tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return [...this._tasks].reverse();
  }

  findOne(id: number): Task {
    const task = this._tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.findOne(id);

    if (updateTaskDto.title) {
      task.title = updateTaskDto.title;
    }
    if (updateTaskDto.isChecked !== undefined) {
      task.isChecked = updateTaskDto.isChecked;
    }

    this._tasks.forEach((item) => {
      if (item.id === id) {
        item = task;
      }
    });
    return task;
  }

  remove(id: number) {
    this.findOne(id);
    this._tasks = this._tasks.filter((task) => task.id !== id);
  }

  removeChecked() {
    this._tasks = this._tasks.filter((task) => task.isChecked === false);
  }
}
