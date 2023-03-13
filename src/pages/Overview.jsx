import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import TextFieldCustom from '../components/TextField';
import {
  MEDIA_OVERVIEW_PROPERTIES,
  MEDIA_OVERVIEW_HEADER,
} from '../constants/mediaOverview';
import {
  loaderParent,
  overviewPage,
  overviewTitle,
  searchPart,
  searchField,
  overviewHeading,
  headerStyle,
  bodyStyle,
} from '../styles/overview/OverviewStyle';
import {
  tableStyle,
  mainBoxStyle,
} from '../styles/overview/MediaOverviewStyle';
import BasicTabs from '../components/Tabs';
import { previewDateFormat } from '../helpers/index';
import { getAllMedia, getMediaCount }from '../services/mediaService';

const Overview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchTvShows, setSearchTvShows] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onTabChange = (tabIndex) => {
    setSearchTvShows(tabIndex === 1);
  }

  const setWidth = (property) => {
    switch (property) {
    case MEDIA_OVERVIEW_PROPERTIES.ID:
      return '20%';
    case MEDIA_OVERVIEW_PROPERTIES.IMAGE_URL:
      return '30%';
    case MEDIA_OVERVIEW_PROPERTIES.TITLE:
      return '20%';
    case MEDIA_OVERVIEW_PROPERTIES.RELEASE_DATE:
      return '20%';
    case MEDIA_OVERVIEW_PROPERTIES.AVERAGE_RATING:
      return '20%';
    case MEDIA_OVERVIEW_PROPERTIES.MEDIA_TYPE:
      return '20%';
    default:
      return 'none';
    }
  };

  const fetchMediaCount = async () => {
    try {
      setIsLoading(true);
      const response = await getMediaCount();
      
      const totalCount = response?.data ?? 0;

      setTotalCount(totalCount);
    } catch (error) {
      console.log('Something went wrong...');
    }
    setIsLoading(false);
  }

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getAllMedia(search, searchTvShows, page + 1, rowsPerPage);
      const items = response?.data?.map((mediaItem) => ({
        id: mediaItem?.id,
        title: mediaItem?.title,
        mediaType: mediaItem?.mediaType,
        averageRating: mediaItem?.averageRating,
        releaseDate: previewDateFormat(mediaItem?.releaseDate),
      }));
      console.log(items);
      setData(items);
    } catch (error) {
      console.log('Something went wrong while fetching the data...');
    }
    setIsLoading(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchOnSubmit = async (event) => {
    event.preventDefault();
    await fetchData();
  };

  useEffect(() => {
    if (search?.length !== 1) {
      fetchData();
    }
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [searchTvShows, page, rowsPerPage]);

  useEffect(() => {
    fetchMediaCount();
  }, []);

  return (
    <Box sx={mainBoxStyle}>
      <Box sx={tableStyle}>
        <Box sx={overviewPage}>
          <FormControl component="form" onSubmit={handleSearchOnSubmit}>
            <BasicTabs onChange={onTabChange}/>
            <Box sx={overviewHeading}>
              <Typography
                variant="h5"
                sx={overviewTitle}
              >
                Media Overview
              </Typography>
              <Box sx={searchPart}>
                <TextFieldCustom
                  value={search}
                  placeholder='Start typing...'
                  inputProps={{
                    readOnly: isLoading,
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={searchField}
                />
                <Button variant="contained" type="submit" disabled={isLoading}>Search</Button>
              </Box>
            </Box>
          </FormControl>
          <Box sx={{ p: 4 }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {MEDIA_OVERVIEW_HEADER?.map((headerItem) => (
                        <TableCell key={headerItem?.key} sx={headerStyle}>
                          {headerItem?.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((item) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={item?.id}>
                        {MEDIA_OVERVIEW_HEADER?.map((headerItem) => (
                          <TableCell key={headerItem?.key} style={{ ...bodyStyle, width: setWidth(headerItem?.key) }}>
                            {item[headerItem?.key]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[1, 4, 5, 10, 15, 20]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
          <Box sx={loaderParent}>
            {isLoading && <CircularProgress sx={{ color: 'blue' }} />}
            {(!data?.length && !isLoading)
              && <Typography variant="h5" sx={{ color: 'black' }}>No available logs.</Typography>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;
