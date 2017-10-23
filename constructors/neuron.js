function Neuron(brain, layer) {
      //if (layer == 2) {
      //    console.log('Uh oh.');
      //}
      //console.log(layer)
      //if (layer == brain.inputSize - 1) {
      //    console.log('Uh oh:' + layer);
      //}
      //if (layer == brain.outputSize - 1) {
      //    console.log('Uh oh:' + layer);
      //}
      brain.counter++;
      brain.globalReferenceNeurons[brain.counter] = this;
      this.active = true;
      this.layer = layer;
      this.id = brain.counter;
      this.weight = 2;
      this.connected = {};
      this.connections = {};
      this.recentCharges = [0.5, 0.5, 0.5, 0.5, 0.5];
      this.memory = 5;
      this.polarization = 0.5;
      this.depolarizationRate = 0.1;
      this.deresistanceRate = 0.05;
      this.resistance = 0;
      this.chargeRate = 0.3;
      this.threshold = 1;
      this.resistanceGain = 0.1;
      this.connect = (target) => {
          //if (target.layer == 2) {
          //    console.log(target);
          //}
          new Connection(brain, this, target, (id, connection) => {
              brain.globalReferenceConnections[id] = connection;
              this.connections[id] = connection;
          });
      };
      this.disconnect = (id) => {
          this.connections[id].active = false;
      };
      this.destroy = () => {
          this.active = false;
          Object.values(this.connected).forEach(connection=>{
            connection.active = false;
          });
          Object.values(this.connections).forEach(connection=>{
            connection.active = false;
          });
      };
      this.measure = () => {
          //console.log('Measuring...');
          //console.log(that);
          //console.log('Measuring neuron bias based on memory of [' + this.recentCharges.toString() + ']');
          var total = 0;
          var bias;
          for (var i1 = 0; i1 < this.recentCharges.length; i1++) {
              total += this.recentCharges[i1];
          }
          //console.log(total);
          //console.log(this.recentCharges.length);
          bias = total / this.recentCharges.length;
          return bias;
      }
      this.transmit = (charge) => { //this needs to transmit the raw charge and simply handle polarization timing and refactory period,
          //instead handling memory bias in the connection
          this.recentCharges.push(charge);
          if (this.recentCharges.length > this.memory) this.recentCharges.splice(0, 1);
          //console.log('Neuron ' + that.id + ' received charge of: ' + charge);
          //var total = charge - that.resistance;
          //if (total < 0) total = 0;
          //else if (total > 1) total = 1;
          //console.log('Neuron ' + that.id + ' passed ' + total + ' after resistance of: ' + that.resistance);
          //console.log('Neuron ' + this.id + ' gained ' + total + ' polarization after resistance of: ' + this.resistance);
          //that.resistance -= that.deresistanceRate;
          //if (that.resistance < 0) {
          //    that.resistance = 0;
          //}
          //that.threshold -= that.chargeRate;
          //if (that.threshold < 1) {
          //    that.threshold = 1;
          //}
          //console.log('Polarization dropped by: ' + this.depolarizationRate);
          //that.polarization -= that.depolarizationRate;
          //if (that.polarization < 0) {
          //    that.polarization = 0;
          //}
          this.polarization += charge; //total;
          //console.log('Neuron ' + this.id + ' now has polarization of: ' + this.polarization);
          //that.resistance += that.resistanceGain;
          //if (that.resistance > 1) {
          //    that.resistance = 1;
          //}
          if (this.polarization >= this.threshold) {
              //console.log('Neuron ' + this.id + ' emitting charge of ' + charge);
              //that.threshold = 3;
              this.polarization = 0;
              Object.values(this.connections).forEach(connection=>{
                if (connection.active == true && isNumber(charge)) {
                      connection.activate(charge);
                }
              });

//                 for (var prop in this.connections) {
//                     //console.log('yep');
//                     if (that.connections[prop].active == true && isNumber(charge)) {
//                         that.connections[prop].activate(charge);
//                         //that.connections[prop].activate(total);
//                         //if (brain.activations % 1000 === 0) {
//                         //console.log('Total Activations: ' + brain.activations);
//                         //console.log('Total Complexity: ' + brain.counter);
//                         //    console.log('Neuron ' + that.id + ' received charge of: ' + charge);
//                         //}
//                     }
//                 }

          }

          //else {
          //    console.log('Neuron ' + this.id + ' failed to reach threshold for action potential.');
          //}

      };
  }
module.exports = Neuron;
