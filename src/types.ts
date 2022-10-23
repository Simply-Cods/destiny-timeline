export const styles = [
    "major",
    "minor",
    "empty",
    "filler",
    "fadeIn",
    "fadeOut",
] as const;
export type Style = typeof styles[number];

export interface TimelineData {
    time: string;
    title: string;
    subtitle: string;
    seasonAdded: number;
    // timelineIndex: number;
    // indexOverride: number;
    sources: string[];
    style: Style;
}

export interface TimelineDefinition {
    debugName: string;
    // index: number;
    contentDirection: string;
    children: TimelineData[];
}

export interface TimelineCard {
    time?: string;
    timelineEntries: TimelineEntry[];
}

export interface TimelineEntry {
    title?: string;
    description?: string;
    icon?: string;
    sources?: Source[];
}

export const sourceTypes = ["book", "transcript", "grimoire", "item"];
export type SourceType = typeof sourceTypes[number];

export interface Source {
    displayName: string;
    type: SourceType;
    link: string;
}
