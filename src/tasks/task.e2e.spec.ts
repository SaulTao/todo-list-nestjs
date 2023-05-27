import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TaskModule } from '../../src/tasks/task.module';
import { TaskService } from '../../src/tasks/task.service';
import { HttpStatus, INestApplication } from '@nestjs/common';

describe('Cats', () => {
  let app: INestApplication;
  const mockData = {
    id: 1,
    title: 'test',
    isChecked: false,
  };
  const taskService = {
    findAll: () => [mockData],
    findOne: () => mockData,
    create: () => mockData,
    update: () => mockData,
    remove: () => undefined,
    removeChecked: () => undefined,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TaskModule],
    })
      .overrideProvider(TaskService)
      .useValue(taskService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET tasks`, () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect(taskService.findAll());
  });

  it(`/GET tasks/:id`, () => {
    return request(app.getHttpServer())
      .get('/tasks/1')
      .expect(200)
      .expect(taskService.findOne());
  });

  it('/POST task2', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({
        name: 'task2',
      })
      .expect(HttpStatus.CREATED);
  });

  it('/PATCH task', () => {
    return request(app.getHttpServer())
      .patch('/tasks/1')
      .send({
        name: 'task2',
      })
      .expect(HttpStatus.OK);
  });

  it('/DELETE task', () => {
    return request(app.getHttpServer())
      .delete('/tasks/1')
      .expect(HttpStatus.OK);
  });

  it('/DELETE checked tasks', () => {
    return request(app.getHttpServer())
      .delete('/tasks/checked')
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
