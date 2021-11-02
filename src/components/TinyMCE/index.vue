<template>
  <div>
    <textarea :id="id" v-model="tinymceHtml"></textarea>
  </div>
</template>
<script>
import { addPhoto } from '@/api/modules/common'
export default {
  props: {
    tinymceHtml: {
      type: String,
      default: ''
    },
    height: {
      type: String, // 编辑器的高度，使用组件时自己传，不穿下面设置了默认300
      default: ''
    }
  },
  data() {
    return {
      status: 0,
      id: '',
      setting: { // 配置富文本编辑器高
        height: this.height || 300
      },
      maxSize: 11100000, // 文件大小
      accept: 'image/jpeg, image/png, image/jpg', // 文件格式
      withCredentials: true
    }
  },
  watch: {
    tinymceHtml(val) {
      if (window.tinymce.activeEditor) {
        if (this.status === 0 || window.tinymce.activeEditor.getContent() !== val) {
          if (val == null) {
            val = ''
          }
          window.tinymce.activeEditor.setContent(val)
        }
        this.status = 2
      }
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy: function() {
    window.tinymce.get(this.id).destroy()
  },
  methods: {
    init() {
      const radomId = window.radomId ? window.radomId + 1 : 1
      window.radomId = radomId
      const _this = this
      _this.status = 0
      _this.id = 'editor-' + radomId
      const setting =
        {
          selector: '#' + _this.id,
          upload_image_url: '/upload/cloud', // 配置的上传图片的路由
          language_url: 'https://cdn.jsdelivr.net/gh/wt-sml/wutong_cdn/js/tinymce-lang-zh@5.2.2.js',
          language: 'zh_CN',
          init_instance_callback: function(editor) {
            editor.on('input change undo redo', () => {
              _this.$emit('update:tinymceHtml', editor.getContent())
            })
          },
          // 编辑器的一些简单样式设置
          content_style: `
              *                         { padding:0; margin:0; }
              html, body                { height:100%; }
              img                       { max-width:100%; display:block;height:auto; }
              a                         { text-decoration: none; }
              iframe                    { width: 100%; }
              p                         { line-height:1.6; margin: 0px; }
              table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
              .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
              ul,ol                     { list-style-position:inside; }
            `,
          insert_button_items: 'image link | inserttable',
          paste_retain_style_properties: 'all',
          paste_word_valid_elements: '*[*]', // word需要它
          paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
          paste_convert_word_fake_lists: false, // 插入word文档需要该属性
          paste_webkit_styles: 'all',
          paste_merge_formats: true,
          nonbreaking_force_tab: false,
          paste_auto_cleanup_on_paste: false,
          setup(editor) {
            // 添加自定义按钮，以及绑定事件
            editor.addButton('mybutton', {
              text: '高级编辑',
              icon: false,
              onclick() {
                window.open('http://www.135editor.com/')
              }
            })
          },
          // eslint-disable-next-line
          'plugins': [
            'advlist link image',
            'code',
            'insertdatetime media table textcolor contextmenu paste imagetools wordcount'
          ],
          // eslint-disable-next-line
          'toolbar_items_size': 'small',
          // eslint-disable-next-line
          'block_formats': 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;',
          // eslint-disable-next-line
          'toolbar1': 'table | insertfile undo redo | formatselect | uploadimg image media | link unlink | fontsizeselect | forecolor backcolor', // 工具栏1
          // eslint-disable-next-line
          'toolbar2': ' fontselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | removeformat | mybutton ', // 工具栏2, mybutton是自己加的自定义按钮
          fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',
          font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,
          // 图片上传
          images_upload_handler: function(blobInfo, success, failure) {
            if (blobInfo.blob().size > _this.maxSize) {
              failure('图片大小不能超过10M') // 这个大小在上面maxSize可设置
            }

            if (_this.accept.indexOf(blobInfo.blob().type) >= 0) {
              console.log(blobInfo.blob())
              const formData = new FormData()
              formData.append('file', blobInfo.blob(), blobInfo.filename())

              addPhoto(formData).then(res => {
                if (res.code === 0) {
                  success(res.data.imgUrl)
                }
              })
              // xhr.onload = function() {
              //   if (xhr.status !== 200) {
              //     failure('HTTP Error: ' + xhr.status)
              //     return
              //   }
              //   let json = JSON.parse(xhr.responseText)
              //   if (!json || typeof json.data.url !== 'string') {
              //     failure('Invalid JSON: ' + xhr.responseText)
              //     return
              //   }
              //   success(json.data.url)
              // }
              // let formData = new FormData()
              // formData.append('file', blobInfo.blob(), blobInfo.filename())
              // console.log(formData)
              // xhr.send(formData)
            }
          }
        }
      Object.assign(setting, _this.setting)
      this.$nextTick(() => {
        window.tinymce.init(setting)
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .tinymce {
    padding: 0;
  }
</style>
