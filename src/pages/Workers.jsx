import React, { useState } from "react";
import Header from "../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import { city } from "../assets/AllCities/Cities";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WorkerCard from "../components/WorkerCard";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Workers() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [searchCity, setSearchCity] = useState("");

  searchCity &&
    city
      .filter((item) => {
        if (
          item.name.toLowerCase().includes(searchCity) ||
          item.state.toLowerCase().includes(searchCity)
        ) {
          return item;
        }
      })
      .map((data) => {
        console.log(data.name, data.state);
      });
  return (
    <>
      <Header insideWorkers setSearchCity={setSearchCity} />
      <div className="min-h-screen">
        {/* Search City */}
        <div className="flex justify-center mt-2">
          <div className="hidden max-[820px]:flex justify-between items-center h-12 w-[350px] border border-black rounded-xl">
            <input
              className="ms-2 outline-none w-72 text-lg"
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Search By State or City"
              type="text"
            />
            <SearchIcon
              className="me-2 cursor-pointer"
              fontSize="large"
              color="black"
            />
          </div>
        </div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              aria-label="basic tabs example"
            >
              <Tab
                style={{ marginLeft: "23px", marginRight: "24px" }}
                label="All"
                {...a11yProps(0)}
              />
              <Tab
                style={{ marginLeft: "23px", marginRight: "24px" }}
                label="Electrical"
                {...a11yProps(1)}
              />
              <Tab
                style={{ marginLeft: "23px", marginRight: "24px" }}
                label="Plumbing"
                {...a11yProps(2)}
              />
              <Tab
                style={{ marginLeft: "23px", marginRight: "24px" }}
                label="Carpentry"
                {...a11yProps(3)}
              />
              <Tab
                style={{ marginLeft: "23px", marginRight: "24px" }}
                label="Welding"
                {...a11yProps(4)}
              />
              <Tab
                style={{ marginLeft: "23px", marginRight: "24px" }}
                label="TileWork"
                {...a11yProps(5)}
              />
              <Tab
                style={{ marginLeft: "23px", marginRight: "24px" }}
                label="Construction"
                {...a11yProps(6)}
              />
              <Tab
                style={{ marginLeft: "23px", marginRight: "24px" }}
                label="Painting"
                {...a11yProps(7)}
              />
              <Tab
                style={{ marginLeft: "23px", marginRight: "24px" }}
                label="Centring"
                {...a11yProps(8)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="grid grid-cols-4 mt-10 gap-4 max-2xl:grid-cols-3
            max-lg:grid-cols-2 max-sm:grid-cols-1">
              <div>
                <WorkerCard />
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            Item Three
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            Item Three
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            Item Three
          </CustomTabPanel>
          <CustomTabPanel value={value} index={6}>
            Item Three
          </CustomTabPanel>
          <CustomTabPanel value={value} index={7}>
            Item Three
          </CustomTabPanel>
          <CustomTabPanel value={value} index={8}>
            Item Three
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}

export default Workers;
