<template>
	<div class="carcontrol">
		<div class="car-decrease" v-show="food.count>0" @click="decreaseCar($event)" transition="move"><span class="inner">-</span></div>
		<div class="car-count" v-show="food.count>0">{{food.count}}</div>
		<div class="car-add" @click="addCar($event)"><span>+</span></div>
	</div>
</template>
<script type = "text/ecmascript-6">
  import Vue from "vue";
	export default {
		props: {
			food: {
				type: Object
			}
		},
		created () {
			// console.log(this.food)
		},
		methods: {
			addCar (event) {
				if(!event._constructed){
					return;
				}
				// console.log('click');
				if(!this.food.count){
					// this.food.count = 1;
					Vue.set(this.food,'count',1);
				}else {
					this.food.count +=1;
				}
			},
			decreaseCar (event) {
				if(!event._constructed){
					return;
				}
				if(this.food.count){
					this.food.count--;
				}
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .carcontrol
    font-size: 0
  	.car-decrease
  	  display: inline-block
  	  padding: 6px
  	  transition: all 2s linear
  	  line-height: 24px
  	  font-size: 24px
  	  &.move-transition
  	  	opacity: 1
  	  	transform: translate3D(0,0,0)
  	  .inner
  	    display: inline-block
  	    width: 24px
  	    height: 24px
  	    line-height: 24px
  	    font-weight: 700
  	    text-align: center
  	    border-radius: 50%
  	    color: #fff
  	    background: rgb(0,160,220)
  	    transition: all 1s linear
  	  &.move-enter, &.move-leave
  	  	opacity: 0
  	  	transform: translate3D(24px,0,0)
  	.car-count
  	  display: inline-block
  	  font-size: 16px
  	  vertical-align: top
  	  line-height: 24px
  	  width: 12px
  	  padding-top: 6px
  	  text-align: center
  	  color: rgb(147,153,159)
  	  
  	.car-add
  	  display: inline-block
  	  padding: 6px
  	  line-height: 24px
  	  font-size: 24px
  	  span
  	  	display: inline-block
  	  	width: 24px
  	  	height: 24px
  	  	line-height: 24px
  	  	text-align: center
  	  	font-weight: 700
  	  	border-radius: 50%
  	  	color: #fff
  	  	background: rgb(0,160,220)
</style>