<template>
  <div style="display: grid; margin: 10px" class="ecl-builder">
    <ExpressionConstraint :apiurl="apiurl" :branch="branch" :model="model" allowRefinement="true"/>
    <textarea cols="60" rows="5" hidden v-if="eclModelString" v-model="eclModelString"></textarea>
    <div v-if="showoutput">
      <h3>Output</h3>
      <textarea cols="60" rows="5" disabled v-if="eclOutput" v-model="eclOutput"></textarea>
    </div>
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
    apiurl: String,
    branch: String,
    eclstring: String,
    showoutput: Boolean
  },
  emits: ['eclOutput'],
  computed: {
    eclModelString() {
      let modelDeepClone = JSON.stringify(this.model);
      this.updateOutput(this.model);
      return modelDeepClone;
    }
  },
  data() {
    return {
      model: {},
      eclOutput: "loading"
    }
  },
  watch: {
    eclstring() {
      this.readEcl()
    }
  },
  mounted() {
    this.readEcl()
  },
  methods: {
    readEcl() {
      this.model = {}
      this.stringToModel((newModel) => this.model = newModel);
    },
    stringToModel: function(callback) {
      axios({
        url: this.apiurl + '/util/ecl-string-to-model',
        method: 'post',
        data: this.eclstring,
        headers: {'Content-Type': 'text/plain'}
      })
      .then(response => {
        callback(this.transformIn(response.data))
      });    
    },
    transformIn: function(model) {
      const pattern = /[0-9]+/;
      let context = this;
      for (var prop in model) {
        if (!pattern.test(prop) && Object.prototype.hasOwnProperty.call(model, prop)) {
          if (prop === 'wildcard' && model[prop] === true) {
            model.conceptId = "*";
          } else if (prop === 'term') {
            model.conceptId += ' |' + model.term + '|';
          } else if (prop === 'returnAllMemberFields') {
            delete model[prop];
          } else if (Array.isArray(model[prop])) {
            let someArray = model[prop];
            someArray.forEach(function(value) {
              value.id = context.random();
              context.transformIn(value);
            })
          } else {
            this.transformIn(model[prop]);
          }
        }
      }
      return model;
    },
    updateOutput: function(model) {
      let modelDeepClone = JSON.parse(JSON.stringify(model));
      this.transformOut(modelDeepClone);
      let context = this;
      axios({
          url: this.apiurl + '/util/ecl-model-to-string',
          method: 'post',
          data: modelDeepClone,
          headers: {'Content-Type': 'text/plain'}
        })
        .then(response => {
          context.eclOutput = response.data.eclString;
          context.$emit('eclOutput', context.eclOutput);
        });
    },
    transformOut: function(model) {
      // Recursively itterate through model fixing things
      const pattern = /[0-9]+/;
      let context = this;
      for (var prop in model) {
        if (!pattern.test(prop) && Object.prototype.hasOwnProperty.call(model, prop)) {
          if (prop === 'operator' && model[prop].length === 0) {
            delete model[prop];
          } else if (prop === 'conceptId') {
            let conceptId = model[prop];
            model.wildcard = conceptId === '*';
            if (model.wildcard) {
              delete model.conceptId;
              delete model.term;
            } else if (conceptId.indexOf('|') != -1) {
              model.term = conceptId.substring(conceptId.indexOf('|') + 1).replaceAll('|', '').trim();
              model[prop] = conceptId.substring(0, conceptId.indexOf('|')).trim();
            }
          } else if (Array.isArray(model[prop])) {
            let someArray = model[prop];
            someArray.forEach(function(value) {
              delete value.id;
              context.transformOut(value);
            });
          } else {
            this.transformOut(model[prop]);
          }
        }
      }
    },
    random: function() {
      return Math.floor(Math.random() * 100000000);
    }
  }
}
</script>

<style>
.ecl-builder {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
input, select {
  padding: 3px;
}
.add {
  background-color: #4ea24e;
  color: white;
  font-weight: bold;
  border-radius: 11px;
  padding: 0 6px;
  text-align: center;
  display: inline;
  cursor: pointer;
  margin-left: 4px;
}
.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.dropdown-content {
  display: none;
  width: 200px;
  margin-left: -100px;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0, 0.25);
  z-index: 1;
  border-radius: 4px;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown .item {
  padding: 7px 15px;
  border-bottom: 1px solid #ccc;
}
.dropdown .item:hover {
  background-color: #3aa373;
  color: white;
}
.dropdown .item-subtitle {
  padding: 7px;
  font-weight: bold;
  color: grey;
  border-bottom: 1px solid #ccc;
  font-size: 0.9em;
}
.dropdown-content .item:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: 0;
}

</style>
