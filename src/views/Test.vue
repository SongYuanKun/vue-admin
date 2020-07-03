<template>
    <section>
        <input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt" class="add-file-right-input"
               style="margin-left:70px;" accept=".docx,.doc,.pdf">
        <el-button type="primary" @click="submitAddFile" size="small">开始上传</el-button>
    </section>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "test",

        data() {
            return {
                addArr: []
            }
        },

        methods: {
            getFile(event) {
                var file = event.target.files;
                for (var i = 0; i < file.length; i++) {
                    //    上传类型判断
                    var imgName = file[i].name;
                    var idx = imgName.lastIndexOf(".");
                    if (idx != -1) {
                        var ext = imgName.substr(idx + 1).toUpperCase();
                        ext = ext.toLowerCase();
                        this.addArr.push(file[i]);
                    } else {

                    }
                }
            },
            submitAddFile() {
                if (0 == this.addArr.length) {
                    this.$message({
                        type: 'info',
                        message: '请选择要上传的文件'
                    });
                    return;
                }

                var formData = new FormData();
                formData.append('file', this.addArr[0]);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };
                axios.post("http://manage.qa.huohua.cn/material/api/upload", formData, config)
                    .then((response) => {
                        console.info(response)
                    })
            }
        }

    }

</script>

<style scoped>

</style>