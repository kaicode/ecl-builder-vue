<template>
  <div class="expression-constraint">
    Focus concepts<div class="dropdown" >
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
      <SubExpressionConstraint :model="model" v-on:addAttribute="subExpressionAddAttribute" :allowRefinement="true"/>
    </div>
    <div v-if="model.eclRefinement">
      <RefinedExpressionConstraint :model="model" v-on:addAttribute="refinedExpressionAddAttribute" :allowRefinement="true"/>
    </div>
    <div v-if="model.conjunctionExpressionConstraints || model.disjunctionExpressionConstraints || model.exclusionExpressionConstraint">
      <CompoundExpressionConstraint :model="model" v-on:addAttribute="subExpressionAddAttribute"/>
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
    model: Object
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
    subExpressionAddAttribute() {
      this.$set(this.model, 'subexpressionConstraint', JSON.parse(JSON.stringify(this.model)));
      this.clearConcept(this.model);
      this.$set(this.model, 'eclRefinement', {
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
      console.log('refinedExpressionAddAttribute');
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
