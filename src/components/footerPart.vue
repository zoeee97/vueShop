<!--
 * @Author: zyy 1741540959@qq.com
 * @Date: 2022-10-03 21:33:23
 * @LastEditors: zyy
 * @LastEditTime: 2022-10-06 22:39:03
 * @Description: file content
-->
<template>
  <div id="footer">
    <div class="footerList">
      <ul>
        <li>购物指南</li>
        <li>购物流程</li>
        <li>会员介绍</li>
        <li>生活旅行/团购</li>
        <li>常见问题</li>
        <li>购物指南</li>
      </ul>
      <ul>
        <li>配送方式</li>
        <li>上门自提</li>
        <li>211限时达</li>
        <li>配送服务查询</li>
        <li>配送费收取标准</li>
        <li>海外配送</li>
      </ul>
      <ul>
        <li>支付方式</li>
        <li>货到付款</li>
        <li>在线支付</li>
        <li>分期付款</li>
        <li>邮局汇款</li>
        <li>公司转账</li>
      </ul>
      <ul>
        <li>售后服务</li>
        <li>售后政策</li>
        <li>价格保护</li>
        <li>退款说明</li>
        <li>返修/退换货</li>
        <li>取消订单</li>
      </ul>
      <ul>
        <li>特色服务</li>
        <li>夺宝岛</li>
        <li>DIY装机</li>
        <li>延保服务</li>
        <li>尚品汇E卡</li>
        <li>尚品汇通信</li>
      </ul>
    </div>
    <div class="copyRight">
      <ul class="helpLink">
        <li>
          关于我们
          <span class="space">|</span>
        </li>
        <li>
          联系我们
          <span class="space">|</span>
        </li>
        <li>
          关于我们
          <span class="space">|</span>
        </li>
        <li>
          商家入驻
          <span class="space">|</span>
        </li>
        <li>
          营销中心
          <span class="space">|</span>
        </li>
        <li>
          友情链接
          <span class="space">|</span>
        </li>
        <li>
          我好穷啊
          <span class="space">|</span>
        </li>
        <li>
          活着很难
          <span class="space">|</span>
        </li>
        <li>
          这是彩蛋
          <span class="space">|</span>
        </li>
        <li>
          哇哇哇哇
        </li>
      </ul>
        <p>地址：北京市昌平区宏福科技园综合楼6层</p>
        <p>京ICP备19006430号</p>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="less" scoped>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
  }
  #footer{
    background-color: #eaeaea;
    padding: 15px 120px;
    .footerList{
      display: flex;
      flex-direction: row;
      ul{
        flex: 1;
        font-size: 14px;
        color: rgb(59, 58, 58);
        li{
          width: 60%;
          margin: 0 auto;
        }
        li:nth-child(1){
          font-weight: bold;
        }
      }
    }
    .copyRight{
      margin: 50px 0;
      color: rgb(59, 58, 58);
      font-size: 12px;

      .helpLink{
        text-align: center;
        li{
          display: inline;
        }
        .space{
          width: 1px;
          height: 13px;
        }
      }
      p{
        margin: 10px 0;
        text-align: center;
      }
    }
  }
</style>