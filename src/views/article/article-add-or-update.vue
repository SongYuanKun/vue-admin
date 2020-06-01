<template>
    <div>
        <el-form :model="article" label-width="80px" :rules="rules" ref="articleForm">
            <el-form-item label="博文标题" prop="title">
                <el-col :span="12">
                    <el-input placeholder="博文标题" v-model="article.title" clearable="clearable"></el-input>
                </el-col>
            </el-form-item>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="博文分类">
                        <el-cascader
                                style="width: 100%;"
                                clearable
                                change-on-select
                                :options="categoryOptions"
                                v-model="categoryOptionsSelect"
                                :props="categoryListTreeProps">
                        </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="博文标签">
                        <el-select
                                style="width: 100%"
                                v-model="tagListSelect"
                                multiple
                                allow-create
                                filterable
                                default-first-option
                                placeholder="请选择文章标签" @change="filterTagList" value="">
                            <el-option
                                    v-for="item in tagList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="博文作者">
                <el-row>
                    <el-col :span="4">
                        <el-input placeholder="博文作者" v-model="article.author" clearable="clearable"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="是否推荐">
                <el-radio-group v-model="article.recommend">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="展示类型">
                <el-radio-group v-model="article.coverType">
                    <el-radio v-for="type in coverTypeList" :key="type.parKey" :label="type.parKey">{{type.parValue}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="上传封面">
                <el-col :span="12">
                    <el-upload
                            drag
                            :action="url"
                            list-type="picture"
                            :multiple="false"
                            :before-upload="beforeUploadHandle"
                            :file-list="file"
                            :headers="headers"
                            :on-remove="handleRemove"
                            :on-success="successHandle">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只支持jpg、png、gif格式的图片！</div>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item label="博文描述">
                <el-col :span="12">
                    <el-input type="textarea" v-model="article.description" placeholder="博文描述"
                              clearable="clearable"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="博文内容">
                <mavon-editor ref=md v-model="article.content" @imgAdd="imgAdd"
                              @change="mavonChangeHandle"></mavon-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveArticle()">保存</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import MavonEditor from 'mavon-editor'
    import MarkdownItEmoji from 'markdown-it-emoji'
    import 'mavon-editor/dist/css/index.css'
    import {fileUpload, getBase,} from "../../api/api";
    import {getArticleInfo, saveOrUpdateArticle} from "../../api/articleApi";
    import marked from 'marked'
    import {selectCategory} from "../../api/categoryApi";
    import {treeDataTranslate} from "../../util/myUtil";
    import {selectTag} from "../../api/tagApi";

    var md = require('markdown-it')();
    var emoji = require('markdown-it-emoji');

    md.use(emoji);

    export default {
        components: {
            'mavon-editor': MavonEditor.mavonEditor,
            MarkdownItEmoji
        },
        data() {
            return {
                article: {
                    author: "",
                    recommend: false,
                    tagList: [],
                    type: 0,
                    coverType: 2 // 默认无图片
                },
                headers: {
                    'Authorization': sessionStorage.getItem('token')
                },
                coverTypeList: [
                    {
                        parKey: 0,
                        parValue: "小图片"
                    },
                    {
                        parKey: 1,
                        parValue: "大图片"
                    }, {
                        parKey: 2,
                        parValue: "无图片"
                    }
                ],
                url: getBase() + '/upload/file',
                file: [],
                rules: {
                    title: {required: true, message: '请输入博文标题', trigger: 'change'}
                },
                tagList: [],
                tagListSelect: [],
                tagListNew: [],
                categoryOptions: [],
                categoryOptionsSelect: [],
                categoryListTreeProps: {
                    label: 'name',
                    children: 'children',
                    value: 'id'
                }
            }
        },
        created() {

            this.init()
        },
        methods: {
            init() {
                selectCategory(0).then(({data}) => {
                    if (data && data.code === 0) {
                        this.categoryOptions = treeDataTranslate(data.data);
                    }
                });
                selectTag(0).then(({data}) => {
                    if (data && data.code === 0) {
                        this.tagList = data.data;
                    }
                });
                let id = this.$route.params.id;
                if (id) {
                    getArticleInfo(id).then(({data}) => {
                        this.article = data.data;
                        this.file = [{url: data.data.cover}];
                        // 转换tagList
                        this.tagListSelect = this.tagList.map(tag => {
                            return tag.id;
                        });
                        // 转换categoryId
                        this.categoryOptionsSelect = this.article.categoryId.split(',').map((data) => {
                            return +data
                        })
                    })
                }
            },

            // 过滤标签
            filterTagList(selectValueList) {
                let tagList = [];
                selectValueList.forEach(value => {
                    let isInput = true;
                    for (let i = 0; i < this.tagList.length; i++) {
                        let tag = this.tagList[i];
                        if (tag.id === value || value.id) {
                            isInput = false;
                            tagList.push({id: tag.id, name: tag.name, type: 0})
                        }
                    }
                    if (isInput) {
                        tagList.push({name: value, type: 0})
                    }
                });
                this.article.tagList = tagList
            },
            // 上传之前
            beforeUploadHandle(file) {
                if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                    this.$message.error('只支持jpg、png、gif格式的图片！');
                    return false
                }
            },
            // 上传成功
            successHandle(response) {
                console.info(response);
                if (response && response.code === 0) {
                    this.article.cover = response.data.url;
                    this.file = [response.data];
                    this.$message.success('上传成功！')
                }
            },
            // 移除上传文件
            handleRemove() {
                this.file = [];
                this.article.cover = ''
            },
            saveArticle() {
                this.$refs['articleForm'].validate((valid) => {
                    if (valid) {
                        this.article.categoryId = this.categoryOptionsSelect.join(',');
                        saveOrUpdateArticle(this.article).then(() => {
                            alert("保存成功");
                            this.$emit('closeCurrentTabs');
                            // 跳转到list
                            this.$router.push('/article')
                        })
                    } else {
                        return false
                    }
                })
            },
            // 文章内容图片上传
            imgAdd(pos, $file) {
                // 第一步.将图片上传到服务器.
                let formData = new FormData();
                formData.append('file', $file);
                fileUpload(formData).then(({data}) => {
                    this.$refs.md.$img2Url(pos, data.data.url);
                })
            },
            mavonChangeHandle(context) {
                this.article.contentFormat = marked(context)
            }
        }
    }
</script>
