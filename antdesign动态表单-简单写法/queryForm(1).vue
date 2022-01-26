<template>
  <a-form-model
    ref="queryValidateForm"
    :model="queryValidateForm"
    v-bind="label"
    layout="inline"
  >
    <a-form-model-item
      v-for="(domain, index) in queryValidateForm.domains" :key="domain.key" v-bind="formItemLayout" :label="domain.label" :prop="'domains.' + index + '.value'" :rules="domain.rules">
      <a-input v-if="domain.type === 'input'" v-model="domain.value" :placeholder="domain.placeholder" />
      <a-select v-if="domain.type === 'select'" v-model="domain.value" style="min-width:150px" :placeholder="domain.placeholder">
        <a-select-option value="">
          ---请选择---
        </a-select-option>
        <a-select-option v-for="(option,idx) in domain.options" :key="idx" :value="option.dictDataCode">
          {{ option.dictDataName }}
        </a-select-option>
      </a-select>
      <a-select v-if="domain.type === 'selectNew'" v-model="domain.value" show-search option-filter-prop="children" :placeholder="domain.placeholder" :disabled="domain.disabled" style="width:200px">
        <a-select-option value="">
          ---请选择---
        </a-select-option>
        <a-select-option v-for="k in Object.keys(domain.options)" :key="k" :value="k">
          {{ domain.options[k] }}
        </a-select-option>
      </a-select>
      <a-select v-if="domain.type === 'selectOne'" v-model="domain.value" show-search option-filter-prop="children" :placeholder="domain.placeholder" :disabled="domain.disabled" style="width:200px">
        <a-select-option v-for="k in Object.keys(domain.options)" :key="k" :value="k">
          {{ domain.options[k] }}
        </a-select-option>
      </a-select>
      <a-date-picker v-if="domain.type === 'date'" v-model="domain.value" />
      <a-range-picker v-if="domain.type === 'rangeDate'" v-model="domain.value" valueFormat="YYYY-MM-DD" />
      <a-range-picker v-if="domain.type === 'rangeDateWidthShowTime'" show-time v-model="domain.value" valueFormat="YYYY-MM-DD hh:mm:ss" />
    </a-form-model-item>
    <a-form-model-item>
        <slot></slot>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  props: {
    queryValidateForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      label: {
        wrapperCol: {
          xs: { span: 18, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      }
    };
  },
  methods: {
    submitForm() {
      let validFlag = false;
      this.$refs['queryValidateForm'].validate(valid => {
        if (valid) {
          validFlag = true;
          return true;
        } else {
          return false;
        }
      });
      return validFlag;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
