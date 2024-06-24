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
import Device from "@/component/app/smart/device";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import _ from "lodash";

export default function MainNav({ data, roomState, refetch, allList = false }) {
  const [onloading, setonloading] = useState();
  const [onDetail, setonDetail] = useState();
  const data_ha = useFetch({
    url: "family/device/sync",
  });

  async function handleRoomActionToggle() {
    data
      ?.filter((d) => d.link_to_room)
      .map((d) => deviceToggle(d.ha_entity_id, roomState?.state ? "turn_on" : "turn_off"));
  }

  async function handleRoomActionPWM() {
    // data.map((d) => deviceToggle());
  }

  useEffect(() => {
    if (roomState?.action == "toggle") handleRoomActionToggle();
    if (roomState?.action == "pwm") handleRoomActionPWM();
  }, [roomState]);

  useEffect(() => {
    data_ha?.get()?.length && setonloading();
  }, [data_ha?.get()]);

  function syncMap(d) {
    return {
      ...d,
      state: data_ha.get()?.find((dx) => dx?.entity_id == d?.ha_entity_id)?.state,
    };
  }

  async function handleUpdate(d) {
    let res = await fetcher({
      url: "family/device",
      method: "post",
      data: d,
    });
    refetch();
    setonDetail();
  }

  async function deviceToggle(e, do_state = "toggle") {
    setonloading(e);
    let res = await fetcher({
      url: "device",
      method: "post",
      data: {
        id: e,
        do: do_state,
      },
    });
    if (res?.data) data_ha.reload();
  }

  async function handleClick(device, interval) {
    if (interval == 10) {
      setonDetail(device);
    } else {
      await deviceToggle(device?.ha_entity_id);
    }
  }

  if (!data_ha.get()?.length) return <UI.Loader />;

  return (
    <UI.Col
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        bgcolor: "grey",
        height: { xs: allList ? "100%" : "50vh", md: "100%" },
        width: "100%",
        ...glass,
        borderRadius: { xs: allList ? "" : "24px 24px 0 0", md: 0 },
      }}
      alignItems="center"
      width="100%"
    >
      {!allList && (
        <UI.Col
          sx={{
            display: { xs: "flex", md: "none" },
            t: 1,
            width: 48,
            bgcolor: "darkGrey",
            height: 4,
            margin: 0,
            borderRadius: "4px",
            position: "absolute",
            top: 12,
          }}
        />
      )}

      <UI.Col
        pt={0}
        flexGrow={1}
        overflow="auto"
        center
        sx={{
          width: "100%",
          px: { xs: 0, md: "15vw" },
        }}
      >
        {data?.length ? (
          <UI.Col
            pt={2}
            sx={{
              width: "100%",
              minHeight: {
                xs: "100%",
                md: "0",
              },
              maxHeight: {
                xs: "100%",
                md: "60dvh",
              },
            }}
          >
            {!allList && (
              <UI.Text p={1} variant="body1" color={"smart.text"}>
                {data?.length} Devices
              </UI.Text>
            )}

            <UI.Col
              overflow="auto"
              height="100%"
              sx={{
                pb: 5,
                "::-webkit-scrollbar": {
                  width: "0px",
                },
              }}
            >
              {!allList && (
                <RenderDevice
                  data={data?.map(syncMap)}
                  roomState={roomState}
                  onClick={handleClick}
                  onloading={onloading}
                />
              )}

              {allList && (
                <GropedRenderDevice
                  data={data?.map(syncMap)}
                  roomState={roomState}
                  onClick={handleClick}
                  onloading={onloading}
                />
              )}
            </UI.Col>
          </UI.Col>
        ) : (
          <UI.Text variant="body2" color="white">
            no device found in this room
          </UI.Text>
        )}
      </UI.Col>
      {onDetail && <OnDetail data={onDetail} onClose={() => setonDetail()} onUpdate={handleUpdate} />}
    </UI.Col>
  );
}

function GropedRenderDevice({ data, roomState, onClick, onloading }) {
  const loc = useRouter();
  let buffer = _.chain(data)
    .groupBy("room")
    .map((value, key) => ({ room: key, data: value }))
    .value();
  return (
    <UI.Col
      sx={{
        width: "100%",
      }}
      spacing={3}
    >
      <UI.Row alignItems="center" pt={3}>
        <UI.IconButton onClick={() => loc.push("/home")}>
          <Icon.Back />
        </UI.IconButton>
        <UI.Text variant="body1">All Devices</UI.Text>
      </UI.Row>
      {buffer?.map((b, bix) => (
        <UI.Col key={bix}>
          <UI.Row px={2} alignItems="flex-end" spacing={1}>
            <UI.Text variant="h6">{b.room}</UI.Text>
            <UI.Text variant="body2" pb={"2px"}>
              ({b?.data?.length} Devices)
            </UI.Text>
          </UI.Row>
          <UI.Row
            sx={{
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {b.data.map((d, ix) => (
              <UI.Col
                key={ix}
                sx={{
                  width: { xs: "50%", md: "25%" },
                }}
              >
                {d.type_id == 1 && (
                  <Device.Switch
                    D={d}
                    roomState={roomState}
                    onClick={(interval) => {
                      !onloading && onClick(d, interval);
                    }}
                    onloading={onloading == d?.ha_entity_id}
                  />
                )}
              </UI.Col>
            ))}
          </UI.Row>
        </UI.Col>
      ))}
    </UI.Col>
  );
}

function RenderDevice({ data, roomState, onClick, onloading }) {
  return (
    <UI.Row
      sx={{
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      {data.map((d, ix) => (
        <UI.Col
          key={ix}
          sx={{
            width: { xs: "50%", md: "25%" },
          }}
        >
          {d.type_id == 1 && (
            <Device.Switch
              D={d}
              roomState={roomState}
              onClick={(interval) => {
                !onloading && onClick(d, interval);
              }}
              onloading={onloading == d?.ha_entity_id}
            />
          )}
        </UI.Col>
      ))}
    </UI.Row>
  );
}

function OnDetail({ data, onClose, onUpdate }) {
  const [payload, setpayload] = useState({
    id: data.id,
    link_to_room: data.link_to_room,
  });

  return (
    <UI.Modal open={true} onClose={onClose}>
      <UI.Col
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 2,
        }}
      >
        <UI.Col
          sx={{
            width: "100%",
            maxWidth: 600,
            bgcolor: "smartSecondary.main",
            minHeight: 300,
            p: 2,
            borderRadius: 3,
            justifyContent: "space-between",
          }}
        >
          <UI.Col>
            <UI.Row alignItems="center" justifyContent="space-between">
              <UI.Text variant="h6" color="smart.main">
                Device Settings
              </UI.Text>
              <UI.IconButton onClick={onClose}>
                <Icon.Close />
              </UI.IconButton>
            </UI.Row>
            <UI.Row alignItems="center">
              <UI.Text
                variant="body1"
                sx={{
                  width: "100%",
                }}
              >
                linked to room ?
              </UI.Text>
              <Form.Switch
                value={payload?.link_to_room}
                onChange={(e) => setpayload({ ...payload, link_to_room: e.target.value })}
              />
            </UI.Row>
          </UI.Col>
          <UI.Row justifyContent="flex-end" width="100%">
            <UI.Button onClick={() => onUpdate(payload)}>save</UI.Button>
          </UI.Row>
        </UI.Col>
      </UI.Col>
    </UI.Modal>
  );
}
