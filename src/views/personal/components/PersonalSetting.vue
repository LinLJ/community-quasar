<template>
  <div>
    <q-form ref="form" @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="column">
        <div class="row">

          <div class="col-2">真实姓名</div>
          <div class="col-4">{{ form.userName }}</div>
          <div class="col-2">邮箱地址</div>
          <div class="col-4">{{ form.email }}</div>
        </div>
        <div class="row">
          <div class="col-2">部门</div>
          <div class="col-4">{{ form.remark }}</div>
          <div class="col-2">性别</div>
          <div class="col-4">
            <q-radio v-model="form.gender" val="1" label="男" />
            <q-radio v-model="form.gender" val="0" label="女" />
          </div>
        </div>

        <div class="row">
        </div>
        <div class="row q-py-sm">
          <div class="col-2 pt-12" pt-12>手机号</div>
          <div class="col-10">
            <q-input filled    v-model="form.phoneNum" />
          </div>
        </div>
        <div class="row q-py-sm">
          <div class="col-2 pt-12">身份证号</div>
          <div class="col-10">
            <q-input filled   v-model="form.idNumber" />
          </div>
        </div>
        <div class="row q-py-sm">
          <div class="col-2 pt-12">出生日期</div>
          <div class="col-10">
            <q-input filled v-model="birthday" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="birthday">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="row q-py-sm">
          <div class="col-2 pt-12">居住地</div>
          <div class="col-10">
            <q-input filled v-model="form.address"  />
          </div>
        </div>
        <div class="row q-py-sm">
          <div class="col-2 pt-12">博客地址</div>
          <div class="col-10">
            <q-input filled v-model="form.blog"  />
          </div>
        </div>
        <div class="row q-py-sm">
          <div class="col-2 pt-12">更换头像</div>
          <div class="avatar" @click="handleAvatarClick">
            <img :src="form.avatar ? form.avatar : img_avatar" alt="" />
          </div>
        </div>
      </div>
      <div>
        <q-btn label="保存" type="submit" color="primary" @click="save" />
      </div>
    </q-form>
    <q-dialog v-model="dialogVisible">
      <q-card style="width: 900px; height: 650px; max-width: 80vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-subtitle1 row">更换头像</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
          <q-separator />
          <div class="avatar-setting">
            <div class="img-cropper">
              <vue-cropper
                :img="image_url"
                :fixed="true"
                class="q-my-md"
                output-type="png"
                auto-crop
                :auto-crop-width="200"
                :auto-crop-height="200"
                fixed-box
                center-box
                @real-time="realTime"
                mode="cover"
                ref="cropper"
              />
            </div>
            <q-card>
              <q-card-section>
                <div class="text-body2">图片预览</div>
                <div class="preview">
                  <div class="show-preview">
                    <div :style="previews.div">
                      <img :src="previews.url" :style="previews.img" />
                    </div>
                  </div>

                  <div class="show-preview circle">
                    <div :style="previews.div">
                      <img :src="previews.url" :style="previews.img" />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row q-mt-md">
            <label class="choose-img">
              <input
                type="file"
                class="hidden"
                accept="image/png, image/jpeg, image/gif, image/jpg"
                @change="chooseImage($event)"
              />
              选择图片
            </label>
            <q-btn color="primary" :size="$btnSize" @click="rotateLeft">
              <q-icon
                :size="$btnIconSize"
                class="q-mr-sm"
                name="o_replay"
              ></q-icon>
              左转
            </q-btn>
            <q-btn
              color="primary"
              :size="$btnSize"
              class="q-ml-sm"
              @click="rotateRight"
            >
              <q-icon
                :size="$btnIconSize"
                class="q-mr-sm"
                name="o_refresh"
              ></q-icon>
              右转
            </q-btn>
            <q-btn
              color="primary"
              :size="$btnSize"
              class="q-ml-sm"
              @click="changeScale(1)"
            >
              <q-icon
                :size="$btnIconSize"
                class="q-mr-sm"
                name="o_zoom_in"
              ></q-icon>
              放大
            </q-btn>
            <q-btn
              color="primary"
              :size="$btnSize"
              class="q-ml-sm"
              @click="changeScale(-1)"
            >
              <q-icon
                :size="$btnIconSize"
                class="q-mr-sm"
                name="o_zoom_out"
              ></q-icon>
              缩小
            </q-btn>
            <q-space></q-space>
            <q-btn
              color="primary"
              :size="$btnSize"
              @click="complete"
              label="确定"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import img_avatar from '@/assets/avatar.png'
// import { VueCropper } from 'vue-cropper'
// import { validateMobile, validateID } from '@/utils/validate'
import { VueCropper } from 'vue-cropper'
// import { validateMobile, validateID } from '@/utils/validate'
import { getSettingInfo, userSetting, userAvatar } from '@/api/personal'
import { getPersonalInfo } from '@/api/personal'

export default {
  name: 'PersonalSetting',

  components: {
    VueCropper,
  },
  data() {
    return {
      userId: '',
      sex: '0',
      img_avatar,
      addLoading: false,
      dialogVisible: false,
      previews: {},
      image_url: undefined,
      birthday: '1999/01/01',
      form: {
        userName: undefined,
        email: undefined,
        phoneNum: undefined,
        gender: undefined,
        idNumber: undefined,
        birthday: undefined,
        address: undefined,
        remark: undefined,
        blog: undefined,
        avatar: undefined,
      },
    }
  },
  computed: {
    isDesktop() {
      return this.$store.getters.device === 'desktop'
    },
    isMinMobile() {
      return this.$store.getters.device === 'min-mobile'
    },
  },
  created() {
    this.getSettingInfo()
    this.getPersonalInfo()
    console.info(this.userId, 'this.userId')
  },
  methods: {
    getPersonalInfo() {
      getPersonalInfo()
        .then((response) => {
          this.userId = response.data.userId
        })
        .catch(() => {})
    },
    getSettingInfo() {
      getSettingInfo()
        .then((response) => {
          this.form = response.data
          if(this.form.birthday){
            this.birthday=this.form.birthday
          }
          this.$nextTick(() => {
            this.$refs.form.clearValidate()
          })
        })
        .catch(() => {
          this.$_message({
            message: '获取个人设置失败',
            type: 'error',
          })
        })
    },
    // 选择本地图片
    chooseImage(event) {
      let reader = new FileReader()
      let file = event.target.files[0]

      if (
        event.target.value &&
        !/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(event.target.value)
      ) {
        this.$q.notify({
          message: '图片类型必须是.gif,jpeg,jpg,png,bmp中的一种',
          type: 'negative',
        })
        return false
      }

      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.image_url = data
      }
      if (file) {
        reader.readAsDataURL(file) // 将图片转为base64格式
      }
    },
    // 图片向左旋转90度
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    // 图片向右旋转90度
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    // 图片放大缩小
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 剪裁结果实时预览
    realTime(data) {
      this.previews = data
    },
    // 剪裁完成，上传头像
    complete() {
      this.$refs.cropper.getCropData((data) => {
        userAvatar({ avatarBaseCode: data })
          .then(() => {
            this.dialogVisible = false
            this.$q.notify({
              message: '头像上传成功',
              type: 'positive',
            })
            this.$router.push('/personal?tab=setting')
            //window.location.reload()
          })
          .catch(() => {
            this.$q.notify({
              message: '头像上传失败',
              type: 'negative',
            })
          })
      })
    },
    save() {
      this.form.avatar = this.userId + '.jpg'
      this.form.birthday=this.birthday
      console.info(this.form.avatar, 'this.form.avatar')
      console.info(this.form.avatar, 'this.form.avatar')
      userSetting(this.form)
        .then(() => {
          this.$q.notify({
            message: '修改个人设置成功',
          })

          this.addLoading = false
        })
        .catch(() => {
          this.addLoading = false
          this.$q.notify({
            message: '修改个人设置失败',
          })
        })
    },
    handleAvatarClick() {
      console.info('444446666')
      this.dialogVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../styles/quasar';
.avatar {
  width: 180px;
  &:hover {
    cursor: pointer;
  }
  img {
    width: 50px;
    height: 50px;
  }
}
.choose-img {
  padding: 9px 15px;
  font-size: $fontSizeSm;
  border-radius: 3px;
  display: inline-block;
  line-height: 1;
  border: 1px solid $brandColor;
  color: #fff;
  transition: 0.1s;
  background-color: $brandColor;
  cursor: pointer;
  margin: 0 10px 0 0;
  .hidden {
    display: none;
  }
}
.img-cropper {
  width: 500px;
  height: 500px;
  margin-right: 30px;
}
.avatar-setting {
  display: flex;
  align-items: center;
  .preview {
    .show-preview {
      border: 1px solid $borderColor;
      width: 200px;
      height: 200px;
      overflow: hidden;
      margin: 0 40px;
      &.circle {
        border-radius: 50%;
      }
    }
  }
}
</style>
