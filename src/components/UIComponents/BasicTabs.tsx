import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { IBasicTabsProps, ITabPanelProps } from '../../types/types';

const TabPanel: React.FC<ITabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`bookAdditionalInfo-${index}`}
      aria-labelledby={`bookAdditionalInfo-${index}`}
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

const a11yProps = (index: number) => {
  return {
    id: `bookAdditionalInfo-${index}`,
    'aria-controls': `bookAdditionalInfo-${index}`,
  };
}

const BasicTabs: React.FC<IBasicTabsProps> = ({ data, feedback }) => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', border: "3px solid #FFCA42", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", borderRadius: "20px", margin: "20px 0 20px 0" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Краткое описание:" {...a11yProps(0)} />
          <Tab label="Отзывы" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {data}
      </TabPanel>
      <TabPanel value={value} index={1}>
        feedback
      </TabPanel>
    </Box>
  );
}

export default BasicTabs;