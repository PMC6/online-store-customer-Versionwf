<template>
    <div style="width:80%;margin: 0 auto;">
        <p class="login-title">Create an Account <a href="#/lognew">(back to login)</a></p>
        <Divider />
        <div class='container'>
            <Form inline ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="width:60%;margin: 20px auto;">
                <img style="width:120px;height:120px;"
                 src="http://www.twwd.org/dashboard/wp-content/uploads/2014/08/avatar-circle-human-male-2-512.png"></img>
                 <br>
                 <br>
                <FormItem label="Name" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="E-mail" prop="mail">
                    <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
                <FormItem label="Telephone" prop="tel">
                    <Input v-model="formValidate.tel" placeholder="Enter your telephone"></Input>
                </FormItem>
                <!-- <FormItem label="Age" prop="age">
                    <Input type="text" v-model="formValidate.age" number></Input>
                </FormItem>
                <FormItem label="Gender" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="male">Male</Radio>
                        <Radio label="female">Female</Radio>
                    </RadioGroup>
                </FormItem> -->
                <FormItem label="Address" prop="addr">
                    <Input v-model="formValidate.address" placeholder="Enter your address"></Input>
                </FormItem>
                <FormItem label="Password" prop="passwd">
                    <Input type="password" v-model="formValidate.passwd"></Input>
                </FormItem>
                <FormItem label="Confirm" prop="passwdCheck">
                    <Input type="password" v-model="formValidate.passwdCheck"></Input>
                </FormItem>
                <br>
                <FormItem>
                    <Button type="primary" @click="handleSubmit(formValidate)">Submit</Button>
                    <Button @click="handleReset(formValidate)" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
          const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password'));
                } else {
                    if (this.formValidate.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formValidate.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password again'));
                } else if (value !== this.formValidate.passwd) {
                    callback(new Error('The two input passwords do not match!'));
                } else {
                    callback();
                }
            };
            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('Age cannot be empty'));
                }
                // 模拟异步验证效果
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('Please enter a numeric value'));
                    } else {
                        if (value < 18) {
                            callback(new Error('Must be over 18 years of age'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            return {
                err: '',
                formValidate: {
                    name: null,
                    mail: null,
                    tel: null,
                    age: null,
                    gender: null,
                    address: null,
                    passwd: null,
                    passwdCheck: null
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Telephone cannot be empty', trigger: 'blur' },
                        { type: 'string', message: 'Incorrect telephone format', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: 'Please enter a personal address', trigger: 'blur' }
                    ],
                    passwd: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { required: true, validator: validatePassCheck, trigger: 'blur' }
                    ],
                    age: [
                        { validator: validateAge, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (user) {
              this.axios.post('/register', {
                'username': user.name,
                'password': user.passwd,
                'telephone': user.tel,
                'email': user.mail,
                'address': user.address
              }).then((response) => {
                this.$router.replace('/lognew')
                this.success()
              }).catch((err) => {
                this.err = err.response.data.message
                this.error()
              })
            },
            handleReset (user) {
                this.formValidate.name = null
                this.formValidate.mail = null
                this.formValidate.tel = null
                this.formValidate.age = null
                this.formValidate.gender = null
                this.formValidate.address = null
                this.formValidate.passwd = null
                this.formValidate.passwdCheck = null
            },
            success (nodesc) {
              this.$Notice.open({
                title: 'Register Success',
                desc: nodesc ? '' : 'Please login with your username and password'
              });
            },
            error (nodesc) {
              this.$Notice.error({
                title: 'register failed',
                desc: nodesc ? '' : this.err
              });
            }
        }
    }
</script>

<style scoped>
.login-title {
    float: left;
    font-size: 22px;
    margin-top: 20px;
    margin-bottom: 15px;
}
.container{
    width: 100%;
    border: 1px solid;
    display: flex;
    margin-bottom: 10px;
}
</style>