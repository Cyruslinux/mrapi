<template>
    <div style="padding-bottom:20px">
      <el-row :gutter="20">
        <el-col :span="12">
            <el-card shadow="hover" class="mgb20" style="height:290px;">
                <div class="crumbs">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>
                            <i class="el-icon-lx-cascades"></i> config
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <el-form label-width="120px" style="height:200px;" >
                    <el-form-item  label="managementUrl">
                        <el-input v-model="managementUrl" ></el-input>
                    </el-form-item>
                 </el-form>
                <el-button type="primary" :loading="initLoading"  @click="serverInit">tenant init</el-button>
            </el-card>
        </el-col>
        <el-col :span="12">
             <el-card shadow="hover" class="mgb20" style="height:290px;overflow-y: scroll;">
                    <div class="crumbs">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item>
                                <i class="el-icon-lx-cascades"></i> server info
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                   <el-form label-width="100px" style="height:200px;">
                        <el-form-item  label="host">
                            <el-input v-model="serverData.host" placeholder="0.0.0.0"></el-input>
                        </el-form-item>
                        <el-form-item  label="port">
                            <el-input v-model="serverData.port" placeholder="1358"></el-input>
                        </el-form-item>
                        <el-form-item  label="tenantIdentity">
                             <el-input v-model="serverData.tenantIdentity" placeholder="mrapi-pmt"></el-input>
                        </el-form-item>
                         <el-form-item  label="serverStatus">
                            {{serverData.serverStatus}}
                        </el-form-item>
                    </el-form>
                   
                    <el-button type="primary" :disabled="serverData.serverStatus"  @click="serverStart">server start</el-button>

                    <el-button type="info" :disabled="!serverData.serverStatus"  @click="serverStop">server stop</el-button>
                
            </el-card>
        </el-col>
       
     </el-row>
      <el-row :gutter="20">
          <el-col :span="24">
             <el-card shadow="hover" class="mgb20" style="height:400px;overflow-y: scroll;">
                 
                 <tenant ref="tenantRef"></tenant>
            </el-card>
         </el-col>
     </el-row>
     <el-row :gutter="20">
          <el-col :span="12">
             <el-card shadow="hover" class="mgb20" style="height:400px;overflow-y: scroll;">
                 
                 <Schema></Schema>
            </el-card>
         </el-col>
         <el-col :span="12">
             <el-card shadow="hover" class="mgb20" style="height:400px;overflow-y: scroll;">
                
                 <Routers ref="routers" :serverData="serverData"></Routers>
            </el-card>
         </el-col>
     </el-row>
    
    </div>
</template>

<script>
import bus from '../common/bus';
import {serverInfo,serverStart,serverStop} from '../../api/server'
import {configInfo,configInit} from '../../api/config'
import Routers from './Routers'
import Schema from './Schema'
import tenant from './tenant'
export default {
    name: 'dashboard',
    data() {
        return {
            serverData:{
                host:"0.0.0.0",
                port:1358,
                tenantIdentity:"mrapi-pmt"
            },
            serverStatus:false,
            managementUrl:null,
            initLoading:false
        };
    },
    components: {
        Routers,
        Schema,
        tenant
    },
    computed: {

    },
    mounted() {
        this.init()
    },
    methods: {
        init(){
            
          serverInfo().then(res=>{
               this.serverData=res
           })
           configInfo().then(res=>{
               
                this.managementUrl=res.defualt.managementUrl
           })
        },
        serverInit(){
          
            if(this.managementUrl==null||this.managementUrl==''){
               this.$message.error('managementUrl cannot be null');
                return
            }
            this.initLoading=true
            configInit({managementUrl:this.managementUrl}).then(res=>{
                this.initLoading=false
                 this.$message.success('init success');
                 this.$refs.tenantRef.getData()
            }).catch(err=>{
                this.$message.error('init failed');
                this.initLoading=false
            })
        },
     async serverStart(){
         if( await serverStart(this.serverData)=="OK"){
            this.$refs.routers.getData()
             this.init()
             this.$message.success('启动成功');
         }
     },
     async serverStop(){
           if( await serverStop()=="OK"){
               this.init()
             this.$message.success('服务已停止');
         }
     }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
