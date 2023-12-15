"use client";

import axios from "axios";
import { Button, Space, Switch, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}


const Costumers = () => {
  const [list, setList] = useState([]);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const fetchList = () => {
    axios.get("/costumers/api").then((data: any) => {
      setList(data.data);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);
  

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/costumers");
    } else {
      router.replace("/login");
      
    }
  }, [sessionStatus, router]);

  const update = (record: any) => {
    router.push(`costumers/update/${record?._id}`);
  };
  const deleteCostumer = (record: any) => {
    axios.delete(`/costumers/api/${record?._id}`).then(() => {
      fetchList();
    });
  };
  const changeStatus = (status: any, record: any) => {
    axios.post(`/costumers/api/${record?._id}`, { status }).then(() => {
      fetchList();
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (_, record:any) => (
        <Space size="middle">
          <Switch defaultChecked={record?.status} onChange={(data) => changeStatus(data, record)} />
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => update(record)}>Update</a>
          <a onClick={() => deleteCostumer(record)}>Delete</a>
        </Space>
      ),
    },
  ];


  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" className="text-black">
          <Link href="costumers/create">Create Costumer</Link>
        </Button>
      </div>
      <Table columns={columns} dataSource={list} />
    </>
  );
};

export default Costumers;
