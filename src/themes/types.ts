import type { ComponentType } from 'react';
import type { TuningDefinition } from '../types/song';
import type { DetectedString } from '../lib/pitchUtils';

// ── Slot prop interfaces ─────────────────────────────────
// These are the contracts between the layout skeleton and themed components.
// Themes must accept these props exactly.

export interface HeaderProps {}

export interface NoteDisplayProps {
  detected: DetectedString | null;
  isListening: boolean;
}

export interface PitchMeterProps {
  centsOff: number;
  inTune: boolean;
}

export interface StringIndicatorProps {
  tuning: TuningDefinition;
  activeStringIndex: number | null;
  inTune: boolean;
}

export interface ActionButtonProps {
  isListening: boolean;
  onClick: () => void;
}

export interface TuningSelectorProps {
  selected: TuningDefinition;
  onChange: (tuning: TuningDefinition) => void;
}

// ── Theme tokens ─────────────────────────────────────────
// Universal design tokens every theme must provide.
// Themes can add arbitrary extra keys for their own components.

export interface ThemeTokens {
  fontUrl: string;
  fontDisplay: string;
  fontReadout: string;

  colorBg: string;
  colorPanel: string;
  colorPanelTranslucent: string;
  colorText: string;
  colorMuted: string;
  colorAccent: string;
  colorAccentDark: string;
  colorInTune: string;
  colorError: string;
  borderSubtle: string;

  bgTexture: string;
  bgTextureSize: string;

  [key: string]: string | number;
}

// ── Theme definition ─────────────────────────────────────

export interface ThemeComponents {
  Header: ComponentType<HeaderProps>;
  NoteDisplay: ComponentType<NoteDisplayProps>;
  PitchMeter: ComponentType<PitchMeterProps>;
  StringIndicator: ComponentType<StringIndicatorProps>;
  ActionButton: ComponentType<ActionButtonProps>;
  TuningSelector: ComponentType<TuningSelectorProps>;
}

export interface ThemeDefinition {
  id: string;
  name: string;
  tokens: ThemeTokens;
  components?: Partial<ThemeComponents>;
}
