<template>
<transition name="move">	
	<div class="food" v-show="showFlag" ref="food">
		<div class="food-content">
			<div class="image-header">
				<img :src="food.image" alt="">
				<div class="back" @click="hide">
					<span class="back-z"><</span>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>
			
			  <div class="carcontrol-wrapper">
				  <carcontrol :food="food"></carcontrol>
			  </div>
			  <div @click="addFist" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
			</div>
			<split v-show="food.info"></split>
			<div class="info" v-show="food.info">
				<h1 class="title">商品信息</h1>
				<p class="text">{{food.info}}</p>
			</div>
			<split></split>
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>

				<div class="rating-wrapper">
					<ul v-show="food.ratings && food.ratings.length">
						<li  class="rating-item" v-for="rating in food.ratings">
						<!-- v-show="needShow(rating.rateType,rating.text)" -->
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img width="12" height="12" alt="" class="avatar" :src="rating.avatar">
							</div>
							<div class="time">{{rating.rateTime | formatDate(time)}}</div>
							<p class="text">
								<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
							</p>
						</li>
					</ul>

					<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
				</div>
			</div>
		</div>
	</div>
</transition>
</template>
<script type = "text/ecmascript-6">
	import BScroll from "better-scroll"
	import Vue from 'vue'
	// import {formatDate} from "../../common/js/date"
	import carcontrol from "../carcontrol/carcontrol"
	import split from "../split/split"
	import ratingselect from "../ratingselect/ratingselect"

	const ALL = 2;

	export default {
		components: {
			carcontrol,
			split,
			ratingselect
		},
		filters: {
			formatDate(time) {
				// let date = new Date(time);
				// return formatDate(date, 'yyyy-mm-dd hh:mm');
				var date = new Date(time);

		        var datem = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);

		        var dated = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
		        var dateh = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
		        var datem = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
		        var dates = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();


		         var dateStr = date.getFullYear()+"-"+datem+"-"+dated+"  "+dateh+":"+datem+":"+dates;
		        return dateStr;
			}
		},
		
		props: {
			food: {
				type: Object
			}
		},
		data () {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '满意',
					positive: '推荐',
					negative: '吐槽'
				}
			};
		},
		methods: {
			show() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.food,{
							click: true
						})
					}else {
						this.scroll.refresh();
					}
					
				})
			},
			needShow(type,text) {
				if(this.onlyContent && !text){
					return false;
				}
				if(this.selectType === ALL){
					return true;
				}else {
					return type ===this.selectType;
				}
			},
			
			addFist(event) {
				if(!event._constructed){
					return;
				}
				Vue.set(this.food,'count',1);
			},
			hide () {
				this.showFlag = false;
			}
		},
		// events: {
		// 	'content.toggle'(onlyContent) {
		// 		this.onlyContent = onlyContent;
		// 		this.$nextTick(() => {
		// 			this.scroll.refresh();
		// 		})
		// 	},
		// 	'ratingtype.select' (type) {
		// 		this.selectType = type;
		// 		this.$nextTick(() => {
		// 			this.scroll.refresh();
		// 		})
		// 	}
		// }
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-enter-active, .move-leave-active
      transition: all 0.5s linear
      transform: translate3d(0, 0, 0)
    // &.move-enter-active
    //   // opacity: 1
    //   // z-index: 100
    //   transform: translate3d(0, -100%, 0)
    //   // transform: translateY(-100%)
    // &.move-leave-active
    //   opacity: 0
    //   transform: translate3d(0, 0, 0)
    &.move-enter,&move-leave
      // z-index: 100
      // transition: all 0.5s linear
      opacity: 0
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left:10px
        .back-z
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
          font-weight: 700
    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147,153,159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240,20,20)
        .old
          text-decoration: line-throunth
          font-size: 10px
          color: rgb(147,153,159)
      .carcontrol-wrapper
        position: absolute
        right: 12px 
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        font-size: 10px
        color: #fff
        background: rgb(0,160,220)
        border-radius: 12px
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7,17,27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77,85,93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7,17,27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7,17,27,0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147,153,159)
            .avatar
              border-radius: 50%
          .time
            line-height: 12px
            margin-bottom: 6px
            font-size: 10px
            color: rgb(147,153,159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7,17,27)
            .icon-thumb_up,.icon-thumb_down
              line-height: 16px
              margin-right: 4px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0,160,220)
            .icon-thumb_down
              color: rgb(147,153,159)
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147,153,159)


      
    
</style>