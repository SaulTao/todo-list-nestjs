import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';

describe('TaskController', () => {
  let controller: TaskController;
  const notExistingId = '100';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of tasks', () => {
    expect(controller.findAll()).toBeInstanceOf(Array);
  });

  it('should return a task', () => {
    expect(controller.findOne('1')).toBeInstanceOf(Object);
  });

  it('find a not existing task should throw an error', () => {
    expect(() => controller.findOne(notExistingId)).toThrowError(
      NotFoundException,
    );
  });

  it('should create a task', () => {
    expect(controller.create({ title: 'test' })).toEqual({
      id: 3,
      title: 'test',
      isChecked: false,
    });
  });

  it('should update a task', () => {
    expect(controller.update('1', { title: 'test', isChecked: false })).toEqual(
      {
        id: 1,
        title: 'test',
        isChecked: false,
      },
    );
  });

  it('update a not existing task should throw an error', () => {
    expect(() =>
      controller.update(notExistingId, { title: 'test' }),
    ).toThrowError(NotFoundException);
  });

  it('should remove a task', () => {
    expect(controller.remove('1')).toBeUndefined();
  });

  it('remove a not existing task should throw an error', () => {
    expect(() => controller.remove(notExistingId)).toThrowError(
      NotFoundException,
    );
  });

  it('should remove checked tasks', () => {
    expect(controller.removeChecked()).toBeUndefined();
  });
});
