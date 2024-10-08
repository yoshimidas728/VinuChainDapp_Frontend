import { Button, Chip, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { convertZuluToGMT } from "../../../common/ConversionFunctions";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { blockAuthor, approveAuthor, approvePost } from "../../../store/autorization/actions";

const DataTableComponent = ({ authors, posts }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [usersList, setUsersList] = useState();
  const isPosts = location.pathname.split('/')[1] === "posts"
  const handleApprove = (id) => {
    if(isPosts){
      const payload = {
        postId: id?.id 
      }
      dispatch(approvePost(payload))

    }else {
      const payload = {
        authorId: id?.id 
      }
      dispatch(approveAuthor(payload))
    }
  };
  const handleBlock = (id) => {
    console.log("🚀 ~ file: DataTableComponent.jsx:18 ~ handleBlock ~ id:", id);
    const payload = {
      userId: id?.id,
    };
    if(!isPosts){
      dispatch(blockAuthor(payload));
    }
  };
  useEffect(() => {
    console.log({authors, posts})
    let t;
    if (authors) {
      t = authors?.map((item) => {
        return {
          id: `${item?.id}`,
          name: item.displayName,
          joinDate: `${convertZuluToGMT(item?.createdAt)}`,
          status: item?.role,
          posts: item?.Posts?.length,
        };
      });
    }else if (posts) {
      t = posts?.map((item) => {
        return {
          id: `${item?.id}`,
          title: item?.title,
          joinDate: `${convertZuluToGMT(item?.createdAt)}`,
          status: item?.tags[0],
          ss: item.description || "",
        };
      });
    }
    setUsersList(t);
  }, [authors, posts]);

  let data = usersList;

  const columns1 = [
    {
      name: (
        <Typography fontSize={"1.2em"} fontWeight={"bold"}>
          ID
        </Typography>
      ),
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: (
        <Typography fontSize={"1.2em"} fontWeight={"bold"}>
          { isPosts ? "Title" : "Name"}
        </Typography>
      ),
      selector: (row) => row.name || row.title,
      sortable: true,
    },
    {
      name: (
        <Typography fontSize={"1.2em"} fontWeight={"bold"}>
          { isPosts ? "Tag" : "Role"}
        </Typography>
      ),
      selector: (row) => {
        return (
          <Chip
            label={row.status}
            color={row.status === "Author" ? "primary" : "warning"}
          />
        );
      },
      sortable: true,
    },
    {
      name: (
        <Typography fontSize={"1.2em"} fontWeight={"bold"} minWidth="6em">
          { isPosts ? "Description" : "No.Of Posts"} 
        </Typography>
      ),
      selector: (row) => row.posts ,
      sortable: true,
    },
    {
      name: (
        <Typography fontSize={"1.2em"} fontWeight={"bold"}>
          Created At
        </Typography>
      ),
      selector: (row) => row.joinDate,
      sortable: true,
    },
    {
      name: (
        <Typography fontSize={"1.2em"} fontWeight={"bold"}>
          Actions
        </Typography>
      ),
      cell: (id) => {
        return (
          <Stack direction={"row"}>
            <Stack>
              <IconButton
                onClick={() => handleApprove(id)}
                sx={{ color: "blue" }}
              >
                <CheckCircleOutlineIcon />
              </IconButton>
            </Stack>
            <Stack>
              <IconButton sx={{ color: "red" }} onClick={() => handleBlock(id)}>
                <DoNotDisturbAltIcon />
              </IconButton>
            </Stack>
          </Stack>
        );
      },
    },
  ];

  console.log({ isPosts, data });
  return (
        <DataTable columns={columns1} data={data} pagination />
  )
};

export default DataTableComponent;
