import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UserAuthGuard } from '../../auth/user-auth-guard';
import { CreatePostRequestDto } from '../../dto/post.dto';
import { AppRequest } from 'src/models';
import { PostService } from '../../service/post/post.service';
import { Document } from 'mongoose';

@UseGuards(UserAuthGuard)
@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Post('/')
    async create(
        @Req() req: AppRequest,
        @Body() post: CreatePostRequestDto,
    ): Promise<Document> {
        return this.postService.createPost(post, req.user._id);
    }

    @Get('/:id')
    async get(@Req() req: AppRequest, @Param() params: { id: string }): Promise<Document> {
        return this.postService.getPostByID(req.user._id, params.id);
    }

    @Get('/')
    async getAll(@Req() req: AppRequest): Promise<Document[]> {
        return this.postService.getPostsByUserID(req.user._id);
    }
}


