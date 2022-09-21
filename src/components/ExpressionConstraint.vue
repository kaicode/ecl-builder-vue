<template>
  <div class="expression-constraint">
    Focus concepts<div v-if="allowRefinement" class="dropdown" >
      <div class="add" v-if="!model.exclusionExpressionConstraint">+</div>
      <div class="dropdown-content">
        <div class="item-subtitle">Add constraint:</div>
        <div v-if="model.wildcard || model.conceptId">
          <div class="item" v-on:click="addDisjunction">
            "Or" concept
          </div>
          <div class="item" v-on:click="addConjunction">
            "And" concept
          </div>
        </div>
        <div class="item" v-if="model.disjunctionExpressionConstraints" v-on:click="addDisjunctionToExisting">
          "Or" concept
        </div>
        <div class="item" v-if="model.conjunctionExpressionConstraints" v-on:click="addConjunctionToExisting">
          "And" concept
        </div>
      </div>
    </div>

    <div v-if="model.wildcard || model.conceptId">
      <SubExpressionConstraint :apiurl="apiurl" :branch="branch" :model="model" :allowRefinement="true" v-on:addAttribute="addAttribute(model)"/>
    </div>
    <div v-if="model.eclRefinement">
      <RefinedExpressionConstraint :apiurl="apiurl" :branch="branch" :model="model" :allowRefinement="true" v-on:addAttribute="refinedExpressionAddAttribute"/>
    </div>
    <div v-if="model.conjunctionExpressionConstraints || model.disjunctionExpressionConstraints || model.exclusionExpressionConstraint">
      <CompoundExpressionConstraint :apiurl="apiurl" :branch="branch" :model="model" v-on:addAttribute="compoundExpressionAddAttribute"/>
    </div>
  </div>
</template>

<script>
import SubExpressionConstraint from './SubExpressionConstraint.vue'
import RefinedExpressionConstraint from './RefinedExpressionConstraint.vue'
import CompoundExpressionConstraint from './CompoundExpressionConstraint.vue'
export default {
  name: 'ExpressionConstraint',
  props: {
    apiurl: String,
    branch: String,
    model: Object,
    allowRefinement: String
  },
  components: {
    SubExpressionConstraint,
    RefinedExpressionConstraint,
    CompoundExpressionConstraint
  },
  methods: {
    addDisjunction() {
      // Simple type
      let tmpModel = JSON.parse(JSON.stringify(this.model));
      this.$set(this.model, 'disjunctionExpressionConstraints', []);
      this.model.disjunctionExpressionConstraints.push(tmpModel);
      this.addDisjunctionToExisting();
      this.clearConcept(this.model);
    },
    addConjunction() {
      let tmpModel = JSON.parse(JSON.stringify(this.model));
      this.$set(this.model, 'conjunctionExpressionConstraints', []);
      this.model.conjunctionExpressionConstraints.push(tmpModel);
      this.addConjunctionToExisting();
      this.clearConcept(this.model);
    },
    addDisjunctionToExisting() {
      this.model.disjunctionExpressionConstraints.push(this.newConcept());
    },
    addConjunctionToExisting() {
      this.model.conjunctionExpressionConstraints.push(this.newConcept());
    },
    addAttribute(model) {
      this.$set(model, 'subexpressionConstraint', JSON.parse(JSON.stringify(model)));
      this.clearConcept(model);
      this.$set(model, 'eclRefinement', {
        subRefinement: {
          eclAttributeSet: {
            subAttributeSet: {
              attribute: this.newAttribute()
            }
          }
        }
      });
    },
    refinedExpressionAddAttribute() {
      let attSet = this.model.eclRefinement.subRefinement.eclAttributeSet;
      if (!attSet.conjunctionAttributeSet) {
        this.$set(attSet, 'conjunctionAttributeSet', []);
      }
      attSet.conjunctionAttributeSet.push(
        {
          id: this.random(),
          attribute: this.newAttribute() 
        });
    },
    compoundExpressionAddAttribute(event) {
      console.log(event);
      let tempModel = JSON.parse(JSON.stringify(event));
      this.$set(event, 'nestedExpressionConstraint', tempModel);
      this.clearConcept(event);
      this.addAttribute(event.nestedExpressionConstraint);
    },
    newConcept() {
      return {
        conceptId: '',
        operator: 'descendantorselfof'
      }
    },
    newAttribute() {
      return {
        attributeName: {
          conceptId: '',
          operator: 'descendantorselfof'
        },
        expressionComparisonOperator: '=',
        value: {
          conceptId: '',
          operator: 'descendantorselfof'
        }
      }
    },
    clearConcept(model) {
      this.$delete(model, 'operator');
      this.$delete(model, 'conceptId');
      this.$delete(model, 'term');
      this.$delete(model, 'wildcard');
    },
    random: function() {
      return Math.floor(Math.random() * 100000000);
    }
  }
}
</script>

<style scoped>
.expression-constraint {
  background-color: #f5e6e6;
  padding: 8px;
  display: inline-block;
  border-radius: 10px;
  border: 1px solid #C8CFD6;
  text-align: left;
}
.expression-constraint > div {
  margin: 5px;
}
</style>
