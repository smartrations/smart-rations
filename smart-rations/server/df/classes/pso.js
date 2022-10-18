//     Copyright 2015 Adrian Toncean; released under the MIT license
(function () {
    'use strict';

    // Defines a candidate solution
    function Particle(position, velocity, options) {
        this.position = position;
        this.velocity = velocity;
        this.bestPosition = new Array(this.position.length);
        this.fitness = -Infinity;
        this.bestFitness = +Infinity;

        this._inertiaWeight = options.inertiaWeight;
        this._social = options.social;
        this._personal = options.personal;
    }

    Particle.prototype = {
        // Stores the current position as its best so far.
        storePosition: function () {
            this.bestPosition = this.position.slice(0);
        },

        // Retrieves the particle's current position.
        getPosition: function () {
            return this.position.slice(0);
        },

        // Retrieves the particle's best saved position.
        getBestPosition: function () {
            return this.bestPosition.slice(0);
        },

        // Updates the particle's velocity vector based on inertia,
        // the best-performing particle in the swarm and
        // the best position the current particle has saved.
        updateVelocity: function (globalBest, random) {
            this.position.forEach(function (component, index) {
                var inertia = this.velocity[index] * this._inertiaWeight;
                var socialInfluence = (globalBest.position[index] - component) * random() * this._social;
                var personalInfluence = (this.bestPosition[index] - component) * random() * this._personal;

                this.velocity[index] = inertia + socialInfluence + personalInfluence;
            }, this);
        },

        // Applies the velocity
        updatePosition: function () {
            this.velocity.forEach(function (component, index) {

                this.position[index] += component;
                if (this.position[index] < 0) this.position[index] = 0;

            }, this);
        }
    };

    Particle.createRandom = function (domain, options, random) {
        var position = domain.map(function (interval) {
            return random() * (interval.end - interval.start) + interval.start;
        });

        var velocity = domain.map(function (interval) {
            return (random() * (interval.end - interval.start)) * 0.05;
        });

        return new Particle(position, velocity, options);
    };
    // ------------------------------------------------------------------------
    // Used to define domains.
    // An *Interval* is anything with a *start* and an *end*.
    function Interval(start, end) {
        this.start = start;
        this.end = end;

    }
    // ------------------------------------------------------------------------
    // Holds particles and carries out the optimization task.
    function Optimizer(feed, per) {
        this._foragePer = per
        this._otherPer = 100 - per
        this.feed = feed
        this._in = feed.map((a, index) => a?.EnergyEqClass == "Forage" ? index : -1).filter(b => b != -1);
        this._particles = null;
        this._objectiveFunction = null;

        this._bestPositionEver = null; //null
        this._bestFitnessEver = +Infinity;

        this._options = {
            inertiaWeight: 0.8,
            social: 0.4,
            personal: 1,
            pressure: 1
        };

        this._async = false;
        this._waiting = false;

        this.rng = {
            random: Math.random,
            setSeed: function () { }
        };
    }

    Optimizer.prototype = {
        setOptions: function (options) {
            // + *inertiaWeight* - is multiplied every frame with the previous velocity;
            // takes values between 0 and 1
            if (options.inertiaWeight !== undefined) {
                this._options.inertiaWeight = options.inertiaWeight;
            }

            // + *social* dictates the influence of the best performing particle when updating particle velocities
            // takes values between 0 and 1
            if (options.social !== undefined) {
                this._options.social = options.social;
            }

            // + *personal* dictates the influence of a particle's best encountered position
            // takes values between 0 and 1
            if (options.personal !== undefined) {
                this._options.personal = options.personal;
            }

            // + *pressure* - bias in selecting the best performing particle in the swarm.
            // Takes values between 0 and 1; 0 meaning that the best is chosen randomly and 1 that
            // the actual best is computed at every iteration
            if (options.pressure !== undefined) {
                this._options.pressure = options.pressure;
            }
        },

        setObjectiveFunction: function (objectiveFunction, options) {
            this._objectiveFunction = objectiveFunction;
            this._async = options && options.async;
        },

        // To be called before any simulation.
        // Creates the swarm and resets any previous recorded best solutions
        init: function (nParticles, generationOption) {
            var generator = generationOption instanceof Function ?
                generationOption :
                function () {
                    return Particle.createRandom(generationOption, this._options, this.rng.random);
                }.bind(this);

            this._bestPositionEver = null;
            this._bestFitnessEver = +Infinity;

            this._particles = [];
            for (var i = 0; i < nParticles; i++) {
                this._particles.push(generator());
            }

            //console.log(this._particles[1]);

            this._particles.forEach(a => this.percentfun(a));




        },

        percentfun: function (particle) {
            //console.log(particle)
            let _in = this._in
            //console.log(`Forage olanlar: ${_in}`)
            let _forage = 0;
            let _oth = 0;
            particle.position.forEach((_pos, index) => {
                _in.includes(index) ? _forage += _pos : _oth += _pos;
            })
            //console.log(`f: ${_forage} o: ${_oth}`)

            particle.position.forEach((_pos, index) => {
                if (_in.includes(index))
                    particle.position[index] *= this._foragePer / _forage;
                else particle.position[index] *= this._otherPer / _oth;
            })
            /* 
                        particle.velocity.forEach((_pos, index) => {
                            if (_in.includes(index))
                                particle.velocity[index] *= this._foragePer / _forage;
                            else particle.velocity[index] *= this._otherPer / _oth;
                        })
                    	
             */
            //let sum = particle.position.reduce((a, b) => a + b, 0);
            /* 
                        particle.position.forEach((num, index) => {
                            particle.position[index] = (num / sum) * 100;
                        });
        	
             */
            /* 
            sum = particle.velocity.reduce((a, b) => a + b, 0);

            particle.velocity.forEach((num, index) => {
                particle.velocity[index] = (num / sum) * 100;
            });
             */
        },

        // Retrieve the fittest particle from a subset of the entire swarm.
        // The subset's size depends on the *pressure* parameter
        _getRandomBest: function (except) {
            var ret = Math.floor(this.rng.random() * this._particles.length);

            this._particles.forEach(function (particle, index) {
                if (
                    this.rng.random() < this._options.pressure &&
                    this._particles[index].fitness > this._particles[ret].fitness &&
                    index !== except
                ) {
                    ret = index;
                }
            }, this);

            return ret;
        },

        // Iterate once;
        // *callback* is supplied only if the fitness function is asynchronous
        step: function (callback) {
            if (this._async) {
                if (this._waiting) {
                    console.warn('Cannot step again before previous requests have been completed!');
                    return;
                }
                this._waiting = true;
                var completed = 0;
                this._particles.forEach(function (particle) {
                    this._objectiveFunction(particle.position, function (fitness) {
                        particle.fitness = fitness;
                        completed++;
                        if (completed >= this._particles.length) {
                            this._waiting = false;
                            this._completeStep();
                            callback();
                        }
                    }.bind(this));
                }, this);
            } else {
                this._particles.forEach(function (particle) {
                    particle.fitness = this._objectiveFunction(particle.position);
                }, this);
                this._completeStep();
            }
        },

        _completeStep: function () {
            // Record the best found solutions
            this._particles.forEach(function (particle) {
                if (particle.fitness < particle.bestFitness) {

                    particle.bestFitness = particle.fitness;
                    particle.storePosition();

                    if (particle.fitness < this._bestFitnessEver) {
                        this._bestFitnessEver = particle.fitness;
                        this._bestPositionEver = particle.getPosition();
                    }
                }
            }, this);

            // Update velocities
            this._particles.forEach(function (particle, index) {
                var randomBest = this._particles[this._getRandomBest(index)];
                particle.updateVelocity(randomBest, this.rng.random);
            }, this);

            // Update positions
            this._particles.forEach(function (particle) {
                particle.updatePosition();
            });

            this._particles.forEach(a => this.percentfun(a))
        },

        // Retrieves an array of all solutions in the swarm
        getParticles: function () {
            return this._particles.map(function (particle) {
                return {
                    position: particle.getPosition(),
                    fitness: particle.fitness,
                    bestPosition: particle.getBestPosition(),
                    bestFitness: particle.bestFitness
                };
            });
        },

        // Retrieves the best solution ever recorded
        getBestPosition: function () {
            return this._bestPositionEver;
        },

        // Retrieves the best fitness ever recorded
        getBestFitness: function () {
            return this._bestFitnessEver;
        },

        // Retrieves the mean fitness of the entire swarm
        getMeanFitness: function () {
            var sum = this._particles.reduce(function (partialSum, particle) {
                return partialSum + particle.fitness;
            }, 0);
            return sum / this._particles.length;
        }
    };
    // ------------------------------------------------------------------------
    // *pso.js* works
    if (typeof define === 'function' && define.amd) {
        // + with *RequireJS*
        define('pso/Interval', function () { return Interval; });
        define('pso/Particle', function () { return Particle; });
        define('pso/Optimizer', function () { return Optimizer; });
    } else {
        var pso = {
            Interval: Interval,
            Particle: Particle,
            Optimizer: Optimizer
        };
        if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
            // + from a *WebWorker*
            self.pso = pso;
        } else if (typeof module !== 'undefined' && module.exports) {
            // + in *node*
            module.exports = pso;
        } else {
            // + or in a plain browser environment
            window.pso = pso;
        }
    }
})();
