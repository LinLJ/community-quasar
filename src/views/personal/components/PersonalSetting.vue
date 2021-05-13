<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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
        <div class="col-2">你的姓名</div>
        <div class="col-10">
          <q-input v-model="text" label="Standard" />
        </div>
      </div>
      <div class="row">
        <div class="col-2">手机号</div>
        <div class="col-10">
          <q-input v-model="form.phoneNum" label="Standard" />
        </div>
      </div>
      <div class="row">
        <div class="col-2">身份证号</div>
        <div class="col-10">
          <q-input v-model="form.idNumber" label="Standard" />
        </div>
      </div>
      <div class="row">
        <div class="col-2">出生日期</div>
        <div class="col-10">
          <!-- <q-input filled v-model="form.birthday" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input> -->
        </div>
      </div>
      <div class="row">
        <div class="col-2">居住地</div>
        <div class="col-10">
          <q-input v-model="form.address" label="Standard" />
        </div>
      </div>
      <div class="row">
        <div class="col-2">博客地址</div>
        <div class="col-10">
          <q-input v-model="form.blog" label="Standard" />
        </div>
      </div>
      <div class="row">
        <div class="col-2">更换头像</div>
        <div class="col-10"></div>
      </div>
    </div>

    <div>
      <q-btn label="Submit" type="submit" color="primary" @click="save" />
    </div>
  </q-form>
</template>

<script>
import img_avatar from '@/assets/avatar.png'
// import { VueCropper } from 'vue-cropper'
// import { validateMobile, validateID } from '@/utils/validate'
import { getSettingInfo, userSetting } from '@/api/personal'

export default {
  name: 'PersonalSetting',
  components: {
    // VueCropper
  },
  data() {

    return {
      sex: '0',
      img_avatar,
      addLoading: false,
      dialogVisible: false,
      previews: {},
      image_url: undefined,
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
  },
  methods: {
    getSettingInfo() {
      getSettingInfo()
        .then((response) => {
          this.form = response.data
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
    save() {
      console.info('------------------------', this.form)
      userSetting(this.form)
        .then(() => {
          this.$q.notify({
            message: '修改个人设置成功'
          })

          this.addLoading = false
        })
        .catch(() => {
          this.addLoading = false
          this.$q.notify({
            message: '修改个人设置失败'
          })
        })
    },
  },
}
</script>
