import { BaseVote } from './vote.model'

export interface Party {
    name: string;

    region: string;
    voteValues: BaseVote;
}