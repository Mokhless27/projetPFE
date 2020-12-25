import { Module } from '@nestjs/common';
import { CommentaireController } from './commentaire.controller';
import { CommentaireService } from './commentaire.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentaireRepository } from './commentaire.repository';
import { ReponseModule } from 'src/reponse/reponse.module';
import { BlogModule } from 'src/blog/blog.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentaireRepository]),
    ReponseModule,
    BlogModule,
    AuthModule,
  ],
  controllers: [CommentaireController],
  providers: [CommentaireService],
})
export class CommentaireModule {}
