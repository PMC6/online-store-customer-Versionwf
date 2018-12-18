<template>
    <div class='regis' v-if="regvisible">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" label-position='right' >
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <Label><h1>Customer Register</h1></Label>
        <FormItem label="Name" prop="name">
            
            <Input v-model="formValidate.name" placeholder="Enter your name" style="width:300px"></Input>
        </FormItem>
        <FormItem label='Password' prop="password">
            <Input v-model="formValidate.password" placeholder="Enter your Password" style="width:300px"></Input>
        </FormItem>
        <FormItem label='Telephone' prop="telephone">
            <Input v-model="formValidate.telephone" placeholder="Enter your tetephone" style="width:300px"></Input>
        </FormItem>
        <FormItem label="E-mail" prop="mail">
            <Input v-model="formValidate.mail" placeholder="Enter your e-mail" style="width:300px"></Input>
        </FormItem>
         <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
        
        
        
    </Form>
    </div>
</template>
<script>
import axios from 'axios';
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    password: '',
                    telephone:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                     password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 5, message: 'The password length cannot be less than 5 bits', trigger: 'blur' }
                    ],
                    mail: [
                        
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    telephone:[
                       
                        {type:'number',message:'Incorrect telephone format',trigger:'blur',transform(value){
                            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                            if(!myreg.test(value)){
                                return false;
                            }
                            else{
                                return Number(value);
                            }
                        }}
                    ]

                   
                },
                regvisible:true
            }
        },
        // http://176.122.152.6:8080
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$Message.success('Success!');
                        console.log(this.formValidate.name+' '+this.formValidate.password+' '+this.formValidate.mail
                        +' '+this.formValidate.telephone);
                         axios.post('http://39.98.165.19:8080/register',{username:this.formValidate.name,
                         password:this.formValidate.password,telephone:this.formValidate.telephone})
      .then(function(res){
        console.log(res);
        console.log('success reg');
          })
          .catch(function(error){
            console.log(error);
          });
            this.$Message.success('Success!');
            this.regvisible=false;

                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            postsend(){
      axios.post('http://176.122.152.6:8080/register',{username:'12345',password:'hello'})
      .then(function(res){
        console.log(res);
          })
          .catch(function(error){
            console.log(error);
          });
    },
        }
    }
    /**
     * 
     *  { required: false, message: 'Mailbox cannot be empty', trigger: 'blur' },
     */
</script>
<style>

.regis {
    background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg');
background-size: cover;
background-repeat: no-repeat;
width: 100%;
height: 100%;

color: azure;

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
  
  .frm {
      float: left;
     align-items: center;
    
  }
</style>






