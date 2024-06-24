import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Form from "@gh/form";
import Icon from "@gh/icon";
import Bgimg from "@/component/app/smart/roomBg";
import ChairIcon from "@mui/icons-material/Chair";

import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { glass } from "@/component/app/smart/data";

import { useFormik } from "formik";
import { useContext } from "react";
import Context from "@context/app";

import * as yup from "yup";
import useFetch, { fetcher } from "@gh/helper/useFetch";

import DynamicFormRenderer from "@gh/form/renderer";
import RelationForm from "@gh/form/renderer/relationForm";
import { getInfo } from "@/model";
import _ from "lodash";

export default function MainNav({ data, onClose }) {
  const [open, setopen] = useState(false);
  const loc = useRouter();

  const formik = useFormik({
    initialValues: { ...data.get() },
    validationSchema: null,
    onSubmit: async (payload) => {
      let res = await fetcher({
        url: `family/room`,
        method: "post",
        data: {
          id: payload.id,
          name: payload.name,
          access_id: payload.access_id,
        },
      });

      payload.device
        .filter((d) => d.is_dirty)
        .forEach(async (el) => {
          await fetcher({
            url: `family/device`,
            method: "post",
            data: {
              id: el.id,
              access_id: el.access_id,
            },
          });
        });

      handleClose();
    },
  });

  function handleChange(ix, value) {
    let temp = data.get();
    temp.device[ix].access_id = value;
    temp.device[ix].is_dirty = true;
    formik.setValues({ ...temp });
  }

  function handleClose(params) {
    data?.reload();
    setopen(false);
  }

  return (
    <UI.Col>
      <UI.IconButton
        onClick={() => setopen(true)}
        sx={{
          bgcolor: "grey",
          ...glass,
        }}
      >
        <MoreVertIcon
          sx={{
            color: "white",
            fontSize: { xs: 24, md: 48 },
          }}
        />
      </UI.IconButton>
      <UI.Modal
        open={open}
        onClose={() => {
          handleClose();
          console.log("dsad");
        }}
      >
        <UI.Col
          sx={{
            width: "100%",
            maxWidth: 600,
            bgcolor: "smartSecondary.main",
            p: 2,
            borderRadius: 3,
          }}
        >
          <UI.Row alignItems="center" justifyContent="space-between">
            <UI.Text>Room Configuration</UI.Text>
            <UI.IconButton onClick={handleClose}>
              <Icon.Close />
            </UI.IconButton>
          </UI.Row>
          <UI.Row alignItems="flex-end" justifyContent="space-between" spacing={2}>
            <Form.Text fullWidth name="name" value={formik.values.name} onChange={formik.handleChange} />

            <UI.Col minWidth="30%">
              <Form.Access
                label="Access"
                select
                name="access_id"
                value={formik.values.access_id}
                onChange={formik.handleChange}
              />
            </UI.Col>
          </UI.Row>
          <DeviceList data={formik.values.device} onChange={handleChange} />
          <UI.Row justifyContent="flex-end" pt={2}>
            <UI.Button disabled={formik.onSubmit} onClick={formik.handleSubmit}>
              Save
            </UI.Button>
          </UI.Row>
        </UI.Col>
      </UI.Modal>
    </UI.Col>
  );
}

function DeviceList({ data, onChange }) {
  return (
    <UI.Col spacing={1} pt={2}>
      <Form.Label label={"Devices"} />
      {data?.map((d, ix) => (
        <UI.Row alignItems="flex-end" justifyContent="space-between" key={ix}>
          <UI.Text variant="body1" width="75%">
            {d.name}
          </UI.Text>
          <UI.Col minWidth="30%">
            <Form.Access
              label={" "}
              select
              name="access_id"
              value={d.access_id}
              onChange={(e) => onChange(ix, e?.target?.value)}
            />
          </UI.Col>
        </UI.Row>
      ))}
    </UI.Col>
  );
}
