export interface SampleObj {
  count?: number;
  results: SampleResult[];
  next?: string;
  previous?: string;
}

export interface SampleResult {
  id: number;
  name: string;
  tag: string[];
  username: string;
}

export interface SampleDetails {
  preview: string;
  name: string;
  description: string;
  images: string;
  id: number;
  tags: string[];
  username: string;
}
