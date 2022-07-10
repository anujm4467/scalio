import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { PostController } from './post.controller';

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).to.be.not.null;
  });
});
