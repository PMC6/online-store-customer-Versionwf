<template>

    <div class="cart">
        <!-- <Table :columns="columns1" :data="data1"></Table> -->
        <div v-if="data1.length == 0" class="cart-empty">
            <Icon size="100" type="ios-cart-outline" />
            <p>
                Your Shopping Cart is empty	Start <a href="#/">shopping now</a>!
                We recommend that you rationally shop according to your preferences.
            </p>
        </div><!-- end empty cart-->
        <div v-else>
            <div class="cart-record">
                <div class="list-group">
                    <a v-for="item in data1" :key="item.id" class="list-group-item list-group-item-action flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">

                          <div style="width:12%;">
                              <input type="checkbox" name="cbox" id="" v-model="item.checked">
                              <img style="height:100px;width:100%;" :src="item.product.image"/>
                            </div>  <!-- image -->
                          <div style="width:86%;">
                              <div class="d-flex w-100 justify-content-between">
                                <h3 class="mb-1">{{item.product.name}}</h3>
                                <p>${{item.product.price}}</p>
                              </div>
                              <p class="mb-1">{{item.product.info}}</p>
                              <p class="mb-1" style="color:red;">{{item.product.number}} left in stock</p>
                              <div class="d-flex w-100 justify-content-between">
                                <Tag type="border" color="success">{{item.product.shop.name}}</Tag>
                                <InputNumber @on-change="update(item)" size="small" :max="item.product.number" :min="1" v-model="item.number"></InputNumber>
                                <p style="color:#19be6b;">Total： ${{item.number * item.product.price}}</p>
                              </div>

                              
                              <p style="text-align:right;"><Button @click="remove(item)" size="small" type="error">delete</Button></p>
                          </div>  <!-- end -->

                      </div>

                    </a>
                    <p class="total-price"><Tag type="dot">Total： ${{total}}</Tag>
                    <Button type="primary" @click="showmodal()">Checkout</Button></p>
                   
                  </div><!--  end listgroup-->
                   
            </div><!-- end cart-record-->
            
        </div><!-- end v-else-->
        
         <Modal
                        v-if="data1"
                        v-model="modalshow"
                        title="Confirm your order"
                        :loading="loading"
                        width="1000"
                        cancel-text="cancel"


                        ok-text="ok"
                       
                      >
            <p>After you click ok, the dialog box will close in 2 seconds.</p>
             <Scroll>
            <div v-for="item in data1" v-if="item.checked" class="list-group-item list-group-item-action flex-column align-items-start">
                        
                
                
                                         <!-- <button @click="addorder(item.product.shop.name,item.product.name,item.product.number)">add order</button> -->
                <div class="d-flex w-100 justify-content-between" >
                    <div style="width:12%;"><img style="height:100px;width:100%;" :src="item.product.image" object-fit="contain" /></div>
                        <div style="width:86%">
                            <div class="d-flex w-100 justify-content-between">
                                <h3 class="mb-1">{{item.product.name}}</h3>
                                <p>${{item.product.price}}</p>
                                 
                            </div>
                            <div class="d-flex w-100 justify-content-between">
                                 <Tag type="border" color="success">{{item.product.shop.name}}</Tag>
                                 <InputNumber readonly size="small" :max="item.product.number" :min="1" v-model="item.number"></InputNumber>
                                 <p style="color:#19be6b;">Total： ${{item.product.price*item.number}}</p>
                            </div>
                            <div class="d-flex w-100 " >
                                <button type="button" class="btn btn-sm btnadd" @click="addorder(item)">add order</button>
                            </div>
                        </div>
                                

                    </div>
                           
                </div>
                </Scroll>
             <p class="total-price "><Tag type="dot">Total： ${{total}}</Tag></p>
                        
                         
            </Modal>
    </div><!-- end cart-->

</template>
<script>
    export default {
        data () {
            return {
                data1: [],
                modalshow:false
            }
        },
        mounted: function() {
            this.list()
        },
        methods: {
            list() {
                this.axios.get('/customer/cart/list').then((response) => {
                    this.data1 = response.data.data
                }).catch((err) => {
                    this.data1 = []
                    console.error(err.response)
                })
            },
            update(data) {
                this.axios.put('/customer/cart/update', {id:data.id, number:data.number})
                .then((response) => {
                    // console.log(response)
                }).catch((err) => {
                    console.error(err)
                })
            },
            remove(data) {
                this.axios.delete('/customer/cart/delete', {params : {id:data.id}})
                .then((response) => {this.list()}).catch((err) => console.error(err.response))
            },
            showmodal(){
                this.modalshow=true;
                // console.log(this.modalshow)
            },
            addorder(item){
               console.log(item);
                this.axios.post('/customer/order/add',{
                    "shopName":item.product.shop.name,
                    "productName":item.product.name,
                    "number":item.number
                }).then(response=>{
                    console.log(response);
                    this.$Notice.success({
                    title: 'Successful', desc: 'commit your order to shop seller'
                });
                    
                }).catch(error=>{
                    console.log(error)
                })
           
            }
        },
        computed: {
            total() {
                var tmp = 0
                for (var i = 0; i < this.data1.length; i++)
                {
                    if(this.data1[i].checked)
                    tmp += this.data1[i].number * this.data1[i].product.price
                }
                  
                return tmp;
            }
        }
    }
</script>
<style scoped>
.cart {
    width: 60%;
    margin: 0 auto;
    text-align: center;
}
.cart-empty {
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
.total-price {
    font-size: 24px;
    color: #19be6b;
    text-align: right;
    margin: 4px;
}
.ns{
    background-color: chocolate;
    
}
.btnadd{
    background-color: rgb(216, 106, 16);
    margin-left: 90%;
}
</style>




