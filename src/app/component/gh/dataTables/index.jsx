import React, { useEffect, useState } from "react";

import UI from "@gh/ui";
import Form from "@/component/gh/form";

import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DefaultCreateButton from "./_newElement";

import RenderChild from "./_renderer";
import { Menu, MenuItem } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import NorthIcon from "@mui/icons-material/North";
import PrevIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import NextIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import Pagination from "@mui/material/Pagination";

const refconfig = {
  firstColWidth: 300,
  rowHeight: 40,
  minCellWidth: 200,
  bgcolor: "#fafafa",
  bgcoloreven: "#e2eff5",
};

const config = {
  firstColWidth: 300,
  rowHeight: 40,
  minCellWidth: 200,
  bgcolor: "#fafafa",
  bgcoloreven: "",
  bgcolorodd: "",
  bordercolor: "#4f4f4f",
};

export default function Datatables({
  name,
  data,
  col,
  NewElement = DefaultCreateButton,
  NewElementConfig,
  title,
  refetch,
  clickedRow = () => {},
  handleselectedRow = () => {},
  tableSx,
  clickedPagination = () => {},
  pagination = {
    perpage: 100,
  },
  ...props
}) {
  const [activePage, setactivePage] = useState(0);
  const [search, setsearch] = useState("");
  const [order, setorder] = useState({
    by: null,
    asc: true,
  });

  function getCount() {
    return Math.ceil(
      data.filter((d) => UI.Datatables.search(d, search)).sort((a, b) => UI.Datatables.order(a, b, order))?.length /
        pagination.perpage
    );
  }

  return (
    <UI.Stack
      spacing={2}
      flexGrow={1}
      overflow="auto"
      className="intro-listperkara"
      sx={{ ...tableSx, maxHeight: "calc(100dvh - 92px)" }}
    >
      <UI.Text variant="h4" color="primary.dark">
        {title}
      </UI.Text>
      <UI.Stack direction={"row"} justifyContent={"space-between"}>
        <UI.Stack direction={"row"} spacing={2} alignItems={"flex-start"}>
          {!props.disableSearch && <UI.Datatables.DTSearch value={setsearch} />}
          {props.extraFilter}
          {props.FilterEle && (
            <UI.Datatables.DTFilter
              FilterEle={props.FilterEle}
              filter={props.filter}
              onFilterChange={props.onFilterChange}
            />
          )}
        </UI.Stack>
        <UI.Row spacing={1} alignItems={"flex-start"}>
          {props.extraEl && props.extraEl}
          {NewElementConfig && <NewElement refetch={refetch} {...NewElementConfig} />}
        </UI.Row>
      </UI.Stack>
      {data && (
        <RenderDetail
          data={data
            .filter((d) => UI.Datatables.search(d, search))
            .sort((a, b) => UI.Datatables.order(a, b, order))
            .slice(activePage * pagination?.perpage, activePage * pagination.perpage + pagination.perpage)}
          col={col}
          order={order}
          onorder={(v) => setorder(v)}
          refetch={refetch}
          model={props.model}
          clickedRow={clickedRow}
          clickedArrow={props.clickedArrow}
          clickedEdit={props.clickedEdit}
          clickedMore={props.clickedMore}
          toggledVisibilty={props.toggledVisibilty}
          onToggledVisibilty={props.onToggledVisibilty}
          rowSelectable={props.rowSelectable}
          handleselectedRow={handleselectedRow}
          onDetailName={props.onDetailName}
          options={props.options}
        />
      )}
      {/* {pagination && <RenderPagination links={pagination} clickedPagination={clickedPagination} />} */}
      {data && pagination && getCount() > 1 && (
        <Pagination
          count={getCount()}
          variant="outlined"
          shape="rounded"
          page={activePage}
          onChange={(e, v) => setactivePage(v)}
        />
      )}
    </UI.Stack>
  );
}

function RenderDetail({ data, col, order, onorder, model, refetch, clickedRow, onDetailName, options, ...props }) {
  const [defaultcheck, setdefaultcheck] = useState(false);
  const [selected, setselected] = useState([]);

  function handleCheckboxAll(v) {
    let isSelected = v.target.checked;
    if (!isSelected) {
      setselected([]);
    } else {
      setselected(data);
    }
  }

  function handleSelected(v, d) {
    let isSelected = v.target.checked;
    let temp = selected;
    if (!isSelected) {
      temp = temp.filter((dtx) => dtx.id != d.id);
    } else {
      if (!temp.find((dtx) => dtx.id == d.id)) {
        temp.push(d);
      }
    }
    setselected([...temp]);
  }

  function getActionwidth() {
    if (!props.clickedEdit && !props.clickedMore && !props.clickedArrow) return 39;
    if (props.clickedEdit && props.clickedMore) return 83;
    if (props.clickedArrow && props.clickedMore) return 83;
    return 71;
  }

  function getActionwidthExtra() {
    if (props.clickedArrow && props.clickedMore) return 2;
    return 5;
  }

  useEffect(() => {
    props.handleselectedRow(selected);
  }, [selected]);

  return (
    <UI.Stack id="app-container" flexGrow={1} overflow={"auto"} position="relative">
      <div style={{ minWidth: "200px", width: "100%" }}>
        {/* HEADER RENDER */}
        <UI.Row
          height={42}
          position="relative"
          sx={{
            display: "inline-flex",
            position: "sticky",
            top: 0,
            zIndex: 999,
            // flexGrow: 1,
            minWidth: "100%",
            bgcolor: config?.bgcolor,
          }}
        >
          {col.map((dx, ix) => (
            <UI.Stack
              key={ix}
              borderTop="1px solid"
              borderBottom="1px solid"
              borderColor={config.bordercolor}
              flexShrink={0}
              minWidth={dx.w == "auto" && config.minCellWidth}
              flexGrow={dx.w == "auto" ? 1 : 0}
              zIndex={102}
              direction="row"
              sx={{
                position: dx.freeze ? "sticky" : "relative",
                zIndex: dx.freeze ? 100 : 99,
                left: ix > 0 && dx.freeze ? getActionwidth() + 2 + col[ix - 1].w : 0,
                top: 0,
              }}
            >
              {ix == 0 && (
                <UI.Row minWidth={getActionwidth()}>
                  {props.rowSelectable && (
                    <Form.Checkbox onChange={handleCheckboxAll} checked={selected.length == data.length} />
                  )}
                </UI.Row>
              )}
              <Header d={dx} order={order} onorder={onorder} />
              {props.toggledVisibilty && col.findLast((d) => (d?.freeze ? d.freeze == true : false))?.name == dx.name && (
                <UI.Col
                  position="absolute"
                  right={-32}
                  top={8}
                  bgcolor="secondary.main"
                  height={24}
                  width={24}
                  center
                  onClick={props.onToggledVisibilty}
                >
                  <UI.Icons.VisibilityToggle />
                </UI.Col>
              )}
            </UI.Stack>
          ))}
        </UI.Row>
        {/* ACTUAL DATA RENDER */}
        {data.map((d, ix) => (
          <UI.Row
            key={ix}
            position="relative"
            sx={{
              minWidth: "100%",
              borderBottom: "1px solid",
              alignItems: "center",
              borderColor: config.bordercolor,
              backgroundColor: ix % 2 == 0 ? config?.bgcoloreven : config?.bgcolorodd,
              display: "inline-flex",
              "& :hover": {
                cursor: "pointer",
              },
            }}
          >
            {col.map((dx, dix) => (
              <UI.Stack
                key={dix}
                borderColor={
                  col.findLast((dxx) => (dxx?.freeze ? dxx.freeze == true : false))?.name == dx.name
                    ? "grey.c"
                    : ix % 2 == 0
                    ? config?.bgcoloreven
                    : ""
                }
                height={config.rowHeight}
                py={"2px"}
                minWidth={dx.w == "auto" && config.minCellWidth}
                flexShrink={0}
                flexGrow={dx.w == "auto" ? 1 : 0}
                sx={{
                  backgroundColor: ix % 2 == 0 ? config.bgcoloreven : "",
                  position: dx.freeze ? "sticky" : "relative",
                  zIndex: dx.freeze ? 200 : 99,
                  left: dix > 0 && dx.freeze ? getActionwidth() + getActionwidthExtra() + col[dix - 1]?.w || 0 : 0,
                  py: 0.5,
                }}
                direction="row"
                alignItems="center"
              >
                {dix == 0 && (
                  <UI.Row spacing={0} alignItems="center">
                    <UI.Col width={39}>
                      {props.rowSelectable && (
                        <Form.Checkbox
                          checked={selected.find((dtx) => dtx.id == d.id)}
                          onChange={(v) => handleSelected(v, d)}
                        />
                      )}
                    </UI.Col>

                    <UI.Row spacing={1}>
                      {props.clickedEdit && <EditAction onClick={() => props.clickedEdit(d.id)} />}
                      {props.clickedMore && <ViewAction onClick={(e) => props.clickedMore(d.id, e)} />}
                      {props.clickedArrow && (
                        <ArrowAction onClick={(p) => props.clickedArrow(d.id, p)} p={d.priority} />
                      )}
                    </UI.Row>
                  </UI.Row>
                )}
                <UI.Row
                  flexGrow={dx.w == "auto" ? 1 : 0}
                  minWidth={dx.w == "auto" && config.minCellWidth - 2}
                  width={dx.w || config.minCellWidth}
                  height="100%"
                  alignItems="center"
                >
                  {dx.type != "approval" && (
                    <UI.Row
                      onClick={() => clickedRow(d.id)}
                      flexGrow={1}
                      height="100%"
                      px={2}
                      justifyContent={dx.align}
                      alignItems="center"
                    >
                      <UI.Col>
                        <RenderChild
                          value={d[dx.name]}
                          type={dx.type || dx.format}
                          width={dx.w || config.minCellWidth}
                          El={dx?.El}
                          row={d}
                        />
                        {onDetailName?.target && (
                          <UI.Text
                            variant="caption"
                            mt={-0.5}
                            color={d[onDetailName.value] == "Expense" ? "fireBrick" : "success.light"}
                          >
                            {onDetailName.target == dx.name && d[onDetailName.value]}
                          </UI.Text>
                        )}
                      </UI.Col>
                    </UI.Row>
                  )}
                </UI.Row>
              </UI.Stack>
            ))}
            {options?.readStatusCheck && !d.has_read && (
              <UI.Col
                sx={{
                  bgcolor: "error.main",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                }}
              />
            )}
          </UI.Row>
        ))}
        {!data?.length && (
          <UI.Col center py={5}>
            no data
          </UI.Col>
        )}
      </div>
    </UI.Stack>
  );
}

function ArrowAction({ p, ...props }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <UI.Button
        sx={{
          p: 0,
          height: 18,
          width: 18,
          minWidth: "unset",
        }}
        // {...props}
        onClick={handleClick}
        variant="text"
      >
        {p == 0 && <UI.Icons.PrkArrB sx={{ fontSize: 12 }} />}
        {p == 1 && <UI.Icons.PrkArrY sx={{ fontSize: 12 }} />}
        {p == 2 && <UI.Icons.PrkArrR sx={{ fontSize: 12 }} />}
      </UI.Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem sx={{ py: 0.5, px: 2 }} onClick={() => props.onClick(0, handleClose())}>
          <UI.Row alignItems="center" spacing={0.5}>
            <UI.Circle w={8} bgcolor={config.bgcoloreven} />
            <UI.Text variant="body2" pt="2px">
              General
            </UI.Text>
          </UI.Row>
        </MenuItem>
        <MenuItem sx={{ py: 0.5, px: 2 }} onClick={() => props.onClick(1, handleClose())}>
          <UI.Row alignItems="center" spacing={0.5}>
            <UI.Circle w={8} bgcolor="#fdc36b" />
            <UI.Text variant="body2" pt="2px">
              Important
            </UI.Text>
          </UI.Row>
        </MenuItem>
        <MenuItem sx={{ py: 0.5, px: 2 }} onClick={() => props.onClick(2, handleClose())}>
          <UI.Row alignItems="center" spacing={0.5}>
            <UI.Circle w={8} bgcolor="#eb7070" />
            <UI.Text variant="body2" pt="2px">
              Urgent
            </UI.Text>
          </UI.Row>
        </MenuItem>
      </Menu>
    </>
  );
}

function ViewAction(props) {
  return (
    <UI.Col width={32}>
      <UI.Button
        fullWidth={false}
        {...props}
        sx={{
          p: 0,
          height: 18,
          width: 18,
          minWidth: 0,
        }}
        variant="outlined"
      >
        <MoreVertIcon sx={{ fontSize: 12 }} />
      </UI.Button>
    </UI.Col>
  );
}

function EditAction(props) {
  return (
    <UI.Button
      sx={{
        p: 0,
        height: 18,
        width: 18,
        minWidth: "unset",
      }}
      variant="outlined"
      {...props}
    >
      <EditIcon sx={{ fontSize: 12 }} />
    </UI.Button>
  );
}

function Header({ order, onorder, d }) {
  return (
    <UI.Stack
      direction="row"
      flexShrink={0}
      flexGrow={1}
      alignItems="center"
      // backgroundColor="white.main"
      justifyContent="space-between"
      width={d.w || config.minCellWidth}
      sx={{
        "&:hover": {
          bgcolor: "grey.d",
        },
      }}
      p={1}
      onClick={() =>
        onorder({
          by: d.name,
          asc: d.name == order.by ? !order.asc : true,
        })
      }
    >
      <UI.Text variant="body1" className="f-bold" px={1} align="left" width="100%">
        {d.label}
      </UI.Text>
      <UI.Stack width={"10px"}>
        {order.by == d.name ? (
          <NorthIcon
            color="primay.main"
            sx={{
              fontSize: "16px",
              transform: order.asc ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        ) : (
          <UnfoldMoreIcon
            sx={{
              color: "grey.a",
              fontSize: "16px",
            }}
          />
        )}
      </UI.Stack>
    </UI.Stack>
  );
}

function RenderPagination({ links, clickedPagination }) {
  return (
    <UI.Col center>
      <UI.Row justifyContent="center" spacing={2}>
        {links &&
          links.map((l, ix) => (
            <UI.IconButton
              key={ix}
              onClick={() => {
                if (l.url) {
                  clickedPagination(l.url);
                }
              }}
              sx={{
                border: l.label.includes("Prev") || l.label.includes("Next") || l.active ? "1px solid grey" : "unset",
                borderRadius: l.label.includes("Prev") || l.label.includes("Next") || l.active ? 1.5 : "unset",
                p: 1,
                px: l.label.includes("Prev") || l.label.includes("Next") ? 2.5 : 1.5,
                color: l.active && "white !important",
                backgroundColor: l.active && "grey !important",
              }}
            >
              {l.label.includes("Prev") ? (
                <PrevIcon />
              ) : l.label.includes("Next") ? (
                <NextIcon />
              ) : (
                <UI.Text>{l.label}</UI.Text>
              )}
            </UI.IconButton>
          ))}
      </UI.Row>
    </UI.Col>
  );
}
