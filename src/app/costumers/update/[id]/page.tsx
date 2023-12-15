"use client";
import React, { useEffect } from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";

//Antd SubmitButton
const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const Update: React.FC = ({ params }: any) => {
  const { id } = params;
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    axios.get(`/costumers/api/${id}`).then((data: any) => {
      form.setFieldsValue(data.data.costumer);
    });
  });

  const onFinish = async (data: any) => {
    axios.put(`/costumers/api/${id}`, data).then((data: any) => {
      router.replace("/costumers");
    });
  };

  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true }]}
        className={"text"}
      >
        <Input />
      </Form.Item>
      <Form.Item name="age" label="Age" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true }]}
        className={"text"}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Space>
          <SubmitButton form={form} />
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Update;
