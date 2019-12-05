import { parent_phraseFirebase } from './parent_phrase';
import { likesFirebase } from './like';
import { commentFirebase } from './comment';
import { userFirebase } from './user';

export interface relatoFirebase{
    parent_phrase: parent_phraseFirebase
    image: string
    likes: likesFirebase []
    story_text: string
    last_phrase: string
  //  date: Date
    comments: commentFirebase []
    tag: string []
    user_id: string
    user: userFirebase
}