// ParticleElectron.js

class ParticleElectron {
	constructor(_x, _y) {
		this.x = _x || Math.floor(Math.random() * eSpawnWidth) + eSpawnStartX;
		this.y = _y || Math.floor(Math.random() * eSpawnHeight) + eSpawnStartY;
		this.vx = this.vy = this.ax = this.ay = 0;
		this.timesHit = 0;
	}
}

ParticleElectron.prototype.update = function() {
	this.vx += this.ax;
	this.vy += this.ay;
	this.ax = this.ay = 0;
	this.x += this.vx;
	this.y += this.vy;

	if (this.x <= gridX) {
		// current energy based on position in the tube
		const energy =
			map(this.x, eSpawnStartX, gridX, 0, uGrid) -
			GLOW_DISTANCE[curMaterial] * this.timesHit;
		if (
			abs(
				((energy - 0.3) % GLOW_DISTANCE[curMaterial]) -
					GLOW_DISTANCE[curMaterial]
			) < 0.25
		) {
			scheduleGlow(this.x, this.y);
			this.vx -= GLOW_DISTANCE[curMaterial] * ELECTRON_HIT_SPEED_DECLINE;
			if (this.vx < ELECTRON_MAX_BACKWARDS_SPEED) {
				this.vx = ELECTRON_MAX_BACKWARDS_SPEED;
			}
			this.timesHit++;
		}
	} else {
		// if behind grid and negative velocity, go out of bounds and delete in simulation.js
		if (this.vx <= 0) {
			this.x = eRightBound + 1000;
		}
	}
};

ParticleElectron.prototype.accelerate = function(_ax, _ay) {
	this.ax += _ax;
	this.ay += _ay;
};
