<template>
  <div class="shopcar">
  	<div class="content" @click="toggleList">
  	  <div class="content-left">
  	  	<div class="logo-wrapper">
  	  	  <div class="logo" :class="{'highLight':totalCount>0}">
  	  	  	<span class="gouwuche" :class="{'highLight':totalCount>0}">购物车</span>
  	  	  </div>
  	  	  <div class="num" v-show="totalCount>0">{{totalCount}}</div>
  	  	</div>
  	  	<div class="price" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}</div>
  	  	<div class="desc">另需配送费￥{{deliveryprice}}元</div>
  	  </div>

  	  <div class="content-right">
  	  	<div class="pay" :class="payClass">
  	  		{{payDesc}}
  	  	</div>
  	  </div>

  	</div>
  	<transition name="fold">
  	<div class="shopcar-list" v-show="listShow">
  		<div class="list-header">
  			<h1 class="title">购物车</h1>
  			<span class="empty">清空</span>
  		</div>
  		<div class="list-content">
  			<ul>
  				<li class="food" v-for="food in selectFoods">
  					<span class="name">{{food.name}}</span>
  					<div class="price">
  						<span>￥{{food.price*food.count}}</span>
  					</div>
  					<div class="carcontrol-wrapper">
  						<carcontrol :food="food"></carcontrol>
  					</div>
  				</li>
  			</ul>
  		</div>
  	</div>
  	</transition>
  	
  </div>
</template>
<script type = "text/ecmascript-6" >
import carcontrol from "../carcontrol/carcontrol";

	export default {
	  components: {
	  	carcontrol
	  },
	  data () {
	  	return {
	  		fold: true
	  	}
	  },
	  props: {
	    deliveryprice: {
	      type: Number,
	      default: 0
	    },
	    minprice: {
	      type: Number,
	      default: 0
	    },
	    selectFoods: {
		  type: Array,
		  default () {
		    return [];
		  }
	    }
	  },
	  computed: {
	  	totalPrice () {
	  	  let total = 0;
	  	  this.selectFoods.forEach((food) => {
	  	  	total +=food.price*food.count;
	  	  });
	  	  return total;
	  	},
	  	totalCount () {
	  		let count = 0;
	  		this.selectFoods.forEach((food) => {
	  			count +=food.count;
	  		});
	  		return count;
	  	},
	  	payDesc () {
	  		if(this.totalPrice === 0){
	  			return `￥${this.minprice}元起送`;
	  		}else if(this.totalPrice < this.minprice){
	  			let diff = this.minprice - this.totalPrice;
	  			return `还差￥${diff}元起送`;
	  		}else{
	  			return '去结算';
	  		}
	  	},
	  	payClass () {
	  		if(this.totalPrice < this.minprice){
	  			return 'not-enough';
	  		}else {
	  			return 'enough';
	  		}
	  	},
	  	listShow () {
	  	  if(!this.totalCount){
	  	  	this.fold = true;
	  	  	return false;
	  	  }
	  	  let show = !this.fold;
	  	  return show;
	  	}
	  },
	  methods: {
	  	toggleList () {
	  	  if(!this.totalCount){
	  	  	return;
	  	  }
	  	  this.fold = !this.fold;
	  	  // console.log(111);
	  	}
	  }

	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
  .shopcar
    position: fixed
    left: 0 
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
  	  display: flex
  	  background: #141d27
  	  font-size: 0
  	  .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            text-align: center
            border-radius: 50%
            background: #2b343c
            &.highLight
              background: rgb(0,160,220)
            .gouwuche
              font-size: 24px
              line-height: 44px
              color: #80858a
              &.highLight
              //   // color: #fff
                background: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 8px
            font-weight: 700
            font-size: 9px
            color: #fff
            background: rgb(240,20,20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
            
        .price
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin-top: 12px
          padding-right: 12px
          border-right: 1px solid rgba(255,255,255,0.1)
          box-sizing: border-box
          font-size: 16px
          font-weight: 700
          color: rgba(255,255,255,0.4)
          &.highLight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          color: rgba(255,255,255,0.4)
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          color: rgba(255,255,255,0.4)
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
            
    .shopcar-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      // &.fold-transition
      &.fold-enter-active, .fold-leave-active
        transition: all 0.5s linear
        transform: translate3d(0, -100%, 0)
        // z-index: 50
      // &.fold-enter-active
      //   opacity: 1
      //   // z-index: 100
      //   transform: translate3d(0, -100%, 0)
      // &.fold-leave-active
      //   opacity: 0
      //   transform: translate3d(0, 0, 0)
      &.fold-enter,&fold-leave
        // z-index: 100
        // opacity: 0
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .title
          floatL: left
          font-size: 14px
          color: rgb(7,17,27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0,160,220)
      .list-content
        padding: 018px
        max-height: 217px
        background: #fff
        overflow: hidden
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7,17,27,0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7,17,27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 12px
            font-size: 14px
            font-weight: 700
            color: rgb(240,20,20)
          .carcontrol-wrapper
            position: absolute
            right: 0
            bottom: 0




// .shopcar .content .content-left .logo-wrapper .num {
// 	position: absolute;
// 	top: 0;
// 	right: 0;
// 	width: 24px;
// 	height: 16px;
// 	line-height: 16px;
// 	text-align: center;
// 	border-radius: 8px;
// 	font-weight: 700;
// 	font-size: 9px;
// 	color: #fff;
// 	background: rgb(240,20,20);
// 	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);

// }
// .shopcar .content .content-left .logo-wrapper .logo {
//     width: 100%;
//    	height: 100%;
//    	border-radius: 50%;
//    	text-align: center;
//    	background: #2b343c;
// }
// .shopcar .content .content-left .logo-wrapper .highLight {background: rgb(0,160,220);}
// .shopcar .content .content-left .logo-wrapper .logo .gouwuche {
// 	line-height: 44px;
// 	font-size: 24px;
// 	color:#80858a;
// }
// .shopcar .content .content-left .logo-wrapper .logo .highLight {background: #fff;}

// .shopcar .content .content-left .price {
//     display: inline-block;
//     vertical-align: top;
//     line-height: 24px;
//     margin-top: 12px;
//     padding-right: 12px;
//     border-right: 1px solid rgba(255,255,255,0.1);
//     box-sizing: border-box;
//     font-size: 16px;
//     font-weight: 700;
//     color: rgba(255,255,255,0.4);
// }
// .shopcar .content .content-left .highLight {color: #fff;}
// .shopcar .content .content-left .desc {
// 	display: inline-block;
// 	vertical-align: top;
// 	margin: 12px 0 0 12px;
// 	line-height: 24px;
//     color: rgba(255,255,255,0.4);
//     font-size: 10px;
// }
// .shopcar .content .content-right {
//     flex: 0 0 105px;
//     width: 105px;
// }
// .shopcar .content .content-right .pay {
// 	height: 48px;
// 	line-height: 48px;
// 	text-align: center;
// 	font-size: 12px;
// 	font-weight: 700;
//     color: rgba(255,255,255,0.4);
//     background: #2b333b;
// }
// .shopcar .content .content-right .not-neough {background: #2b333b;}
// .shopcar .content .content-right .enough {background: #00b43c;color: #fff;}
// .shopcar .shopcar-list {
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// 	/* z-index: -1; */
// 	width: 100%;
// 	/*height: -100%;*/
// }
// .shopcar .shopcar-list .list-header {
// 	height: 40px;
// 	line-height: 40px;
// 	padding: 0 18px;
// 	background: #f3f5f7;
// 	border-bottom: 1px solid rgba(7,17,27,0.1);

// }
// .shopcar .shopcar-list .list-header .title{
// 	float: left;
// 	font-size: 14px;
// 	color: rgb(7,17,27);
// }
// .shopcar .shopcar-list .list-header .empty{
// 	float: right;
// 	font-size: 12px;
// 	color: rgb(0,160,220);
// }
// .shopcar .shopcar-list .list-content {
// 	padding: 0 18px;
// 	max-height: 217px;
// 	overflow: hidden;
// 	background: #fff;

// }
// .shopcar .shopcar-list .list-content .food {
// 	position: relative;
// 	padding: 12px 0;
// 	box-sizing: border-box;
// 	border: 1px solid rgba(7,17,27,0.1);
// }
// .shopcar .shopcar-list .list-content .food .name {
// 	line-height: 24px;
// 	font-size: 12px;
// 	color: rgb(7,17,27);
// }
// .shopcar .shopcar-list .list-content .food .price {
// 	position: absolute;
// 	right: 90px;
// 	bottom:12px;
// 	line-height: 24px;
// 	font-weight: 700;
// 	font-size: 14px;
// 	color: rgb(240,20,20);
// }
// .shopcar .shopcar-list .list-content .carcontrol-wrapper {
// 	position: absolute;
// 	right: 0;
// 	bottom: 6px;

// }
/*.shopcar .fold-transition {
	transition: all 0.5;
	transform: translate3d(0,-100%,0);
}
.shopcar .fold-enter,.shopcar .fold-leave {
	transform: translate3d(0,0,0);
}*/

</style>