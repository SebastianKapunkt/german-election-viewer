export interface State {
    id: number;
    name: string;
}

export interface Constituency {
    id: number;
    name: string;
}

export interface ElectionResult {
    partyName: string;
    firstPeriodResults: number;
    firstPrePeriodResults: number;
    secondPeriodResults: number;
    secondPrePeriodResults: number;
}