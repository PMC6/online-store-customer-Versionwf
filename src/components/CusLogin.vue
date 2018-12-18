<template>
<div class='login' >
    <div class="container">
	<div class="d-flex justify-content-center h-100" >
		<div class="card">
			<div class="card-header">
				<h3>Sign In</h3>
				
			</div>
			<div class="card-body">
				<form>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-user"></i></span>
						</div>
						<input type="text" class="form-control" v-model="username" placeholder="username">
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input type="password" v-model="password" class="form-control" placeholder="password">
					</div>
					<div class="row align-items-center remember">
						<input type="checkbox">Remember Me
					</div>
					<div class="form-group">
						<input type="submit" @click="show"  value="Login" class="btn float-right login_btn">
					</div>
				</form>
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center links">
					Don't have an account?
					<router-link to='/register'>Sign up</router-link>
				
					<!--
					<a href="#">Sign Up</a>
					-->
				</div>
				<div class="d-flex justify-content-center">
					<a href="#">Forgot your password?</a>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
</template>

<script>

import axios from 'axios';

export default {
    data(){
        return {
            username:'',
            password:'',
            showlog:true
        }
    },
    methods:{
        show(){
			 //this.showlog=false;//登录页面隐藏
			 
			// this.$parent.changelogmsg(this.username);更新top栏logmsg
            console.log(this.username+' '+this.password);
             axios.post('http://39.98.165.19:8080/user/login', {
              'username':this.username,
              'password':this.password
            }).then((response)=> {
                console.log(response);
			   this.showlog=false;
			   this.$parent.changelogmsg(this.username);
               console.log(this.showlog);
			
              
                
              
            }).catch(function(err) {
                //return false;
              console.error(err.response);
			});
			
        }
    }
}
</script>


<style>
.login {
    /* background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg'); */
background-size: cover;
background-repeat: no-repeat;
width: 100%;
height: 500px;
border: 1px solid yellow;
}
.fullscreen_bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: center;
    background-size: cover;
    background-position: 50% 50%;
    background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg');
    background-repeat:repeat;
  }
.container{
height: 100%;
align-content: center;
}

.card{
height: 370px;
margin-top: auto;
margin-bottom: auto;
width: 400px;
background-color: rgba(0,0,0,0.5) !important;
}

.social_icon span{
font-size: 60px;
margin-left: 10px;
color: #FFC312;
}

.social_icon span:hover{
color: white;
cursor: pointer;
}

.card-header h3{
color: white;
}

.social_icon{
position: absolute;
right: 20px;
top: -45px;
}

.input-group-prepend span{
width: 50px;
background-color: #FFC312;
color: black;
border:0 !important;
}

input:focus{
outline: 0 0 0 0  !important;
box-shadow: 0 0 0 0 !important;

}

.remember{
color: white;
}

.remember input
{
width: 20px;
height: 20px;
margin-left: 15px;
margin-right: 5px;
}

.login_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.login_btn:hover{
color: black;
background-color: white;
}

.links{
color: white;
}
</style>
