<template>
    <div class="wish">
         <Tabs value="Product" id='tabs' >
        <TabPane label="Favorite Products" name="Product" icon="ios-heart">
            <FavorPro></FavorPro>
            </TabPane>
        <TabPane label="Favorite Shops" name="Shop" icon="ios-heart">
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
