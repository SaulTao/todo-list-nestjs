import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { NotFoundException } from '@nestjs/common';

describe('TaskService', () => {
  let service: TaskService;
  const notFoundTask = { id: 3 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can list all tasks', async () => {
    expect(service.findAll().length).toEqual(2);
  });

  it('can create new task', async () => {
    const task = {
      title: 'New Task',
    };
    const newTask = service.create(task);
    expect(newTask.id).toEqual(3);
    expect(newTask.title).toEqual(task.title);
    expect(newTask.isChecked).toEqual(false);
  });

  it('can show single task by id', async () => {
    expect(service.findOne(2).title).toEqual('read the book');
    expect(() => service.findOne(notFoundTask.id)).toThrow(NotFoundException);
  });

  it('can update by single item', async () => {
    const task = {
      id: 1,
      title: 'Updated Task 1',
      isChecked: false,
    };
    const updateTask1 = service.update(task.id, task);
    expect(updateTask1.id).toEqual(task.id);
    expect(updateTask1.title).toEqual(task.title);
    expect(updateTask1.isChecked).toEqual(task.isChecked);

    expect(() => service.update(notFoundTask.id, { title: 'task' })).toThrow(
      NotFoundException,
    );
  });

  it('can remove single item', async () => {
    expect(() => service.remove(notFoundTask.id)).toThrow(NotFoundException);
    expect(service.remove(1)).toEqual(undefined);
  });

  it('can remove checked items', async () => {
    expect(service.removeChecked()).toEqual(undefined);
  });
});
