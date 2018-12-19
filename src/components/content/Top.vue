<template>
  <div class="toplan">
    <Menu mode="horizontal" :theme="theme" active-name="1">
        <!-- <Submenu name="1" style="margin-left:75px" >
            <template slot="title">English</template>
            
            <MenuItem>English</MenuItem>
            <MenuItem>中文</MenuItem>
        </Submenu> -->
         <MenuItem to='/' style="margin-left:75px">
            <img src="@/assets/logo.png"  alt="">
            </MenuItem>
        <div v-if="user" style="margin-left:800px;">
          <Submenu name="2">
              <template v-if="user.name" slot="title" >
               welcome ! {{user.name}}
              </template>
              <!-- <MenuItem name="2-1" to="/home">Home</MenuItem>
              <MenuItem name="2-2" @click.native="logout()">Logout</MenuItem> -->
          </Submenu>
           <MenuItem name="2-2" @click.native="logout()">Logout</MenuItem>
          <!-- <MenuItem name="3" to="/cart">
            <Icon type="ios-cart" size="24" />
          </MenuItem> -->
        </div>
        <div v-else style="margin-left:800px;">
          <MenuItem name="2" to="/lognew">Sign In/Join Free</MenuItem>
        
        </div>

        <div style="float:right;margin-right:40px">
        <MenuItem name="4" to="/cartt">
        <img src="@/assets/cart1.png" alt="" width="30px" height="30px"   object-fit='contain'>
        <span>0</span>
        </MenuItem>
        </div>
        <div style="float:right;">
        <MenuItem name="5" to="/wishbg">
        <img src="@/assets/like.png" alt="" width="30px" height="30px" object-fit='contain'>
        <span>0</span>
        </MenuItem>
        </div>
        <div style="float:right;" >
            <Dropdown class='drop' trigger='hover' >
              <!-- href="javascript:void(0)" -->
        <router-link to="/home" >
            <img src="@/assets/personal.png" alt="" width="30px" height="30px" object-fit='contain' >
            
        </router-link>
        <DropdownMenu slot="list">
            <DropdownItem>purchase history</DropdownItem>
            <DropdownItem>my comment</DropdownItem>
            <DropdownItem>manage order</DropdownItem>
            
        </DropdownMenu>
    </Dropdown>

        </div>
    </Menu>
    <br>
  </div>
</template>
<script>
    export default {
      data () {
        return {
          theme: 'dark',
          personto:'/home'
        }
      },
      methods: {
          logout() {
            this.axios.get('/logout').then((response) => {
                this.$store.dispatch('logout').then(() => {
                  this.$router.replace('/lognew')
                })
            }).catch((err) => {
                this.$store.dispatch('logout').then(() => {
                  this.$router.replace('/lognew')
                })
            })
          },
          change(){
            this.$router.replace('/home');
          }
        },
        computed: {
          user() {
            return this.$store.state.user
          }
        }
    }
</script>

<style scoped>
</style>
