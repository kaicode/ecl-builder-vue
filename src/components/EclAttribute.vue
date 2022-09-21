<template>
  <div class="attribute-container">
    <div>
      With attribute
    </div>
    <SubExpressionConstraint :apiurl="apiurl" :branch="branch" :model="model.attributeName" :ecl="domainAttributesECL"/>
    <div v-if="model.expressionComparisonOperator" class="grid-container">
      <select v-model="model.expressionComparisonOperator">
        <option>=</option>
        <option>!=</option>
      </select>
      <SubExpressionConstraint :apiurl="apiurl" :branch="branch" :model="model.value" :ecl="attributeRangeEcl"/>
    </div>
    <div v-if="model.numericComparisonOperator">
      Numeric concrete domains not yet supported.
    </div>
    <div v-if="model.stringComparisonOperator">
      String concrete domains not yet supported.
    </div>
    <div v-if="model.booleanComparisonOperator">
      Boolean concrete domains not yet supported.
    </div>
    <!-- Trigger computed property -->
    <div v-if="domainAttributesProxy==='xxx'">{{domainAttributesProxy}}</div>
  </div>
</template>

<script>
import axios from 'axios';
import SubExpressionConstraint from './SubExpressionConstraint.vue'
export default {
  name: 'EclAttribute',
  props: {
    apiurl: String,
    branch: String,
    model: Object,
    focusConcept: Object
  },
  components: {
    SubExpressionConstraint
  },
  computed: {
    domainAttributesProxy: function() {
      // Used to set domainAttributesECL. Proxy is needed because async API call.
      let parentConceptId = '';
      if (this.focusConcept && this.focusConcept.operator != 'memberOf' && this.focusConcept.conceptId && !this.focusConcept.conceptId != '*') {
        parentConceptId = this.getConceptId(this.focusConcept.conceptId);
      }
      this.updateDomainAttributes(parentConceptId);
      return parentConceptId;
    },
    attributeRangeEcl: function() {
      let ecl = '';
      if (this.model.attributeName && this.model.attributeName.conceptId) {
        let attributeType = this.getConceptId(this.model.attributeName.conceptId);
        if (this.domainAttributes) {
          this.domainAttributes.forEach(domainAttribute => {
            if (attributeType === domainAttribute.conceptId) {
              if (domainAttribute.attributeRange) {
                ecl = domainAttribute.attributeRange[0].rangeConstraint;
              }
            }
          })
        } else {
          console.warn('Domain attributes missing.');
        }
      }
      return ecl;
    }
  },
  data: function() {
    return {
      domainAttributesECL: '',
      domainAttributes: []
    }
  },
  methods: {
    updateDomainAttributes: function(parentConceptId) {
      if (parentConceptId) {
        axios({
          url: '/snowstorm/snomed-ct/mrcm/MAIN/domain-attributes',
          method: 'get',
          params: {
            proximalPrimitiveModeling: false,
            parentIds: parentConceptId
          },
          headers: {'Content-Type': 'text/plain'}
        })
        .then(response => {
          console.log(response.data);
          this.domainAttributes = response.data.items;
          let conceptIds = [];
          response.data.items.forEach(item => conceptIds.push(item.conceptId));
          let newEcl = conceptIds.join(' OR ');
          this.$set(this, 'domainAttributesECL', newEcl);
        });
      } else {
        this.domainAttributesECL = '';
      }
    },
    getConceptId: function(conceptIdAndTerm) {
      if (conceptIdAndTerm && conceptIdAndTerm.indexOf('|') != -1) {
        return conceptIdAndTerm.substring(0, conceptIdAndTerm.indexOf('|')).trim();
      }
      return conceptIdAndTerm;
    }
  }
}
</script>

<style scoped>
.attribute-container {
  background-color: #c9e5f4;
  /* display: inline-block; */
  /* text-align: left; */
  padding: 5px;
  border-radius: 10px;
}
.attribute-container div {
  display: inline-block;
  margin: 5px;
}
</style>
