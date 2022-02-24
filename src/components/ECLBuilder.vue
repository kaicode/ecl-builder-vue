<template>
  <div>
    <ExpressionConstraint :model="model"/>
    <h3>Output</h3>
    <textarea cols="60" rows="5" disabled v-if="eclOutput" v-model="eclOutput"></textarea>
  </div>
</template>

<script>
import axios from 'axios';
import ExpressionConstraint from './ExpressionConstraint.vue';

export default {
  name: 'ECLBuilder',
  components: {
    ExpressionConstraint
  },
  props: {
    apiUrl: String,
    branch: String,
    eclString: String
  },
  data: function() {
    return {
      model: {}
    }
  },
  asyncComputed: {
    eclOutput() {
      return this.updateOutput(this.model);
    }
  },
  // watch: {
  //   model: function(val) {
  //     this.updateOutput(val);
  //   }
  // },
  mounted: function() {
    axios({
      url: this.apiUrl + '/util/ecl-string-to-model',
      method: 'post',
      data: this.eclString,
      headers: {'Content-Type': 'text/plain'}
    })
    .then(response => {
      console.log('Response ', response.data);
      this.model = this.transformIn(response.data);
    });
  },
  methods: {
    transformIn: function(model) {
      if (model.conceptId) {
        if (model.term) {
          model.conceptId += ' |' + model.term + '|';
        }
      }
      return model;
    },
    transformOut: function(model) {
      // Recursively itterate through model fixing things
      const pattern = /[0-9]+/;
      for (var prop in model) {
        if (!pattern.test(prop) && Object.prototype.hasOwnProperty.call(model, prop)) {
          if (prop === 'operator' && model[prop] === '') {
            delete model[prop];
          } else {
            this.transformOut(model[prop]);
          }
        }
      }
      return model;
    },
    updateOutput: function(model) {
      const modelDeepClone = JSON.parse(JSON.stringify(model));
      this.transformOut(modelDeepClone);
      return axios({
          url: this.apiUrl + '/util/ecl-model-to-string',
          method: 'post',
          data: modelDeepClone,
          headers: {'Content-Type': 'text/plain'}
        })
        .then(response => {
          return response.data.eclString;
        });
      // console.log("here");
      // return response.data.eclString;
      // return value;
    }
  }
}
</script>

<style scoped>
</style>
