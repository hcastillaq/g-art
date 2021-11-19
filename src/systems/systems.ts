import ParticleSystem from "./config/attractor";
import { AizawaAttractorConfig } from "./all/aizawa/aizawa.attractor";
import { LorenzAttractorConfig } from "./all/lorenz/lorenz.attractor";
import { ThomasAttractorConfig } from "./all/thomas/thomas.attractor";
import { DadrasAttractorConfig } from "./all/dadras/dadras.attractor";
import { ChenAttractorConfig } from "./all/chen/chen.attractor";

export type AttractorConfig = {
  particles: number;
  zoom: number;
  sizeParticle: number;
  autoRotate: boolean;
  description: string;
  speed: number;
};
export type AttractorAndConfig = {
  attractor: ParticleSystem;
  config: AttractorConfig;
};

export const ATTRACTORS: { [key: string]: AttractorAndConfig } = {
  "Lorenz Attractor": { ...LorenzAttractorConfig },
  "Aizawa Attractor": { ...AizawaAttractorConfig },
  "Thomas Attractor": { ...ThomasAttractorConfig },
  "Dadras Attractor": { ...DadrasAttractorConfig },
  "Chen Attractor": { ...ChenAttractorConfig },
};