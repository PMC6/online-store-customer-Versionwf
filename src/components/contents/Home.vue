<template>
    <Tabs id="tabs" value="name1">
        <TabPane label="My Detail" icon="md-person" name="name1">
            <Info></Info>
        </TabPane>
        <TabPane label="Favorite Shop List" icon="md-heart" name="name2">
            <WishShop></WishShop>
        </TabPane>
        <TabPane label="Favorite Product List" icon="md-heart" name="name3">
            <WishProduct></WishProduct>
        </TabPane>
        <TabPane label="Change Password" icon="md-build" name="name4">
            <ChangePasswd></ChangePasswd>
        </TabPane>
         <TabPane label="Shopping History" icon="md-list" name="name5">
            <ShopHistory></ShopHistory>
        </TabPane>
        <TabPane label="My Order" icon="md-list" name="name6">
            <Order></Order>
        </TabPane>
    </Tabs>
</template>
<script>
import Info from './tab/Info'
import WishShop from './tab/WishShop'
import WishProduct from './tab/WishProduct'
import ChangePasswd from './tab/ChangePasswd'
import ShopHistory from './tab/ShoppingHistory'
import order from './tab/MyOrder'
export default {
    data() {
        return {

        }
    },
    components: {
        'Info': Info,
        'WishShop': WishShop,
        'WishProduct': WishProduct,
        'ChangePasswd': ChangePasswd,
        'ShopHistory':ShopHistory,
        'Order':order
    }
}
</script>
<style scoped>
#tabs {
    margin-left: 10%;
    margin-right: 10%;
}
</style>
