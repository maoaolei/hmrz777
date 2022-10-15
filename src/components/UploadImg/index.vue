<template>
  <div>
    <el-upload
      v-loading="loading"
      class="show"
      action="#"
      list-type="picture-card"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :file-list="fileList"
      :on-change="onChange"
      :http-request="oRequest"
      :limt="1"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 图片预览弹出层 -->
    <el-dialog
      title="图片预览"
      :visible.sync="previewImgDialogVisible"
    >
      <img style="width: 100%" :src="previewImg">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
// console.log(COS)
const cos = new COS({
  SecretId: 'AKIDsh8WoS1QgeWE4nOoMoEeu23yscGnDVms',
  SecretKey: 'ENQ3pZPDtOo7HNTWbbSNEwrwHlEex4CN'
})
export default {
  name: 'UploadImg',
  props: {
    imgurl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: [
        // { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ],
      previewImgDialogVisible: false,
      previewImg: '',
      loading: false
    }
  },
  watch: {
    imgurl() {
      this.fileList.push({ name: 'default', url: this.imgurl })
    }
  },
  methods: {
    onPreview(file) {
      this.previewImgDialogVisible = true
      this.previewImg = file.url
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    oRequest({ file }) {
      // console.log(file)
      this.loading = true
      cos.putObject({
        Bucket: 'hz-kd-1314348546', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // console.log(err || data)
        if (err) return this.$message.error('上传图片失败')
        // console.log(data)
        this.$emit('onSuccess', {
          imgUrl: 'https://' + data.Location
        })
        // this.$message.success('上传图片成功')
        this.loading = false
      })
    },
    beforeUpload(file) {
      const imgType = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      const isHas = imgType.includes(file.type)
      if (!isHas) {
        this.$message.error('图片格式只支持' + imgType.join('、') + '类型')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过1M')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.show {
  width: 148px;
  height: 148px;
  overflow: hidden;
}

</style>
