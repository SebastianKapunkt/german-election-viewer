export interface BaseVote {
    primaryVote: VoteCycles;
    secondaryVote: VoteCycles;
}

export interface VoteCycles {
    preliminaryVotes: number;
    previousPeriod: number;
}