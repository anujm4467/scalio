import { Injectable } from '@nestjs/common';
import { PostDbModel } from '../../database/models';
import { CreatePostRequestDto } from '../../dto/post.dto';
import { Document, Types } from 'mongoose';

@Injectable()
export class PostService {
    createPost(post: CreatePostRequestDto, userID: string): Promise<Document> {
        return PostDbModel.create({ ...post, userID });
    }

    async getPostByID(userID: string, ID: string): Promise<Document> {
        return PostDbModel.findOne({
            _id: new Types.ObjectId(ID),
            userID,
        });
    }

    async getPostsByUserID(userID: string): Promise<Document[]> {
        return PostDbModel.find({ userID });
    }
}
