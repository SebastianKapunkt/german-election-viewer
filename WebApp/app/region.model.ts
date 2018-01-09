import { BaseVote } from './vote.model'

export interface Region {
    name: string;
    belongs_to: number;

    authorizedVoters: BaseVote;
    voters: BaseVote;
    invalidVotes: BaseVote;
    validVotes: BaseVote;
}