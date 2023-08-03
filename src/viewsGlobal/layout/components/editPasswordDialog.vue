<!--
  author: 戴伟
  date: 028 2022/06/28 13:44:29
  file: src\views\layout\components\editPasswordDialog.vue
  des:
    do.....
-->

<template>
  <el-dialog
    v-model="isShow"
    title="修改"
    width="420px"
    :before-close="(done) => goTo('cancel', done)"
  >
    <template #default>
      <div style="width: 100%; padding: 24px">
        <el-form
          ref="editPasswordFormRef"
          :model="formData"
          :rules="formRulesCOM"
          class="demo-form-inline"
          label-width="6em"
        >
          <el-row :gutter="20">
            <template v-for="(item, index) in formList" :key="index">
              <template v-if="item.formType == 'input'">
                <el-col :span="item.span">
                  <el-form-item :label="item.name" :prop="item.key">
                    <el-input
                      :disabled="item.disabled"
                      :type="
                        !item.isShowPassword && item.type == 'password'
                          ? ''
                          : item.type
                      "
                      :clearable="item.clearable"
                      v-model.trim="formData[item.key]"
                      :placeholder="item.placeholder"
                    >
                      <template #suffix v-if="item.isEye">
                        <!--                <i style="cursor: pointer;" v-if="showPassword" class="iconfont icon-eyeslash-fill"-->
                        <!--                   @click="showPassword=false"></i>-->
                        <!--                <i style="cursor: pointer; " v-else class="iconfont icon-eye" @click="showPassword=true"></i>-->
                        <el-icon
                          style="margin: 0; cursor: pointer"
                          v-if="item.isShowPassword"
                          @click="item.isShowPassword = false"
                          ><View
                        /></el-icon>
                        <el-icon
                          style="margin: 0; cursor: pointer"
                          v-else
                          @click="item.isShowPassword = true"
                          ><Hide
                        /></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </template>

              <template v-if="item.formType == 'textarea'">
                <el-col :span="item.span">
                  <el-form-item :label="item.name" :prop="item.key">
                    <el-input
                      v-model="formData[item.key]"
                      maxlength="1000"
                      :rows="5"
                      :placeholder="item.placeholder"
                      show-word-limit
                      type="textarea"
                    />
                  </el-form-item>
                </el-col>
              </template>
            </template>
          </el-row>
        </el-form>
      </div>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="goTo('cancel')">取消</el-button>
        <el-button type="primary" :loading="isLoading" @click="goTo('confirm')"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
// import { editPassword as editPasswordAPI } from "@/api/api";
import { ref, reactive, computed, watch } from "vue";
import { useAppStore } from "@/store/modules/app";

const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean],
  },
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(["update:modelValue"]);
const isShow = computed({
  // 重新定义
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});
const defaultCOM = computed(() => {
  return "";
});

// const store = useStore();
const appStore = useAppStore();

const userInfo = computed(() => appStore.userInfo);
const systemCode = computed(() => appStore.systemCode);

const editPasswordFormRef = ref();

const formData = reactive({});

const formList = ref([
  {
    name: "原始密码",
    key: "oldPassword",
    formType: "input",
    placeholder: "请输入原始密码",
    span: 24,
    type: "password",
    isEye: true,
    isShowPassword: true,
    clearable: false,
    rules: [{ required: true, message: "请输入原始密码", trigger: "blur" }],
  },
  {
    name: "新密码",
    key: "password",
    formType: "input",
    placeholder: "请输入新密码",
    span: 24,
    type: "password",
    isEye: true,
    isShowPassword: true,
    rules: [{ required: true, message: "请输入新密码", trigger: "blur" }],
  },
  {
    name: "确认密码",
    key: "againPassword",
    formType: "input",
    placeholder: "请输入新密码",
    span: 24,
    type: "password",
    isEye: true,
    isShowPassword: true,
    rules: [
      { required: true, message: "请再次输入新密码", trigger: "blur" },
      {
        trigger: "blur",
        validator: (rule, value, callback) => {
          // console.log(rule,value,callback);
          if (value != formData["password"]) {
            return callback(new Error("两次密码不一样"));
          }

          return true;
        },
      },
    ],
  },
]);
const formRulesCOM = computed(() => {
  let rules = {};
  formList.value.map((item) => {
    rules[item.key] = item.rules;
  });

  return rules;
});

const isLoading = ref(false);

const editPassword = (data) => {
  console.log(userInfo.value);
  isLoading.value = true;
  let nData = {
    id: userInfo.value.id,
    loginIdentify: userInfo.value.userName,
    loginMode: 1,
    loginToken: formData.oldPassword,
    newPassword: formData.password,
    systemCode: systemCode.value,
  };

  editPasswordAPI(nData)
    .then(
      (res) => {
        console.log(res);
        store.dispatch("mineMessage", { message: "修改成功" });
        close();
      },
      (err) => {}
    )
    .finally((fin) => {
      isLoading.value = false;
    });
};

const goTo = (key, data) => {
  if (key == "isShowPassword") {
    console.log(data);
    // let index = data.index;
    //
    // data.isShowPassword =  false;
  }

  if (key == "confirm") {
    editPasswordFormRef.value.validate((valid) => {
      // console.log(valid);
      if (valid) {
        editPassword();
      }
    });
  }

  if (key == "cancel") {
    close();
  }
};

const close = () => {
  emits("update:modelValue", false);
};

const handleClose = (done) => {
  // ElMessageBox.confirm('Are you sure to close this dialog?')
  //   .then(() => {
  //     done()
  //   })
  //   .catch(() => {
  //     // catch error
  //   })
};

// 接口请求方法放这
const init = () => {
  //getList();
};

// 统一执行初始化方法
init();
</script>

<style scoped lang="less"></style>
