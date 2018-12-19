<template>
    <div class="wish">
         <Tabs value="Product" id='tabs'>
        <TabPane label="Favorite Products" name="Product" icon="ios-heart">标签一的内容
            <FavorPro></FavorPro>
            </TabPane>
        <TabPane label="Favorite Shops" name="Shop" icon="ios-heart">标签二的内容
            <FavorShop></FavorShop>
        </TabPane>
      
    </Tabs>
</div>
</template>
<script>
import FavorProduct from './tab/FavorProduct'
import FavorShop from './tab/FavorShop'
/*---------------------------*\
我的关注
\*---------------------------*/
export default {
    data(){
        return {

        }
    },
    mounted(){
        

        
    },
    components:{
        'FavorPro':FavorProduct,
        'FavorShop':FavorShop
    }
    
    
}
</script>
<style scoped>
.wish{
    margin-top: 40px;
}
#tabs {
    margin-left: 4%;
    margin-right: 4%;
}
</style>
