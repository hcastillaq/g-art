import { AttractorAndConfig } from "../../attractors";
import ParticleSystem from "../../config/attractor";

class ThomasAttractor extends ParticleSystem {
  makeParticle() {
    return {
      x: 0.1,
      y: 0.2,
      z: 0.3,
      b: 0.19,
      dt: this.random(0.01, 0.2),
    };
  }

  update() {
    for (let i = 0; i < this.maxParticles; i++) {
      const particle = this.particles[i];
      let dx = -particle.b * particle.x + Math.sin(particle.y);
      let dy = -particle.b * particle.y + Math.sin(particle.z);
      let dz = -particle.b * particle.z + Math.sin(particle.x);
      particle.x += dx * particle.dt * this.speed;
      particle.y += dy * particle.dt * this.speed;
      particle.z += dz * particle.dt * this.speed;

      this.geometry.attributes.position.setXYZ(
        i,
        particle.x,
        particle.y,
        particle.z
      );
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
}

export const ThomasAttractorConfig: AttractorAndConfig = {
  attractor: new ThomasAttractor(),
  config: {
    particles: 300000,
    speed: 1,
    zoom: 13,
    sizeParticle: 0.02,
    autoRotate: true,
    description: "",
  },
};

export default ThomasAttractor;
