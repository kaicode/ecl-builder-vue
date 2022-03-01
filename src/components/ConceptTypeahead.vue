<template>
    <div class="ConceptTypeahead">
        <!-- optional indicators -->
        <i class="fa fa-spinner fa-spin" v-if="loading"></i>
        <template v-else>
            <i class="fa fa-search" v-show="isEmpty"></i>
            <i class="fa fa-times" v-show="isDirty" @click="reset"></i>
        </template>

        <!-- the input field -->
        <input type="text"
                autocomplete="off"
                v-model="query"
                @keydown.down="down"
                @keydown.up="up"
                @keydown.enter="hit"
                @keydown.esc="reset"
                @blur="reset"
                @input="update"/>
        <div class="info" v-bind:class="{ show: ecl }">
          <div class="icon">i</div>
          <div class="info-message">Input constraints from <a href="http://snomed.org/mrcm" target="_blank">MRCM</a> are active.</div>
        </div>
        <!-- the list -->
        <ul v-show="hasItems">
            <!-- for vue@1.0 use: ($item, item) -->
            <li v-for="(item, $item) in items" v-bind:key="item.conceptId" :class="activeClass($item)" @mousedown="hit" @mousemove="setActive($item)">
                <span v-text="item.fsn.term"></span>
            </li>
        </ul>
    </div>
</template>

<script>
import VueTypeahead from 'vue-typeahead'

// vue-typeahead setup .. not very clean..
import axios from 'axios';
import Vue from 'vue'
Vue.prototype.$http = axios

export default {
  name: 'ConceptTypeahead',
  extends: VueTypeahead,
  props: {
      model: Object,
      ecl: String
  },
  data: function() {
    return {
      query: this.model.conceptId,

      // The source url
      // (required)
      src: '/snowstorm/snomed-ct/MAIN/concepts',

      // The data that would be sent by request
      // (optional)
      data: {
        activeFilter: true,
        termActive: true,
        descriptionType: "900000000000003001",
        limit: 10
      },

      // Limit the number of items which is shown at the list
      // (optional)
      limit: 10,

      // The minimum character length needed before triggering
      // (optional)
      minChars: 3,

      // Highlight the first item in the list
      // (optional)
      selectFirst: true,

      // Override the default value (`q`) of query parameter name
      // Use a falsy value for RESTful query
      // (optional)
      queryParamName: 'term'
    }
  },

  methods: {
    // The callback function which is triggered when the user hits on an item
    // (required)
    onHit(item) {
      if (item === '*') {
        this.query = '*';
      } else {
        this.query = item.conceptId + ' |' + item.fsn.term + '|';
      }
      this.$set(this.model, 'conceptId', this.query);
      this.reset();
    },

    // The callback function which is triggered when the response data are received
    // (optional)
    prepareResponseData(data) {
      return data.items;
    },

    update() {
      this.cancel()
      if (!this.query) {
        return this.reset()
      }
      if (this.query != '*' && this.minChars && this.query.length < this.minChars) {
        return
      }

      this.loading = true

      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        if (this.query === '*') {
          this.onHit('*');
        } else {
          this.$set(this.data, 'ecl', this.ecl);
          this.fetch().then((response) => {
            if (response && this.query) {
              let data = response.data
              data = this.prepareResponseData ? this.prepareResponseData(data) : data
              this.items = this.limit ? data.slice(0, this.limit) : data
              this.current = -1
              this.loading = false

              if (this.selectFirst) {
                this.down()
              }
            }
          })
        }
      }, 300);// Delay
    },

    reset () {
      this.items = []
      this.loading = false
    }
  }
}
</script>

<style scoped>
.ConceptTypeahead {
  position: relative;
  display: inline-block;
}
.ConceptTypeahead input {
  width: 22em;
}
.ConceptTypeahead__input {
  width: 100%;
  font-size: 14px;
  color: #2c3e50;
  line-height: 1.42857143;
  box-shadow: inset 0 1px 4px rgba(0,0,0,.4);
  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  font-weight: 300;
  padding: 12px 26px;
  border: none;
  border-radius: 22px;
  letter-spacing: 1px;
  box-sizing: border-box;
}
.ConceptTypeahead__input:focus {
  border-color: #4fc08d;
  outline: 0;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px #4fc08d;
}
.fa-times {
  cursor: pointer;
}
i {
  float: right;
  position: relative;
  top: 30px;
  right: 29px;
  opacity: 0.4;
}
ul {
  position: absolute;
  padding: 0;
  margin-top: 8px;
  min-width: 100%;
  background-color: #fff;
  list-style: none;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0,0,0, 0.25);
  z-index: 1000;
}
li {
  padding: 10px 16px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
li:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
li:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: 0;
}
span {
  display: block;
  color: #2c3e50;
}
.active {
  background-color: #3aa373;
}
.active span {
  color: white;
}
.name {
  font-weight: 700;
  font-size: 18px;
}
.screen-name {
  font-style: italic;
}
.info {
  display: inline-block;
  /* margin-left: 3px; */
  cursor: pointer;
  visibility: hidden;

  position: absolute;
  margin-left: -22px;
  margin-top: 4px;
}
.icon {
  font-size: 0.75em;
  font-weight: bold;
  background-color: #5fb8e8;
  border-radius: 10px;
  padding: 0 7px;
  /* border: 1px solid white; */
  color: white;
}
.info.show {
  visibility: visible;
}
.info-message {
  position: absolute;
  background-color: aliceblue;
  padding: 10px 16px;
  border-radius: 5px;
  border: 1px solid #C8CFD6;
  visibility: hidden;
}
.info:hover > .info-message {
  visibility: visible;
}
</style>
