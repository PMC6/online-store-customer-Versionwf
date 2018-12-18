<template>
<div class="homepane">
    <Tabs id="tabs" value="name1">
        <TabPane label="My Detail" name="name1">
            <Info></Info>
        </TabPane>
        <TabPane label="Open Shop" name="name2">
        </TabPane>
        <TabPane label="Change Password" name="name3">
            <ChangePasswd></ChangePasswd>
        </TabPane>
         <TabPane label="Shopping History" name="name4">
             Shopping History
        </TabPane>
         <TabPane label="My Comments" name="name5">
             My Comments
        </TabPane>        
    </Tabs>
  
</div>
</template>
<script>
import Info from './content/tab/Info'
import ChangePasswd from './content/tab/ChangePasswd'

export default {
    data() {
        return {

        }
    },
    components: {
        'Info': Info,
        'ChangePasswd': ChangePasswd
    }
}
</script>
<style>
.homepane{
    margin-top: 40px;
}
#tabs {
    margin-left: 4%;
    margin-right: 4%;
}
</style>
