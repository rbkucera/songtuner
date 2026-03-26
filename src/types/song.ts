export interface TuningDefinition {
  name: string;
  displayName: string;
  midiNotes: number[];
  noteNames: string[];
  stringCount: number;
}

export interface InstrumentRole {
  role: string;
  displayName: string;
  tuning: TuningDefinition;
  capoFret: number;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  instruments: InstrumentRole[];
}
