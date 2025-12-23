
export enum RizzType {
  SMOOTH = 'Smooth',
  WITTY = 'Witty',
  BOLD = 'Bold',
  WHOLESOME = 'Wholesome'
}

export interface RizzLine {
  type: RizzType;
  line: string;
  explanation: string;
}

export interface RizzResponse {
  rizzLines: RizzLine[];
}

export interface UserContext {
  intensity: number;
  vibe: string;
}
