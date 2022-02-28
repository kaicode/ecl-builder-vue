<template>
  <div class="expression-constraint">
    Focus concepts <div class="add" v-if="!model.exclusionExpressionConstraint">+</div>
    <div v-if="model.wildcard || model.conceptId">
      <SubExpressionConstraint :model="model" v-on:addAttribute="subExpressionAddAttribute"/>
    </div>
    <div v-if="model.eclRefinement">
      <RefinedExpressionConstraint :model="model"/>
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
    subExpressionAddAttribute() {
      this.$set(this.model, 'subexpressionConstraint', JSON.parse(JSON.stringify(this.model)));
      this.clearConcept(this.model);
      this.$set(this.model, 'eclRefinement', {
        subRefinement: {
          eclAttributeSet: {
            subAttributeSet: {
              attribute: {
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
            }
          }
        }
      });
    },
    clearConcept(model) {
      this.$delete(model, 'operator');
      this.$delete(model, 'conceptId');
      this.$delete(model, 'term');
      this.$delete(model, 'wildcard');
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
.expression-constraint div {
  margin: 5px;
}
</style>
