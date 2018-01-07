import { Region } from './region.model'
import { BaseVote } from './vote.model'

export interface State {
    name: string;
    id: number;

    authorizedVoters: BaseVote;
    voters: BaseVote;
    invalidVotes: BaseVote;
    validVotes: BaseVote;
    regions: Region[];
}