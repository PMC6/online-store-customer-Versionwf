<template>
    <div>
                <!-- <div v-if="orderlist.length == 0" class="order-empty">
            <Icon size="100" type="ios-cart-outline" />
            <p>
                Your order list is empty	Start <a href="#/">shopping now</a>!
                And click the wish button to add product or shop in your wish list.
            </p>
        </div> -->
        <div class="cart-record">
            <h3 class="h3">
              <Input required='' @keyup.enter.native="search(pageNum, pageSize)"
              v-model="searchName" search placeholder="Enter order status to search"
              style="width:60%;"/>
          </h3>
            <div class="list-group">
                <a v-for="item in orderlist" :key="item.id" class="list-group-item list-group-item-action flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                      <div style="width:12%;"><img style="height:100px;width:100%;" :src="item.productImg"/></div>
                      <div style="width:84%;">
                          <div class="d-flex w-100 justify-content-between">
                            <h3 class="mb-1">{{item.productName}}</h3>
                            <p class='status'><Tag type="border" color="info">Status: {{item.status}}</Tag></p>
                          </div>
                          
                          <div class="d-flex w-100 justify-content-between">
                              <p class="mb-1"><Tag type="border" color="success">{{item.shopName}}</Tag></p>
                              <p>${{item.price}}  * {{item.number}}</p>
                               <p style="color:#19be6b;">Total： ${{item.totalPrice}}</p>
                          </div>
                           <div class="d-flex w-100 justify-content-between">
                              <p class="mb-1"><Tag type="border" color="warning">{{item.createTime.substring(0,16)}}</Tag></p>
                                <div v-if="item.status!='Complete'">
                              <button type="button"  class="btn btn-warning btn-sm" @click="cancel(item)">cancel order</button>
                                </div>
                                <div v-show="item.status=='Complete'"> 
                              <button type="button"  class="btn btn-warning btn-sm" @click="add(item)">add comment</button>
                                </div>
                          </div>
                      </div>
                  </div>
                </a>
              </div>
          </div>

    <Divider />
     <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
        placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>

      <Modal
        v-model="commentmodal"
        v-if="product"
        title="Common Modal dialog box title"
        ok-text="submit"
        cancel-text="cancel"
        @on-ok="submitcomm"
       
        >
         <Rate v-model="value" />
          <Input v-model="comment" dis type="textarea" placeholder="Enter Your Comments about this product..." rows="4"/>
          <Divider />
          <div class="d-flex w-100 justify-content-between">
                  <div style="width:30%;"><img style="height:80px;width:80%" :src="product.productImg"/></div>
                  <div style="width:60;margin-right:20%">
                      <div class="d-flex w-100 justify-content-between">
                          <h3 class="mb-1">{{product.productName}}</h3>
                      </div>
                      <div class="d-flex w-100 justify-content-between">
                              <p class="mb-1"><Tag type="border" color="success">{{product.shopName}}</Tag></p>
                              <p>${{product.price}}  * {{product.number}}</p>
                               <p style="color:#19be6b;">Total： ${{product.totalPrice}}</p>
                          </div>
                  </div>
          </div>
    </Modal>
       
    </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
/** order status :processing order,preparing for shipment准备装运,shipped装运,complete */
    export default {
        data () {
            return {
                pageTotal:0, pageNum:1,pageSize:8,
                orderlist:[],searchname:'',commentmodal:false,product:null,
                modal1:false,value:0,comment:''
                // product为将要评论的商品
            }
        },
        methods: {
            getorderlist(page,size){
                this.orderlist=[];
                this.amount();
                this.axios.get('/customer/order/list',{
                    params:{
                        'page':page-1,
                        'size':size
                    }
                }).
                then(response=>{
                    this.orderlist=response.data.data;

                }).
                catch(error=>{
                    console.log(error.response)
                })

            },
            amount() {
                this.axios.get('/customer/order/amount/total').then((response) => {
                    this.pageTotal = response.data.data;
                    
                }).catch((err) => {console.error(err.response)})
            },
           handlePage(data) {
                this.pageNum = data
                if (this.searchName)
                    this.search(this.pageNum, this.pageSize)
                else
                    this.list(this.pageNum, this.pageSize)
            },
            handlePageSize(data) {
                this.pageSize = data
                if (this.searchName)
                    this.search(this.pageNum, this.pageSize)
                else
                    this.list(this.pageNum, this.pageSize)
            },
            cancel(data){
                // 取消订单有问题
              
                this.axios.delete('/customer/order/cancel',{
                   
                        data:{"orderId":data.id}
                    
                }).then(response=>{
                    console.log(response)
                     this.$Notice.success({
                    title: 'Successful', desc: 'cancel order successful'
                });
                }).catch(err=>{
                    console.log(err.response)
                })

            },
            search(page, size) {
                this.orderlist=[];
                // this.amountByName()
                if (this.searchName == "") {
                    this.getorderlist(this.pageNum, this.pageSize)
                } else {
                    axios.get('/customer/order/list/status', { params: {
                        'status': this.searchName, 'page': page-1,
                        'size': size}
                    }).then((response) => {
                        this.orderlist = response.data.data
                    }).catch((err) => {
                        console.error(err.response)
                        this.error()
                    })
                }
            },
             error(nodesc) {
              this.$Notice.error({
                title: 'Search failed',
                desc: nodesc ? '' : 'Not found status named ' + this.searchName
              });
            },
           
            add(data){
                /**添加评论 */
                // console.log('add');
                this.product=data;
                this.commentmodal=true;

            },
            submitcomm(){
                /**提交评论 */
                console.log('before comment')
                console.log(this.value +'   '+this.comment)
                this.axios.post('/customer/comment/add',{
                    "orderId":this.product.id,
                    "grade":this.value,
                    "comment":this.comment
                }).then(response=>{
                    console.log('success')
                     this.$Notice.success({
                    title: 'Successful', desc: 'comment successful'});

                }).catch(error=>{
                    concole.log(err.response)
                })
            }
            

        },
        mounted(){
            this.getorderlist(this.pageNum,this.pageSize)
            //this.amount();
        }
    }
</script>
<style scoped>
.order-empty {
    font-size: 18px;
    width: 40%;
    margin: 0 auto;
    margin-top: 100px;
}
.cart-record {
    width: 100%;
}
.list-group {
    text-align: left;
}
.status{
    font-size: 20px;
    /* background-color: rgba(155, 201, 82, 0.863); */
    
}
</style>





