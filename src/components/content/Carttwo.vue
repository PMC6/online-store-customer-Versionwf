<template>
    <div class="container">
	<div class="row" v-if="user">
	
	<table id="cart" class="table table-hover table-condensed">
    				<thead>
						<tr>
							<th style="width:50%">Product</th>
							<th style="width:10%">Price</th>
							<th style="width:8%">Quantity</th>
							<th style="width:22%" class="text-center">Subtotal</th>
							<th style="width:10%"></th>
						</tr>
					</thead>
						<!-- <tbody>
						<tr>
							<td data-th="Product">
								<div class="row">
									<div class="col-sm-2 hidden-xs"><img src="http://placehold.it/100x100" alt="..." width="80px" height="80px" class="img-responsive"/></div>
									<div class="col-sm-10">
										<h4 class="nomargin">Product 1</h4>
										<p>Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet.</p>
									</div>
								</div>
							</td>
							<td data-th="Price">$1.99</td>
							<td data-th="Quantity">
								<input type="number" class="form-control text-center" value="1">
							</td>
							<td data-th="Subtotal" class="text-center">1.99</td>
							<td class="actions" data-th="">
								<button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
								<button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>								
							</td>
						</tr>
					</tbody> -->
					<tbody v-for="item in cartlist">
						<tr>
							<td data-th="Product">
								<div class="row">
									<div class="col-sm-2 hidden-xs"><img :src="item.product.image" alt="..." width="80px" height="80px" class="img-responsive"/></div>
									<div class="col-sm-10">
										<h4 class="nomargin">{{item.product.name}}</h4>
										<p>{{item.product.info}} </p>
									</div>
								</div>
							</td>
							<td data-th="Price">{{item.product.price}}</td>
							<td data-th="Quantity">
								<input type="number" class="form-control text-center"  v-model="item.number">
							</td>
							<td data-th="Subtotal" class="text-center">{{item.product.price*item.number}}</td>
							<td class="actions" data-th="">
								<button class="btn btn-info btn-sm" @click="updatecart(item.id,item.number)"><i class="fa fa-refresh"></i></button>   
							
								<button class="btn btn-danger btn-sm" @click="deletecart(item.id)"><i class="fa fa-trash-o"></i></button>
																
							</td>
						</tr>
						
					</tbody>
					<tfoot>
						<tr class="visible-xs">
							<td class="text-center"><strong>Total {{Total}}</strong></td>
						</tr>
						<tr>
							<td><Button class="btn btn-warning conshop" to='/'><i class="fa fa-angle-left"></i> Continue Shopping</Button></td>
							<td colspan="2" class="hidden-xs"></td>
							<td class="hidden-xs text-center"><strong>Total {{Total}}</strong></td>
							<td><a href="#" class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></a></td>
						</tr>
					</tfoot>
				</table>
				<!-- <p>Total {{Total}}</p> -->

	</div>
	<div v-else>
		<!--用户未登录时，提示  -->
		<div class="col-main">
    			<div class="empty_cart">
			
		<img src="@/assets/cartorange.jpg" alt="" width="160px" height="160px" style="float:left">
		<div id="empty_cart_info">
			Your Shopping Cart is empty		
			<router-link to='/'>	Start shopping now!</router-link>
			<br>
			Please <router-link to='/lognew'> log in</router-link>
			 to view the products you have previously added to your Shopping Cart.
		</div>
  
  
		</div>
		</div>

	</div>
</div>
</template>
<script>
export default {
	data(){
		return {
			fakedata:[{
				num:1,
				price:20
			},
			{
				num:2,
				price:20.8
			}
			],
			cartlist:[]
		}
	},
	mounted(){
		this.list();
	},
	methods:{
		list(){
			this.axios.get('/customer/cart/list').then((response) => {
                     this.cartlist = response.data.data
                    
                }).catch((err) => {
                    console.error(err.response)
                })

		},
		updatecart(proid,num){
			console.log( proid +'------'+num);
			this.axios.put('/customer/cart/update',{
				id:proid,
				number:num
			})
			.then((response)=>{
				this.$Notice.success({
            title: 'Successful', desc: 'update product number in your cart'
			})
			})
			.catch((error)=>{
				this.$Notice.error({
            title: 'Failed', desc: 'update failed '
        })
			});


		},
		deletecart(proid){
			console.log(proid);
		
			this.axios.delete('/customer/cart/delete', {params:{id: proid}})
			.then((response)=>{
				this.$Notice.success({
            title: 'Successful', desc: 'delete from your cart'
			})
			})
			.catch((error)=>{
				this.$Notice.error({
            title: 'Failed', desc: 'delete failed '
        })
			});
			}

		

	},
	computed: {
          user() {
            return this.$store.state.user
		  },
		  Total(){
			  var totalnum=0;//总费用
			  for(var i=0;i<this.cartlist.length;i++)
			  {
				  totalnum+=this.cartlist[i].number*this.cartlist[i].product.price;
			  }
			  return totalnum;

		  }
		}
		
}
</script>
<style scoped>
.col-main{
	height: 236px;
	width: 1000px;
	margin-top: 60px;
	font-size: 18px;
	border: 1px solid rosybrown;
	display: flex;
	justify-content: center;
	align-items: center;
	
}
.empty-cart{
	width: 700px;
	height: 130px;

	

}
.empty-cart-info{
	/* margin: 0; */
	margin-left: 400px;
	margin-top: 200px;
	width: 330px;
	height: 72px;
	font-size: 16px;
	
}
.conshop{
	background-color: rgb(236, 240, 25);
}
.table>tbody>tr>td, .table>tfoot>tr>td{
    vertical-align: middle;
}
@media screen and (max-width: 600px) {
    table#cart tbody td .form-control{
		/* width:20%; */
		display: inline !important;
	}
	.actions .btn{
		width:36%;
		margin:1.5em 0;
	}
	
	.actions .btn-info{
		float:left;
	}
	.actions .btn-danger{
		float:right;
	}
	
	table#cart thead { display: none; }
	table#cart tbody td { display: block; padding: .6rem; min-width:320px;}
	table#cart tbody tr td:first-child { background: #333; color: #fff; }
	table#cart tbody td:before {
		content: attr(data-th); font-weight: bold;
		display: inline-block; width: 8rem;
	}
	
	
	
	table#cart tfoot td{display:block; }
	table#cart tfoot td .btn{display:block;}
	
}
</style>


